
import { z } from "zod";

const thumbnailSchema = z.object({
  url: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export const youtubeVideoSchema = z.object({
  id: z.string(),

  snippet: z.object({
    title: z.string(),
    description: z.string(),
    channelTitle: z.string(),
    publishedAt: z.string(),

    thumbnails: z.object({
      default: thumbnailSchema.optional(),
      medium: thumbnailSchema.optional(),
      high: thumbnailSchema.optional(),
      standard: thumbnailSchema.optional(),
      maxres: thumbnailSchema.optional(),
    }),
  }),

  statistics: z
    .object({
      viewCount: z.string().optional(),
      likeCount: z.string().optional(),
      commentCount: z.string().optional(),
    })
    .optional(),

  contentDetails: z
    .object({
      duration: z.string(),
    })
    .optional(),
});

export type YouTubeVideo = z.infer<typeof youtubeVideoSchema>;

export const trendingVideoResponseSchema = z.array(youtubeVideoSchema);

export type TrendingVideoResponse = z.infer<
  typeof trendingVideoResponseSchema
>;
