import axios, { AxiosRequestConfig, Method } from "axios";
import HttpError from "../utils/http-error";
interface Params {
    apikey?: string,
    api_token?: string,
    xml?: string
}

export async function api(method: Method | undefined, url: string, params: Params) {

    const options: AxiosRequestConfig = {
        method,
        url,
        params,
        headers: { 'Content-Type': 'application/xml' }
    };

    const deals: Array<any> = await axios.request(options).then(function (response) {
        return response.data.data;
    }).catch(function (error) {
        throw new HttpError(error, 400)
    });

    return deals;
}

export async function apiBling() {
    const options = {
        method: 'GET' as Method | undefined,
        url: 'https://bling.com.br/Api/v2/produtos/json/',
        params: {
            apikey: process.env.BLING_API_KEY
        }
    };

    const products: Array<any> = await axios.request(options).then(function (response) {
        return response.data.retorno.produtos;
    }).catch(function (error) {
        throw new HttpError(error, 400)
    });

    return products;
}