"use server";

import { postData } from "./api";
import { revalidatePath } from "next/cache";

export async function actionSubmit(prev, formData) {
  const raw = Object.fromEntries(formData.entries());

  const data = {
    name: raw.name || "",
    email: raw.email || "",
    company: raw.company || "",
    link: raw.link || "",
    additional_info: raw.additional_info || "",
  };

  const errors = {};
  if (!data.name) {
    errors.name = "Navn er obligatorisk";
  }
  if (data.name.length === 1) {
    errors.name = "Har dit navn virkelig kun ét bogstav?";
  }
  if (!data.email || !data.email.includes("@")) {
    errors.email = "Email er obligatorisk, og skal indeholde '@'";
  }

  if (Object.keys(errors).length > 0) {
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
    return { success: false, message: "Noget gik galt. Prøv igen." };
  }
}
