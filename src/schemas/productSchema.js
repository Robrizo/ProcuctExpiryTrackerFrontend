import { z } from "zod";

export const productSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Product name must be at least 3 characters.")
      .max(150, "Product name must be 150 characters or less."),

    category: z
      .string()
      .trim()
      .max(80, "Category must be 80 characters or less.")
      .optional()
      .default("General"),

    quantity: z
      .number({ invalid_type_error: "Quantity must be a number." })
      .int("Quantity must be a whole number.")
      .min(1, "Quantity must be at least 1."),

    purchase_date: z
      .string()
      .min(1, "Purchase date is required.")
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid purchase date format."),

    expiry_date: z
      .string()
      .min(1, "Expiry date is required.")
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid expiry date format."),

    notes: z
      .string()
      .trim()
      .max(500, "Notes must be 500 characters or less.")
      .refine(
        (value) => value.length === 0 || value.length >= 3,
        "Notes must be at least 3 characters when provided.",
      )
      .nullable()
      .optional()
      .transform((value) => value || null),
  })
  .refine(
    (data) =>
      !data.purchase_date ||
      !data.expiry_date ||
      data.purchase_date <= data.expiry_date,
    {
      message: "Expiry date cannot be earlier than purchase date.",
      path: ["expiry_date"],
    },
  );
