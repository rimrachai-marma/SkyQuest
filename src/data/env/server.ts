import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    AMADEUS_API_KEY: z.string().min(1),
    AMADEUS_API_SECRET: z.string().min(1),
  },

  experimental__runtimeEnv: process.env,
});
