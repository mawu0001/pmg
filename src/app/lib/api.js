import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_SUPABASE_URL_contactform;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_contactform;

export async function getData() {
  try {
    const response = await axios.get(`${baseURL}?order=id.desc`, {
      headers: {
        apikey: supabaseKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Fejl i getData:", error);
  }
}

export async function getDataById(id) {
  try {
    const response = await axios.get(`${baseURL}?id=eq.${id}`, {
      headers: {
        apikey: supabaseKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Fejl i getDataById med id=${id}:`, error);
  }
}

export async function postData(data) {
  try {
    const response = await axios.post(baseURL, data, {
      headers: {
        apikey: supabaseKey,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Fejl i postData:", error);
  }
}
