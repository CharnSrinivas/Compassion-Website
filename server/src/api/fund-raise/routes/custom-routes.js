module.exports = {
    routes: [
        {
            method: 'PUT',
            path: '/fund-raises/:id',
            handler: 'fund-raise.update',
            config: {
                policies: ['validate-update']
            }
        },
         {
            method: 'GET',
            path: '/fund-raises/test',
            handler: 'custom.test',

        }
    ]
}