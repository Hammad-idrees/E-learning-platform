// config/cors.config.js
const allowedOrigins = [
  process.env.FRONTEND_URL, // e.g., 'http://localhost:3000'
  "https://your-production-domain.com",
  "https://studio.apollographql.com", // If using GraphQL Playground
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Required for cookies/sessions --> Make sure your frontend sets withCredentials: true in Axios or fetch.
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default corsOptions;
