// import cors from "cors";

// export const corsMiddleware = cors({
//   origin: "*", // production me specific domain rakhna better
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// });

// import cors from "cors";

import { corsMiddleware } from "./corsmiddleware.js";

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

export const withCors = (handler) => async (req, res) => {
  await runMiddleware(req, res, corsMiddleware);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  return handler(req, res);
};