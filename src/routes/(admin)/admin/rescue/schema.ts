import { z } from 'zod';

export const formSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(1),
	age: z.coerce.number().positive(),
	color: z.string().min(1),
	gender: z.string().min(1).default('FEMALE'),
	description: z.string().min(1),
	bondedWith: z.array(z.string()),
	friendly: z.boolean(),
	image: z
		.instanceof(File, { message: 'Please upload a file.' })
		.refine((f) => f.size < 10_000_000, 'Max 10 MB upload size.')
		.optional()
});
export type FormSchema = typeof formSchema;
