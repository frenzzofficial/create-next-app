import z from "zod";
import { emailRules, fullnameRules } from "../configs/schema.config";

export const contactSchema = z.object({
  fullname: fullnameRules,
  email: emailRules,
  topic: z.string().trim().min(5, "Topic is required"),
  message: z.string().trim().min(5, "Message is required"),
  newsletter: z.boolean().optional(),
});
