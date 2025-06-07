"use server";

import { postData } from "../lib/api";
import { revalidatePath } from "next/cache";

export async function actionSubmit(prev, formData) {
  // formater formData til et plain object med dataen
  const data = Object.fromEntries(formData.entries());

  const errors = {};
  if (!data.name) {
    errors.name = "Navn er obligatorisk";
  }
  if (data.name && data.name.length === 1) {
    errors.name = "Har dit navn virkelig kun et bogstav?";
  }
  if (!data.email || !data.email.includes("@")) {
    errors.email = "Email er obligatorisk, og med et @";
  }
  if (errors.name || errors.email) {
    return {
      success: false,
      errors,
      ...data,
    };
  }
  const res = await postData(data);

  if (res) {
    revalidatePath("/");
    return { success: true, message: "Tak. Vi kontakter dig pr. email." };
  } else {
    return { success: false, message: "Fejl. Prøv igen." };
  }
}
