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

// utils/withCors.js
import cors from "cors";
import cookieParser from "cookie-parser";

export const withCors = (handler) => async (req, res) => {
  // CORS
  await new Promise((resolve, reject) => {
    cors({
      origin: [
        process.env.FRONTEND_URL,
        process.env.FRONTEND_URL_LIVE,
        "http://localhost:5173", // local dev
      ],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })(req, res, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });

  // Parse cookies
  cookieParser()(req, res, () => {});

  return handler(req, res);
};