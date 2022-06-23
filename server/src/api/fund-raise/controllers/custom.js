// path: ./src/api/restaurant/controllers/restaurant.js

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::fund-raise.fund-raise', ({ strapi }) => ({
    async removeImage(ctx) {
        console.log(ctx);
        // // some custom logic here
        // ctx.query = { ...ctx.query, local: 'en' }
        // // Calling the default core action
        // const { data, meta } = await super.find(ctx);
        // // some more custom logic
        // meta.date = Date.now()
        // return { data, meta };
        try {

        } catch (err) {
            ctx.body = err
        }
    },
}));
