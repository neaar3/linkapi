import { Router } from "express";
import getDeals from "./controllers/pipedrive";

const routes = Router();

routes.get("/teste", getDeals)

export default routes;