module.exports = {
    routes: [
        {
            method: 'PUT',
            path: '/fund-raises/:id',
            handler: 'fund-raise.update',
            config: {
                policies: ['validate-update']
            }
        },{
            method: 'DELETE',
            path: '/fund-raises/:id',
            handler: 'fund-raise.delete',
            config: {
                policies: ['validate-user-delete']
            }
        },
        {
            method:'GET',
            path: '/fund-raises/remove-image/:id',
            handler:'custom.removeImage'
        }
    ]
}