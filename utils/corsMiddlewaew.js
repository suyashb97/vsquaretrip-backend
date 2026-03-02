// import cors from "cors";

// export const corsMiddleware = cors({
//   origin: "*", // production me specific domain rakhna better
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// });

import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173",
  "https://admin.vsquaretrip.com"
];

export const corsMiddleware = cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
});