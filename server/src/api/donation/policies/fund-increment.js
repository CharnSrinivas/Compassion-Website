module.exports = async (policyContext, config, { strapi }) => {
    // const user = (policyContext.state.user);
    const body = policyContext.request.body.data;
    const fundraiser_id = body.fund_raise;
    console.log(fundraiser_id);
    // const fundraiser_id = policyContext.
    let fundraiser = await strapi.db.query("api::fund-raise.fund-raise").findOne({
        where: {
            id: {
                $eq: fundraiser_id
            }
        },
    })

    if (!fundraiser) { return false; };
    let fund_raised = fundraiser.fund_raised;
    let donations_count = parseInt(fundraiser.donations_count);
    let amount = body.amount;
    await strapi.db.query("api::fund-raise.fund-raise").update({
        where: {
            id: {
                $eq: fundraiser_id
            }
        },
        data: {
            fund_raised: fund_raised + amount,
            donations_count: donations_count + 1
        }
    })
    return true
}