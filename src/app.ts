import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import { swaggerDocument } from "./swagger";
import swaggerUi from "swagger-ui-express";

dotenv.config();

import pokemon from "@/routes/pokemon-route";
import RouteNotFoundMiddleware from "./middleware/not-found";

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.use(cors());

app.use(helmet());

app.use(hpp());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/v1/pokemon", pokemon);
app.use(RouteNotFoundMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on: ${PORT}`);
});
