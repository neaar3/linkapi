import { Request, Response } from "express";
import { toXML } from "jstoxml";
import { api, apiBling } from "../services/api";
import { getDealsInDatabase, saveDealsInDatabase } from "./database";

export async function postDealsToBling (_req: Request, res: Response) {
    try {
        const deals = await getDealsInDatabase();

        if(deals.length === 0) {
            res.status(400).json({ message:"No deals in database. Try saving them first" });
            throw new Error("No deals in database")
        }
        const xmlOptions = {
            header: true,
        };
        let dealsXml = deals.map(deal => {
            return toXML({
                pedido:{
                    descricao: deal.title,
                    cliente:{
                        nome: deal.person_name
                    },
                    item: {
                        qtde: 1,
                        vlr_unit: deal.value,
                    }
                }
            },
            xmlOptions)
        })
        const blingProducts = await apiBling()
        let index = 0
        for(let deal of dealsXml) {
            if(blingProducts) {
                const productRegistered = blingProducts.filter(product => {
                    return product.produto.descricao === deals[index].title;
                })
                if(productRegistered.length === 0) {
                    api("POST", "https://bling.com.br/Api/v2/produto/json/", { apikey: process.env.BLING_API_KEY as string, xml: deal })
                }
                index++;
            } else {
                api("POST", "https://bling.com.br/Api/v2/produto/json/", { apikey: process.env.BLING_API_KEY as string, xml: deal })
            }
        }
        return res.status(200).json({ message: "New products were successfully saved" })

    } catch (err) {
        return res
        .status(err.status || 500)
        .json({ error: err.message || "Something is wrong" });
    }
}

export async function getAndPostDeals (_req: Request, res: Response) {
    try {
        await saveDealsInDatabase();
        await postDealsToBling(_req, res);
    } catch (err) {
        return res
      .status(err.status || 500)
      .json({ error: err.message || "Something is wrong" });
    }
}

