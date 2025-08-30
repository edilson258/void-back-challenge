import { z } from "zod";
import { config } from "dotenv";

config();

interface Env {
  POSTGRES_URL: string;
}

const envSchema = z.object({
  POSTGRES_URL: z.url(),
});

export const eVars: Env = envSchema.parse(process.env);
