const { sendText, verify } = require('./text')

module.exports = {
    Mutation: {
        async sendText(_, { username, password, serviceID, phoneNumber }) {
            return await sendText(username, password, serviceID, phoneNumber)
                .then(() => ({
                    message: "Text sent."
                }))
                .catch(() => ({
                    error: {
                        value: true,
                        message: "Could not send the text"
                    }
                }))
        },

        async verify(_, { username, password, serviceID, phoneNumber, code }) {
            const verified = await verify(username, password, serviceID, phoneNumber, code)
            if (!verified) {
                return {
                    error: {
                        value: true,
                        message: "Incorrect verification code"
                    }
                }
            } else {
                return {
                    message: "Verified"
                }
            }
            
        }
    }
}