import axios from 'axios';
import dotenv from 'dotenv';
import { Query } from 'pg';
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


// helper axios instance
// Returns an Axios instance pre-configured with BASE_URL and a fresh Bearer token in the Authorization header
const api = async () => {
  const token = await getAccessToken();
  return axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${token}` }
  });
};


export const createTicket = async () => {
  const client = await api();
  const url = '/tickets/create';          // :contentReference[oaicite:1]{index=1}
  const payload = {
    participants: [{
      type: 'Client',
      protocolType: 'Mail',
      subProtocolType: 'MailTo',
      identifier: 'gurl@consist.co.il',
      name: 'Exam'
    }]
  };
  const { data } = await client.post(url, payload);
  return data;          // data.id -ticket ID
};

// const data = await createTicket();
// console.log(data);



export const sendMessage = async (ticketId, text) => {
  const client = await api();
  const url = `/tickets/send/${ticketId}`; // :contentReference[oaicite:2]{index=2}
  return client.post(url, { text });
};

// const data = await sendMessage(158918467,"hey");
// console.log("start:\n\n\n",data);



export const closeTicket = async (ticketId) => {
  const client = await api();

  // Build URL: nextState must be in the query-string, not in the JSON body.
  // Optional flags (getTicket, sendTicketStateChangedMessage, enableWebhook)
  // are left at their defaults but shown here for clarity.
  const url =
    `/tickets/setstate/${ticketId}` +
    '?nextState=Closed' +
    '&getTicket=false' +
    '&sendTicketStateChangedMessage=true' +
    '&enableWebhook=true';

  // No request body needed—Glassix uses only the query parameters.
  const { data } = await client.put(url);
  return data;
};



// const data = await closeTicket(158922246);
// console.log("start:\n\n\n",data);

