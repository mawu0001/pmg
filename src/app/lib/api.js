import axios from "axios";

const endpoint = process.env.NEXT_PUBLIC_SUPABASE_URL_newsletter;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_newsletter;

export async function getData() {
  const endpoint = process.env.NEXT_PUBLIC_SUPABASE_URL_newsletter;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_newsletter;

  if (!endpoint || !supabaseKey) {
    throw new Error("Supabase-miljøvariabler mangler! Tjek .env.local");
  }
  const response = await axios.get(`${endpoint}?order=id.desc`, {
    headers: {
      apikey: supabaseKey,
    },
  });

  return response.data;
}

export async function getDataById(id) {
  const response = await axios.get(`${endpoint}?id=eq.${id}`, {
    headers: {
      apikey: supabaseKey,
    },
  });

  return response.data;
}

export async function postData(data) {
  const response = await axios.post(endpoint, data, {
    headers: {
      apikey: supabaseKey,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
  });

  return response.data;
}
