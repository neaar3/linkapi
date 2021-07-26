import { Request, Response } from 'express';
import { DealInterface } from '../models/database';
import { api } from '../services/api';

export default async function getSuccessfulDeals () {
  try{
    const deals:Array<DealInterface> = await api("get", "https://api.pipedrive.com/v1/deals", { api_token: process.env.PIPEDRIVE_API_KEY as string } )

    if(!deals) {
      throw new Error("No deals approved");
    }

    const successfulDeals = deals.filter((deal: DealInterface) => deal.status === "won")

    if(successfulDeals.length === 0) {
      throw new Error("No deals approved");
    }

    const rearrangedDeals = successfulDeals.map(deal => ({
      id: deal.id,
      title: deal.title,
      person_name: deal.person_name,
      value: deal.value,
      currency: deal.currency,
      update_time: deal.update_time,
      status: deal.status
    }));

    return rearrangedDeals
  } catch (err) {
      throw new Error(err)
  }
}

export async function getDeals(_req: Request, res: Response) {
  try {
    const deals = await getSuccessfulDeals();
    if(deals) {
      return res.status(200).json(deals)
    }
    return res.status(400).json({ message: "Pepidrive does not have any deals"})
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({ error: err.message || "Something is wrong" });
  }
}


