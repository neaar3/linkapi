import { Request, Response } from 'express';
import { Deal } from '../models/database'
import getSuccessfulDeals from './pipedrive';

export async function saveDealsInDatabase() {
    try {
        let successfulDeals = await getSuccessfulDeals();
        for (let deal of successfulDeals) {
            const dealDate = new Date(deal.update_time);
            const dealExists = await Deal.find({ update_time: dealDate });

            if(dealExists.length === 0) {
                await new Deal(deal).save()
            }
        }
        let aggregate = await Deal.aggregate([
            {
                $group: {
                    _id: {
                        date: {
                            $dateToString: {
                                date: '$date'
                            }
                        }
                    },
                    totalValue: { $sum: '$value' },
                    deals: { $push: '$$ROOT' }
                },
            }, { $sort: { _id: 1 } }
        ])
        return successfulDeals;

    } catch (err) {
        throw new Error(err);
    }
};

export async function saveDealsInDb (_req: Request, res: Response) {
    try{
        const deals = await saveDealsInDatabase();
        if(deals) {
           return res.status(200).json({ message: "New deals successfully saved" })
        }
        return res.status(400).json({ message: "There are no deals to save"})

    } catch (err) {
        return res
        .status(err.status || 500)
        .json({ error: err.message || "Something is wrong" });
    }
}

export async function getDealsInDatabase() {
    return await Deal.find();
}