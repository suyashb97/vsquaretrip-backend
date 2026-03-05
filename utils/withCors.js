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
import cookieParser from "cookie-parser";

export const withCors = (handler) => {
  const corsMiddleware = cors({
    origin: [
      process.env.FRONTEND_URL,       // live admin
      process.env.FRONTEND_URL_LIVE,  // live site
      "http://localhost:5173",        // local dev
    ],
    credentials: true,  // allow cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  return async (req, res) => {
    // Apply CORS
    await new Promise((resolve, reject) => {
      corsMiddleware(req, res, (result) => {
        if (result instanceof Error) return reject(result);
        resolve(result);
      });
    });

    // Parse cookies
    cookieParser()(req, res, () => {});

    return handler(req, res);
  };
};