exports.sendText = async (username, password, serviceID, phoneNumber) => {
    const client = require('twilio')(username, password)
    var check = null
        try {
            const { status } = await client.verify.services(serviceID)
                .verifications
                .create({to: phoneNumber, channel: 'sms'})
                .then(verification => check = status);
        } catch(err) {
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
