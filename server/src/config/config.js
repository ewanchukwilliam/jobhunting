const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 5000,
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "Penisbutt123!",
  DB_NAME: process.env.DB_NAME || "JobHunting",
  SECRET_KEY: process.env.SECRET_KEY || "your_default_secret_key",
  REFRESH_SECRET: process.env.REFRESH_SECRET || "your_default_refresh_secret",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000",
};
