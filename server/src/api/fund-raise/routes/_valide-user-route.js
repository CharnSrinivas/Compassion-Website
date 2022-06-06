module.exports = {
    routes: [
        {
            method: 'PUT',
            path: '/fund-raises/:id',
            handler: 'fund-raise.update',
            config: {
                policies: ['validate-user']
            }
        },{
            method: 'DELETE',
            path: '/fund-raises/:id',
            handler: 'fund-raise.delete',
            config: {
                policies: ['validate-user-delete']
            }
        }
    ]
}