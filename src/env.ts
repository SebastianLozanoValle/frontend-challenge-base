import { config } from 'dotenv';
import { z } from 'zod';

config();

console.log("API_URL:", process.env.API_URL);
console.log("API_KEY:", "e71937fb1ccb3737f2120e5b18735116");

const envSchema = z.object({
  API_URL: z.string().min(1),
  API_KEY: z.string().min(1),
});

export const env = envSchema.parse({
  API_URL: process.env.API_URL!,
  API_KEY: "e71937fb1ccb3737f2120e5b18735116"!,
});
