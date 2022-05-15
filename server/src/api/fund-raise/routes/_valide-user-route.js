module.exports = {
    routes: [
        {
            method: 'PUT',
            path: '/fund-raises/:id',
            handler: 'fund-raise.update',
            config: {
                policies: ['validate-user']
            }
        }
    ]
}