import { z } from "zod";

export const saveVideoSchema = z.object({
  videoId: z.string(),
  title: z.string(),
  thumbnail: z.string(),
  channelTitle: z.string(),
  description: z.string(),
  publishedAt: z.string(),
});

export type SaveVideoInput = z.infer<typeof saveVideoSchema>;