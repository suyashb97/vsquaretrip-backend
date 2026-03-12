// import cors from "cors";

// export const corsMiddleware = cors({
//   origin: "*", // production me specific domain rakhna better
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// });



export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Saare allowed domains ki list jo aapne env mein di hai
    const allowedOrigins = [
      process.env.FRONTEND_URL,       // https://admin.vsquaretrip.com
      process.env.FRONTEND_URL_LIVE,  // https://vsquaretrip.com
      process.env.FRONTEND_URL_LOCAL  // http://localhost:5173
    ];

    // Postman ya bina origin wali requests ko allow karne ke liye (!origin)
    // Production mein development (localhost) tabhi chalega agar wo env mein hai
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});