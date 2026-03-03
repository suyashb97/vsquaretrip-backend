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



export function withCors(handler) {
  return async (req, res) => {

    const allowedOrigins = [
      process.env.FRONTEND_URL,
      process.env.FRONTEND_URL_LOCAL,
    ];

    const origin = req.headers.origin;

    // 🔥 Set CORS headers
    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }

    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    // 🔥 Handle preflight
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    try {
      return await handler(req, res);
    } catch (error) {
      console.error("API Error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
}