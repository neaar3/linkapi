import * as mongoose from "mongoose";

export const DealSchema = new mongoose.Schema({
    id: Number,
    title: String,
    person_name: String,
    value: Number,
    currency: String,
    update_time: Date,
    status: String
});

export interface DealInterface {
    _id: string,
    dealId: number,
    id: number,
    title: string,
    person_name: string,
    value: number,
    currency: string,
    update_time: Date,
    status: String
}

export type DealInterfaceDb = Omit<DealInterface, "_id">;

export const Deal = mongoose.model<DealInterface>('Deal', DealSchema);
