import joi from "joi";

export const entry = joi.object({
    description: joi.string().required(),
    value: joi.number().required()
})