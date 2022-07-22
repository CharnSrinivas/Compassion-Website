module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/donations',
            handler: 'donation.create',
            config: {
                policies: ['fund-increment']
            }
        }, {
            method: "POST",
            path: '/donations/create-stripe-session',
            handler: 'custom.createStripeSession'
        },
        {
            method: 'POST',
            path: '/donations/success',
            handler: "custom.donationSuccess"
        },
        // create-coinbase-charge
        {
            method: 'POST',
            path: '/donations/create-charge',
            handler: "custom.createCharge"
        },
        {
            method:"POST",
            path: '/donations/coinbase-webhook-handler',
            handler: "custom.coinbaseWebhookHandler"
        }
    ]
}