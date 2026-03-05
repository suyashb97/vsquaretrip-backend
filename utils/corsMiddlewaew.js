// import cors from "cors";

// export const corsMiddleware = cors({
//   origin: "*", // production me specific domain rakhna better
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// });




import cors from "cors";

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URL_LIVE,
  process.env.FRONTEND_URL_LOCAL,
];

export const corsMiddleware = cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["POST", "GET"],
  allowedHeaders: ["Content-Type", "Authorization"],
});