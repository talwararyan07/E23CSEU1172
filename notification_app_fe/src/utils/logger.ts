// @ts-ignore
import Log from 'logging_middleware';

// Re-export the logger with typed signature
export const logFrontend = (level: "debug" | "info" | "warn" | "error" | "fatal", pkg: "api" | "component" | "hook" | "page" | "state" | "style" | "auth" | "config" | "middleware" | "utils", message: string) => {
  // Call the imported logging middleware
  Log("frontend", level, pkg, message);
};
