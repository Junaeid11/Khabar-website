import { z } from 'zod';

const createMealValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Meal name is required",
    }).min(1, "Meal name cannot be empty"),

    description: z.string({
      required_error: "Meal description is required",
    }).min(1, "Meal description cannot be empty"),

    slug: z.string({
      required_error: "Slug is required",
    }).min(1, "Slug cannot be empty"),


    ingredients: z.array(z.string()).nonempty({
      message: "Ingredients are required and cannot be empty",
    }),

    price: z.number({
      required_error: "Meal price is required",
    }).min(0, "Price cannot be less than 0"),

    dietaryTags: z.array(
      z.enum(["vegan", "vegetarian", "gluten-free", "keto", "paleo", "halal", "kosher"])
    ).nonempty("At least one dietary tag is required"),
    isActive: z.boolean().optional().default(true),

    rating: z.number().min(0, "Rating cannot be less than 0").max(5, "Rating cannot exceed 5").optional().default(0),

    ratingCount: z.number().min(0, "Rating count cannot be less than 0").optional().default(0),

    preparationTime: z.number().min(0, "Preparation time cannot be less than 0").optional(),

    calories: z.number().min(0, "Calories cannot be less than 0").optional(),

    protein: z.number().min(0, "Protein cannot be less than 0").optional(),

    carbs: z.number().min(0, "Carbs cannot be less than 0").optional(),

    fat: z.number().min(0, "Fat cannot be less than 0").optional(),
    stock: z.number().min(0, "Stock cannot be less than 0").optional(),
  }),
});

export { createMealValidationSchema };


const updateProductValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Product name cannot be empty").optional(),
    description: z.string().min(1, "Product description cannot be empty").optional(),
    price: z.number().min(0, "Product price cannot be less than 0").optional(),
    stock: z.number().min(0, "Product stock cannot be less than 0").optional(),
    weight: z.number().min(0, "Weight cannot be less than 0").nullable().optional(),
    offer: z.number().min(0, "Offer cannot be less than 0").optional(),
    category: z.string().min(1, "Category ID cannot be empty").optional(),
  })
});

export const productValidation = {
  createMealValidationSchema,
  updateProductValidationSchema
}

