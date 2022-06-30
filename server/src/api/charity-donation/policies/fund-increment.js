module.exports = async (policyContext, config, { strapi }) => {
    // const user = (policyContext.state.user);
    const body = policyContext.request.body.data;
    const charity_id = body.charity;
    let amount = body.amount;
    console.log(body.item);
    if (amount <= 0) {
        return false;
    }
    let charity = await strapi.db.query("api::charity.charity").findOne({
        where: {
            id: {
                $eq: charity_id
            }
        },
    })
    if (!charity) { return false; };
    if(!charity.approved){return false}
    let direct_funds = charity.direct_funds;
    let direct_funds_count = parseInt(charity.direct_funds_count);
    await strapi.db.query("api::charity.charity").update({
        where: {
            id: {
                $eq: charity_id
            }
        },
        data: {
            direct_funds: direct_funds + amount,
            direct_funds_count: direct_funds_count + 1
        }
    });
    return true
}