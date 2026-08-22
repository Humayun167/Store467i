/**
 * Lightweight error reporting utility.
 * Reports errors to the console and can be extended to forward
 * to any third-party monitoring service (e.g. Sentry, Datadog).
 */
export function reportError(
  error: unknown,
  context: Record<string, unknown> = {},
): void {
  console.error("[ErrorBoundary]", error, context);
}
