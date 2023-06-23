import { config } from "dotenv";

config();

const environment = {
  PORT: process.env.PORT,
  CONNECTION: process.env.CONNECTION
}

export {
  environment
}