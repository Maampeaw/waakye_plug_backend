
import express from 'express'
import GenericHelper from '../utils/helpers/generic_helper.js'
import { sendEmail } from '../../config/mail_config.js'


const {successResponse} = GenericHelper


export const orderFood = async (req, res) => {
    
    const {userName, location, food_type, ingredients, phoneNumber} = req.body

    if (ingredients || ingredients?.length > 0){
        sendEmail(`<strong style="font-size: 20px; color: rgba(31, 31, 70, 1)">${userName}</strong> has created an order with waakye type <strong style="font-size: 20px; color: rgba(31, 31, 70, 1)">${food_type}</strong> and stays at <strong style="font-size: 20px; color: rgba(31, 31, 70, 1)">${location}</strong>. call the user on <strong style="font-size: 20px; color: rgba(31, 31, 70, 1)">${phoneNumber}</strong>, with ingredients: ${JSON.stringify(ingredients)}`)
    }else{
        sendEmail(`<strong style="font-size: 20px; color: rgba(31, 31, 70, 1)">${userName}</strong> has created an order with waakye type <strong style="font-size: 20px; color: rgba(31, 31, 70, 1)">${food_type}</strong> and stays at <strong style="font-size: 20px; color: rgba(31, 31, 70, 1)">${location}</strong>. call the user on <strong style="font-size: 20px; color: rgba(31, 31, 70, 1)">${phoneNumber}</strong>`)
    }

    return successResponse(res, {data: {userName, location, food_type, ingredients}, message: "Order placed, An agent will call you shortly", code: 200 })
}

