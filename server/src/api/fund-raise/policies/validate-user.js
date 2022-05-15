module.exports = async (policyContext, config, { strapi }) => {
    const user = (policyContext.state.user);
    const body = policyContext.request.body.data;
    // const fundraiser_id = policyContext.
    let fundraiser = await strapi.db.query("api::fund-raise.fund-raise").findOne({
        where: {
            id: {
                $eq: body.id
            }
        }, populate: ['user']
    })
    if (user.id === fundraiser.user.id) {
        return true
    } else {
        return false
    }
}