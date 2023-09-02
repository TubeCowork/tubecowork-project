import { maxVideoDescriptionCharacters, maxVideoTagsCharacters, maxVideoTitleCharacters } from "@/backend/models/YoutubeVideo.model";
import { z } from "zod";


export const VideoUploadDataSchema = z.object({
    video: z.string().max(300),
    thumbnail: z.string().max(300).optional(),
    title: z.string().trim().max(maxVideoTitleCharacters, { message: "Must be 100 or fewer characters in title" }),
    description: z.string().max(maxVideoDescriptionCharacters).default(""),
    tags: z.string().max(maxVideoTagsCharacters).optional(),
});


export type YoutubeVideoData = z.infer<typeof VideoUploadDataSchema>;
