import * as Sentry from "@sentry/nextjs";
import { middleware } from "./trpc-server";

export const sentryMiddleware = middleware(
  Sentry.trpcMiddleware({
    attachRpcInput: true,
  }),
);
