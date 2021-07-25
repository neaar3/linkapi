import {Request, Response} from 'express';
import api from '../services/api'

export default async function getDeals (_req: Request, res: Response) {

  const deals = await api("get", "/deals")

  if(!deals) {
    throw new Error("No deals are approved");
  }

  const successfulDeals = deals.filter((deal: any) => deal.status === "won")

  res.status(200).json(successfulDeals);
  return successfulDeals;
}


