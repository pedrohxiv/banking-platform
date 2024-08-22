import { z } from "zod";

export const authFormSchema = (type: "sign-in" | "sign-up") =>
  z.object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" }),
    firstName:
      type === "sign-in"
        ? z.string().optional()
        : z
            .string()
            .min(1, { message: "First name is required" })
            .min(3, { message: "First name must be at least 3 characters" })
            .max(20, { message: "First name must be at most 20 characters" }),
    lastName:
      type === "sign-in"
        ? z.string().optional()
        : z
            .string()
            .min(1, { message: "Last name is required" })
            .min(3, { message: "Last name must be at least 3 characters" })
            .max(20, { message: "Last name must be at most 20 characters" }),
    address:
      type === "sign-in"
        ? z.string().optional()
        : z
            .string()
            .min(1, { message: "Address is required" })
            .min(3, { message: "Address must be at least 3 characters" })
            .max(50, { message: "Address must be at most 50 characters" }),
    city:
      type === "sign-in"
        ? z.string().optional()
        : z
            .string()
            .min(1, { message: "City is required" })
            .min(3, { message: "City must be at least 3 characters" })
            .max(50, { message: "City must be at most 50 characters" }),
    state:
      type === "sign-in"
        ? z.string().optional()
        : z
            .string()
            .min(1, { message: "State is required" })
            .length(2, { message: "State must be exactly 2 characters" }),
    postalCode:
      type === "sign-in"
        ? z.string().optional()
        : z
            .string()
            .min(1, { message: "Postal code is required" })
            .length(5, { message: "Postal code must be exactly 5 characters" }),
    dateOfBirth:
      type === "sign-in"
        ? z.string().optional()
        : z
            .string()
            .min(1, { message: "Date of birth is required" })
            .length(10, {
              message: "Date of birth must be in YYYY-MM-DD format",
            })
            .refine(
              (value) => {
                if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

                const [year, month, day] = value.split("-").map(Number);

                const currentYear = new Date().getFullYear();

                if (year < 1900 || year > currentYear) return false;

                if (month < 1 || month > 12) return false;

                const daysInMonth = new Date(year, month, 0).getDate();

                return day >= 1 && day <= daysInMonth;
              },
              { message: "Invalid date" }
            ),
    ssn:
      type === "sign-in"
        ? z.string().optional()
        : z
            .string()
            .min(1, { message: "SSN is required" })
            .length(4, { message: "SSN must be exactly 4 characters" }),
  });

export const paymentTransferFormSchema = z.object({
  senderBank: z
    .string()
    .min(1, { message: "Sender bank is required" })
    .min(4, { message: "Sender bank must be at least 4 characters" }),
  note: z.string().optional(),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  receiverBank: z
    .string()
    .min(1, { message: "Sharable ID is required" })
    .min(8, { message: "Sharable ID must be at least 8 characters" }),
  amount: z
    .string()
    .min(1, { message: "Amount is required" })
    .min(4, { message: "Amount must be at least 4 characters" }),
});
