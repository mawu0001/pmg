"use server";

import { getData, postData } from "../api/api";
import { revalidatePath } from "next/cache";

export async function actionSubmit(prev, formData) {
  // Convert formData into a plain object with all entries
  const data = Object.fromEntries(formData.entries());

  const errors = {};
  if (!data.name) {
    errors.name = "Name is required";
  }
  if (data.name && data.name.length === 1) {
    errors.name = "Does your name really have only one character?";
  }
  if (!data.email || !data.email.includes("@")) {
    errors.email = "Email is required";
  }
  if (errors.name || errors.email) {
    return {
      success: false,
      errors,
      ...data,
    };
  }

  const signups = await getData();
  const existingEmail = signups.find((signup) => signup.email === data.email);

  if (existingEmail) {
    return {
      success: false,
      errors: { email: "Email already exists" },
      ...data,
    };
  }

  const res = await postData(data);

  if (res) {
    revalidatePath("/");
    return { success: true, message: "Thanks for submitting" };
  } else {
    return { success: false, message: "Failed to submit" };
  }
}
