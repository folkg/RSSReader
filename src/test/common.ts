import { describe, it } from "vitest";

export const itIntegration =
  process.env.INTEGRATION_TEST === "true" ? it : it.skip;

export const describeIntegration =
  process.env.INTEGRATION_TEST === "true" ? describe : describe.skip;
