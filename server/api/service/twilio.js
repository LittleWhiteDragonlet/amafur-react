'use strict'
const twilio = require('twilio')

const accountSid = process.env.TWILIO_ACCOUNT
const authToken = process.env.TWILIO_AUTH

const client = new twilio(accountSid, authToken)

module.exports = client
