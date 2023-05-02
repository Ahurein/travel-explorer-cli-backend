import {Types, Schema} from 'mongoose'

export interface IAttractions {
    continent: Types.ObjectId;
    country: string
    attraction: Schema.Types.Mixed
}