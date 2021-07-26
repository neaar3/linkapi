import { Router } from "express";
import { getAndPostDeals, postDealsToBling } from "./controllers/bling";
import { saveDealsInDb } from "./controllers/database";
import { getDeals } from "./controllers/pipedrive";

const routes = Router();

routes.get("/pipedrive/deals", getDeals)
routes.post("/deals", saveDealsInDb)
routes.post("/bling/products", postDealsToBling)
routes.post("/", getAndPostDeals)


export default routes;