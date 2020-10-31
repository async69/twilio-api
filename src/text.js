// const username = 'AC66ea454bf257cf479899dc9fd46e45de'
// const password = '658bba8aec3ad6a0025d5a7b77f83ca7'
// const serviceID = 'VAfc619e555d3a39cf7c1302de590f1862'
// const client = require('twilio')(username, password)


exports.sendText = async (username, password, serviceID, phoneNumber) => {
    console.log("A1: ", username)
    console.log("A2: ", password)
    console.log("A3: ", serviceID)
    console.log("A4: ", phoneNumber)
    const client = require('twilio')(username, password)
    var check = null
        try {
            const { status } = await client.verify.services(serviceID)
                .verifications
                .create({to: phoneNumber, channel: 'sms'})
                .then(verification => check = status);
            console.log("here 1")
        } catch(err) {
            console.log("here 2")
            return {
                status: 400,
                message:"Invalid request"
            }
        }
        if (check === 'pending') {
            console.log("here 3")
            return {
                status: 200,
                message: "Code Sent"
            }
        }
}

exports.verify = async (username, password, serviceID, to, code) => {
    const client = require('twilio')(username, password)
    const { status } = await client.verify.services(serviceID)
        .verificationChecks
        .create({ to, code })
        .catch(err => console.error(err))
    if (status === 'approved') {
        return true
    } else {
        return false
    }
}
