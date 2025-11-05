#!/usr/bin/env node

/**
 * Development Server Cleanup Script
 * Cleans up Next.js lock files and terminates stale dev processes
 * Run this before starting the dev server to avoid lock file errors
 *
 * Usage: node scripts/dev-cleanup.js
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const os = require("os");

const LOCK_FILE = path.join(__dirname, "..", ".next", "dev", "lock");
const PORTS = [3000, 3001, 3002, 3003]; // Common dev ports

function log(message, type = "info") {
  const colors = {
    info: "\x1b[36m",
    success: "\x1b[32m",
    warn: "\x1b[33m",
    error: "\x1b[31m",
    reset: "\x1b[0m",
  };

  const color = colors[type] || colors.info;
  console.log(`${color}[${type.toUpperCase()}]${colors.reset} ${message}`);
}

function removeLockFile() {
  try {
    if (fs.existsSync(LOCK_FILE)) {
      fs.unlinkSync(LOCK_FILE);
      log(`Removed lock file: ${LOCK_FILE}`, "success");
    } else {
      log("Lock file does not exist", "info");
    }
  } catch (error) {
    log(`Failed to remove lock file: ${error.message}`, "warn");
  }
}

function cleanupNextDir() {
  const nextDirPath = path.join(__dirname, "..", ".next");

  try {
    if (fs.existsSync(nextDirPath)) {
      // Recursively remove the entire .next directory
      fs.rmSync(nextDirPath, { recursive: true, force: true });
      log("Removed entire .next directory", "success");
    }
  } catch (error) {
    log(
      `Failed to cleanup .next directory: ${error.message}`,
      "warn"
    );
  }
}

function killPortProcesses() {
  const isWindows = os.platform() === "win32";

  PORTS.forEach((port) => {
    try {
      if (isWindows) {
        // Windows: Use netstat and taskkill
        try {
          const output = execSync(
            `netstat -ano | findstr :${port}`,
            { encoding: "utf-8", stdio: "pipe" }
          );

          if (output) {
            const pid = output.trim().split(/\s+/).pop();

            if (pid && pid !== "PID") {
              try {
                execSync(`taskkill /PID ${pid} /F`, { stdio: "pipe" });
                log(`Killed process on port ${port} (PID: ${pid})`, "success");
              } catch (error) {
                // Process may have already terminated
              }
            }
          }
        } catch (error) {
          // Port not in use or netstat command failed
        }
      } else {
        // Unix-like systems: Use lsof and kill
        try {
          const output = execSync(
            `lsof -ti :${port}`,
            { encoding: "utf-8", stdio: "pipe" }
          );

          if (output) {
            const pid = output.trim().split("\n")[0];

            if (pid) {
              try {
                execSync(`kill -9 ${pid}`, { stdio: "pipe" });
                log(
                  `Killed process on port ${port} (PID: ${pid})`,
                  "success"
                );
              } catch (error) {
                // Process may have already terminated
              }
            }
          }
        } catch (error) {
          // Port not in use or lsof command failed
        }
      }
    } catch (error) {
      // Silently continue
    }
  });
}

async function cleanup() {
  log("Starting development server cleanup...", "info");

  log("Killing processes on dev ports...", "info");
  killPortProcesses();

  log("Removing lock files...", "info");
  removeLockFile();

  log("Cleaning up .next/dev directory...", "info");
  cleanupNextDir();

  log("Cleanup completed successfully!", "success");
}

cleanup().catch((error) => {
  log(`Cleanup failed: ${error.message}`, "error");
  process.exit(1);
});
