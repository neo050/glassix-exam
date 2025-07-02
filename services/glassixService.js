import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
//console.log('ENV keys:', Object.keys(process.env));

const {
  API_KEY,
  API_SECRET,
  API_USER,
  WORKSPACE
} = process.env;

const BASE_URL = `https://${WORKSPACE}.glassix.com/api/v1.2`;
console.log(BASE_URL);
let cachedToken = null;          //We will remember a token for 3 hours.
let tokenExpires = 0;

export const getAccessToken = async () => {
  if (cachedToken && Date.now() < tokenExpires) return cachedToken;

  const url = `${BASE_URL}/token/get`;   // :contentReference[oaicite:0]{index=0}
  const payload = {
    apiKey: API_KEY,
    userName: API_USER,
    apiSecret: API_SECRET
  };

  const { data } = await axios.post(url, payload);
  cachedToken  = data.access_token;
  console.log(data);
  tokenExpires = Date.now() + 1000 * 60 * 60 * 3;   // 3h
  return cachedToken;
};


// const token = await getAccessToken();
// console.log(token);
