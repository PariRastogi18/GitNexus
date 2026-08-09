import z from "zod";

export const signUpSchema = z.object({
    username:z.string().min("Username must be 3 character").max("Username cannot exceed 20 character"),
    email:z.email("Invalid email address"),
    password:z.string().min("Password must be at least 8 character"),
});

export const loginSchema = z.object({
    email:z.email("Invalid email address"),
    password:z.string().min("Password must be at least 8 character"),
});
