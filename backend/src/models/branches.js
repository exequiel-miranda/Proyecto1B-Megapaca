/*
Campos:
    name
    address
    schedule
    isActive
*/

import { Schema, model } from "mongoose";

const branchesSchemma = new Schema({
    name:{
        type: String,
    },
    address:{
        type: String,
    },
    schedule:{
        type: String,
    },
    isActive:{
        type: Boolean,
    },
},{
    timpestamps: true,
    strict: false
});

export default model ("branches", branchesSchemma)