import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";

export default async function api ( method: Method | undefined, url: string ) {

    const options: AxiosRequestConfig = {
        method,
        url: `https://api.pipedrive.com/v1/${url}`,
        params: {api_token: process.env.PIPEDRIVE_API_KEY},
    };

    const deals: Array<any> = await axios.request(options).then(function (response) {
        return response.data.data;
    }).catch(function (error) {
        console.error(error);
    });

    return deals;
}