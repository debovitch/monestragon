import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { dirname, extname, resolve, sep } from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

import app from "./dist/server/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const clientDir = resolve(__dirname, "dist/client");
const port = Number.parseInt(process.env.PORT ?? "3000", 10);
const host = process.env.HOST ?? "0.0.0.0";

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function getForwardedHeader(value, fallback) {
  if (Array.isArray(value)) {
    return value[0] ?? fallback;
  }

  if (typeof value === "string") {
    return value.split(",")[0].trim() || fallback;
  }

  return fallback;
}

function resolveStaticPath(pathname) {
  const decodedPath = decodeURIComponent(pathname);
  const relativePath = decodedPath.replace(/^\/+/, "");
  const absolutePath = resolve(clientDir, relativePath);

  if (absolutePath !== clientDir && !absolutePath.startsWith(`${clientDir}${sep}`)) {
    return null;
  }

  return absolutePath;
}

async function serveStaticAsset(req, res, url) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    return false;
  }

  const filePath = resolveStaticPath(url.pathname);
  if (!filePath) {
    return false;
  }

  try {
    const fileStats = await stat(filePath);
    if (!fileStats.isFile()) {
      return false;
    }

    const contentType = mimeTypes[extname(filePath)] ?? "application/octet-stream";

    res.statusCode = 200;
    res.setHeader("Content-Length", fileStats.size);
    res.setHeader("Content-Type", contentType);

    if (url.pathname.startsWith("/assets/")) {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    }

    if (req.method === "HEAD") {
      res.end();
      return true;
    }

    await new Promise((resolveStream, rejectStream) => {
      const stream = createReadStream(filePath);

      stream.on("error", rejectStream);
      res.on("close", resolveStream);
      stream.on("end", resolveStream);
      stream.pipe(res);
    });

    return true;
  } catch (error) {
    if (error && typeof error === "object" && "code" in error) {
      if (error.code === "ENOENT" || error.code === "ENOTDIR") {
        return false;
      }
    }

    throw error;
  }
}

function createWebRequest(req) {
  const protocol = getForwardedHeader(req.headers["x-forwarded-proto"], "http");
  const forwardedHost = req.headers["x-forwarded-host"] ?? req.headers.host;
  const hostname = getForwardedHeader(forwardedHost, `localhost:${port}`);
  const requestUrl = new URL(req.url ?? "/", `${protocol}://${hostname}`);

  const init = {
    headers: req.headers,
    method: req.method,
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = Readable.toWeb(req);
    init.duplex = "half";
  }

  return new Request(requestUrl, init);
}

async function sendWebResponse(res, response) {
  const setCookies =
    typeof response.headers.getSetCookie === "function"
      ? response.headers.getSetCookie()
      : [];

  res.statusCode = response.status;
  res.statusMessage = response.statusText;

  if (setCookies.length > 0) {
    res.setHeader("Set-Cookie", setCookies);
  }

  response.headers.forEach((value, key) => {
    if (key.toLowerCase() === "set-cookie") {
      return;
    }

    res.setHeader(key, value);
  });

  if (!response.body) {
    res.end();
    return;
  }

  await new Promise((resolveStream, rejectStream) => {
    const stream = Readable.fromWeb(response.body);

    stream.on("error", rejectStream);
    res.on("close", resolveStream);
    stream.on("end", resolveStream);
    stream.pipe(res);
  });
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);

    if (await serveStaticAsset(req, res, url)) {
      return;
    }

    const response = await app.fetch(createWebRequest(req));
    await sendWebResponse(res, response);
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("Internal Server Error");
  }
});

server.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`);
});
