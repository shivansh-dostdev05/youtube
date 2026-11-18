
import { z } from "zod";

export const saveVideoSchema = z.object({
  videoId: z.string().min(1),
  title: z.string().min(1),
  thumbnail: z.string().min(1),
  channelTitle: z.string().min(1),
  description: z.string().default(""),
  publishedAt: z.string().default(""),
});

export type SaveVideoInput = z.infer<typeof saveVideoSchema>;
