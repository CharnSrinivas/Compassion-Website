module.exports = async (policyContext, config, { strapi }) => {
    const user = (policyContext.state.user);
    const body = policyContext.request.body.data;
    if (body.approved) {
        return false;
    }
    if (!user.approved) {
        return false;
    }

    let charity = await strapi.db.query("api::charity.charity").findOne({
        where: {
            id:{
                $eq: body.id
            }
        }, populate: ['user']
    });
    if (user.id === charity.user.id) {
        return true
    } else {
        return false
    }
}