module.exports = async (policyContext, config, { strapi }) => {
    const user = (policyContext.state.user);
    let u = policyContext.request.url.split('/');
    let id = parseInt(u[u.length-1]);

    let fundraiser = await strapi.db.query("api::fund-raise.fund-raise").findOne({
        where: {
            id: {
                $eq: id
            }
        }, populate: ['user']
    })
    if (user.id === fundraiser.user.id) {
        return true;
    } else {
        return false;
    }
}