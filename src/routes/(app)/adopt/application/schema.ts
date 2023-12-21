import { z } from 'zod';

export const applicationSchema = z.object({
	firstName: z
		.string({})
		.min(2, 'First name must be at least 2 characters long')

		.max(50, 'First name must be less than 50 characters long'),

	lastName: z
		.string()
		.min(1, 'Last name must be at least 1 character long')
		.max(50, 'Last name must be less than 50 characters long'),
	email: z.string().email(),
	age: z.coerce.number().positive().min(12),

	// if age under 18, require parent/guardian info
	parentFirstName: z.string().min(2).max(50).optional(),
	parentLastName: z.string().min(2).max(50).optional(),
	parentEmail: z.string().email().optional(),
	parentAge: z.number().min(18).max(100).optional(),
	// must be true
	readCareGuide: z.boolean().refine((value) => value, {
		message: 'You must read the care guide before submitting an application.'
	}),
	readAdoptionPolicy: z.boolean(),

	hasCage: z.boolean(),
	cageType: z.string().optional(),
	cageImages: z.any().optional(),

	hasChildren: z.boolean(),
	hasAllergies: z.boolean(),
	hasPets: z.boolean(),
	petTypes: z.array(z.string()).optional(),
	hasChinchillaVet: z.boolean(),

	// if hasChinchilla, require chinchilla info
	hasChinchilla: z.boolean(),
	chinchillaName: z.string().optional(),
	chinchillaAge: z.number().min(0).max(100).optional(),
	chinchillaGender: z.string().optional(),
	chinchillaFriendly: z.boolean().optional(),
	willQuarantine: z.boolean(),

	ownedChinchillas: z.boolean(),
	ownedChinchillasCount: z.number().min(0).max(100).optional(),
	// if ownedChinchillas, require chinchilla info
	ownedChinchillaNames: z.array(z.string()).optional(),
	ownedChinchillaAges: z.array(z.number()).optional(),
	ownedChinchillaGenders: z.array(z.string()).optional(),

	surrenderedPets: z.boolean(),
	// if surrenderedPets, require surrendered pet info
	surrenderedPetType: z.string().optional(),
	surrenderedPetReason: z.string().optional(),

	// ackknowledgements (all required)
	hasAirConditioning: z.boolean().refine((value) => value, {
		message: 'You must have air conditioning to adopt a chinchilla.'
	}),
	financialResponsibility: z.boolean().refine((value) => value, {
		message: 'You must be financially able to care for a chinchilla.'
	}),
	timeResponsibility: z.boolean().refine((value) => value, {
		message: 'You must have time to care for a chinchilla.'
	}),
	hasSpace: z.boolean().refine((value) => value, {
		message: 'You must have space for a chinchilla.'
	}),
	handlingAcknowledgement: z.boolean().refine((value) => value, {
		message: 'You must understand the handling requirements of a chinchilla.'
	}),
	breedingAcknowledgement: z.boolean().refine((value) => value, {
		message: 'You must agree to never breed your chinchilla.'
	}),
	cleaningResponsibility: z.boolean().refine((value) => value, {
		message: "You must be able to clean your chinchilla's cage regularly."
	}),
	playtimeResponsibility: z.boolean().refine((value) => value, {
		message: 'You must be able to provide regular playtime for your chinchilla.'
	}),
	factuallyAccurate: z.boolean().refine((value) => value, {
		message: 'You must agree that all information provided is factually accurate.'
	}),

	message: z.string().min(0).max(10000)
});

export type FormSchema = typeof applicationSchema;
