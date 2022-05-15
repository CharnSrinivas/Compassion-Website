module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/donations',
            handler: 'donation.create',
            config: {
                policies: ['fund-increment']
            }
        }
    ]
}