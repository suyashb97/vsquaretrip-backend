// import cors from "cors";

// export const corsMiddleware = cors({
//   origin: "*", // production me specific domain rakhna better
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// });



import cors from "cors";

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      "https://admin.vsquaretrip.com",
      "https://vsquaretrip.com",
      "http://localhost:5173", // Local development ke liye
    ];
    // !origin allow karta hai Postman ya non-browser requests ko
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200, // Preflight requests (OPTIONS) ke liye
});