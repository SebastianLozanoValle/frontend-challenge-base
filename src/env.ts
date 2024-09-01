import { config } from 'dotenv';
import { z } from 'zod';

config();

console.log("API_URL:", process.env.API_URL);
console.log("API_KEY:", process.env.API_KEY);

const envSchema = z.object({
  API_URL: z.string().min(1),
  API_KEY: z.string().min(1),
});

export const env = {
  API_URL: process.env.API_URL!,
  API_KEY: process.env.API_KEY!,
};
