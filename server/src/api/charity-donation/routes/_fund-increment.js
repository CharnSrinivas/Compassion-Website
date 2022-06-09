module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/charity-donations',
            handler: 'charity-donation.create',
            config: {
                policies: ['fund-increment']
            }
        }
    ]
}