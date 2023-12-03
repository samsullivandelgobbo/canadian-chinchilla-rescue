import { z } from 'zod';
const MAX_FILE_SIZE = 5000000;

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const formSchema = z.object({
	name: z.string().min(1),
	age: z.coerce.number().positive(),
	color: z.string().min(1),
	gender: z.string().min(1).default('FEMALE'),
	description: z.string().min(1),
	friendly: z.boolean(),
	// handle image uploads
	images: z.any()
});
export type FormSchema = typeof formSchema;
