import cors from "cors";

export const corsMiddleware = cors({
  origin: "*", // production me specific domain rakhna better
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});
