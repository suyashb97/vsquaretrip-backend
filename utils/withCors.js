// import { corsMiddleware } from "./corsMiddlewaew.js";

// function runMiddleware(req, res, fn) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) return reject(result);
//       return resolve(result);
//     });
//   });
// }

// export const withCors = (handler) => async (req, res) => {
//   await runMiddleware(req, res, corsMiddleware);

//   // OPTIONS request ko yahin handle kar do
//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }

//   return handler(req, res);
// };


import cors from "cors";

const corsMiddleware = cors({
  origin: [
    "https://admin.vsquaretrip.com",
    "http://localhost:5173",
  ],
  credentials: true,
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

export const withCors = (handler) => async (req, res) => {
  try {
    await runMiddleware(req, res, corsMiddleware);
  } catch (err) {
    console.error("CORS ERROR:", err);
    return res.status(500).json({ message: "CORS failed" });
  }

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  return handler(req, res);
};