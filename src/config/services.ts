import dotenv from 'dotenv'
dotenv.config()

export default {
    bling: {
        baseUrl: process.env.BLING_BASE_URL ?? 'https://bling.com.br/Api/v2',
        token: process.env.BLING_API_KEY
    },
    pipedrive: {
        baseUrl: process.env.PIPEDRIVE_BASE_URL ?? 'https://api.pipedrive.com/v1',
        token: process.env.PIPEDRIVE_API_KEY
    }
}