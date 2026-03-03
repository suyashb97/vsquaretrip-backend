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



import { corsMiddleware } from "./corsMiddleware.js";

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

  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.headers.origin) {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  }

  if (req.method === "OPTIONS") {
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    return res.status(200).end();
  }

  return handler(req, res);
};