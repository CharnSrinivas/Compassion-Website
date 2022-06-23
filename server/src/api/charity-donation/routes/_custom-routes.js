module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/charity-donations',
            handler: 'charity-donation.create',
            config: {
                policies: ['fund-increment']
            }
        },
        {
            method: "POST",
            path: '/charity-donations/create-stripe-session',
            handler: 'custom.createStripeSession'
        },
        {
            method: 'POST',
            path: '/charity-donations/success',
            handler: "custom.donationSuccess"
        }
    ]
}