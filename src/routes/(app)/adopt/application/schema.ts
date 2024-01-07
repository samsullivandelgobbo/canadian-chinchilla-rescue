import { z } from 'zod';

export const applicationSchema = z
	.object({
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
		parentFirstName: z
			.string()
			.min(2, 'Parent/Guardian first name must be at least 2 characters long')
			.max(50)
			.optional(),
		parentLastName: z
			.string()
			.min(2, 'Parent/Guardian last name must be at least 2 characters long')
			.max(50)
			.optional(),
		parentEmail: z.string().email().optional(),
		parentAge: z.number().min(18).max(100).optional(),
		// must be true
		readCareGuide: z.boolean().refine((value) => value, {
			message: 'You must read the care guide before submitting an application.'
		}),
		readAdoptionPolicy: z.boolean(),

		hasCage: z.boolean(),
		cageType: z.string().optional(),
		cageImage: z.any().optional(),

		hasChildren: z.boolean(),
		hasAllergies: z.boolean(),
		hasPets: z.boolean(),
		petTypes: z.any().optional(),
		hasChinchillaVet: z.boolean(),

		selectedChinchillas: z.any().optional(),

		// if hasChinchilla, require chinchilla info
		hasChinchilla: z.boolean(),
		chinchillaName: z.string().optional(),
		chinchillaAge: z.coerce.number().positive().min(0).max(100).optional(),
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
			message: 'You must be finacially capable of caring for a chinchilla.'
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

		whyChinchilla: z
			.string()
			.min(
				100,
				'Please provide at least 100 characters explaining why you want to adopt a chinchilla.'
			)
			.max(10000)
	})
	.refine(
		(data) => {
			// If hasChinchilla is true, then willQuarantine must also be true
			if (data.hasChinchilla) {
				return data.willQuarantine === true;
			}
			// If hasChinchilla is not true, no further validation is needed for willQuarantine
			return true;
		},
		{
			message: 'If you have a chinchilla, you must agree to quarantine it.',
			path: ['willQuarantine'] // Specify the path of the field that the error message relates to
		}
	)
	.refine(
		(data) => {
			// If hasCage is true, then cageType must be defined
			if (data.hasCage) {
				return data.cageType !== undefined;
			}
			// If hasCage is not true, no further validation is needed for cageType
			return true;
		},
		{
			message: 'If you have a cage, you must specify the type.',
			path: ['cageType'] // Specify the path of the field that the error message relates to
		}
	)
	.refine(
		(data) => {
			// If hasCage is true, then cageType must be defined
			if (data.surrenderedPets) {
				return data.surrenderedPetReason !== '';
			}
			// If hasCage is not true, no further validation is needed for cageType
			return true;
		},
		{
			message: 'If you have surrendered a pet, you must specify the reason.',
			path: ['surrenderedPetReason'] // Specify the path of the field that the error message relates to
		}
	)
	.refine(
		(data) => {
			// If hasCage is true, then cageType must be defined
			if (data.surrenderedPets) {
				return data.surrenderedPetType !== undefined && data.surrenderedPetType !== '';
			}
			// If hasCage is not true, no further validation is needed for cageType
			return true;
		},
		{
			message: 'If you have a cage, you must upload a photo.',
			path: ['cageImage'] // Specify the path of the field that the error message relates to
		}
	)
	// refine parent fields
	.refine(
		(data) => {
			// If hasCage is true, then cageType must be defined
			if (data.age < 18) {
				return data.parentFirstName !== undefined && data.parentFirstName !== '';
			}
			// If hasCage is not true, no further validation is needed for cageType
			return true;
		},
		{
			message: "If you are under 18, you must provide your parent/guardian's first name.",
			path: ['parentFirstName'] // Specify the path of the field that the error message relates to
		}
	);
export type FormSchema = typeof applicationSchema;
