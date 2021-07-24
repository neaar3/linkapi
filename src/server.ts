import dotenv from "dotenv";

import app from ".";

import { databaseConnect } from "./config/connection";

dotenv.config();

const port = process.env.PORT ?? 8000;

databaseConnect();

app.listen(port, () => console.log(`Application running on http://localhost:${port}`));