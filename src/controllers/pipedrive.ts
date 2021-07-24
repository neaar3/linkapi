import axios, { AxiosRequestConfig } from "axios";
import {Request, Response} from 'express';

export default async function getDeals (_req: Request, res: Response) {

  const options: AxiosRequestConfig = {
    method: 'GET',
    url: 'https://api.pipedrive.com/v1/deals',
    params: {api_token: process.env.PIPEDRIVE_API_KEY},
  };

  const deals: Array<any> = await axios.request(options).then(function (response) {
    return response.data.data;
  }).catch(function (error) {
    console.error(error);
  });

  const successfulDeals = deals.filter((deal: any) => deal.status == "won")

  return res.status(200).json(successfulDeals);
}

