// Launches Next.js on the first available port, preferring PORT (default 3001).
// If the preferred port is taken, it rolls forward to the next free one instead
// of crashing with EADDRINUSE — backend stays on :3000, storefront finds a slot.
import { createServer } from "node:net";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
// Resolve Next's own bin so this works whether launched via npm or `node` directly.
const nextBin = require.resolve("next/dist/bin/next");

const mode = process.argv[2] ?? "dev"; // "dev" | "start"
const basePort = Number(process.env.PORT) || 3001;
const maxTries = 20;

// Try to bind one host; resolves true if the port is free there.
function canBind(port, host) {
  return new Promise((resolve) => {
    const tester = createServer();
    tester.once("error", () => resolve(false));
    tester.once("listening", () => tester.close(() => resolve(true)));
    // `host === undefined` mirrors how Next binds by default (IPv6 `::`,
    // dual-stack) — the case the old IPv4-only probe missed.
    if (host === undefined) tester.listen(port);
    else tester.listen(port, host);
  });
}

// A port is usable only if it's free on both the default (`::`) bind that
// Next uses AND the IPv4 wildcard, so an IPv6- or IPv4-only listener both count.
async function isFree(port) {
  return (await canBind(port)) && (await canBind(port, "0.0.0.0"));
}

async function findPort() {
  for (let port = basePort; port < basePort + maxTries; port++) {
    if (await isFree(port)) return port;
  }
  throw new Error(`No free port in range ${basePort}-${basePort + maxTries - 1}`);
}

const port = await findPort();
if (port !== basePort) {
  console.log(`Port ${basePort} is in use — starting on ${port} instead.`);
}

const child = spawn(process.execPath, [nextBin, mode, "-p", String(port)], {
  stdio: "inherit",
  env: { ...process.env, PORT: String(port) },
});

child.on("exit", (code) => process.exit(code ?? 0));
