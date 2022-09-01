const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::fund-raise.fund-raise', ({ strapi }) => ({
    async test(ctx) {
        try {
            let charity = await strapi.query("plugin::users-permissions.user").create(
                {
                    data: {
                        username:"charan",
                        email:'some_thing@gmail.com',
                        password:"1234567895$5555"
                    }
                }
            );
        } catch (err) {
            console.log(err);
            ctx.body = err
        }
    },
}));
