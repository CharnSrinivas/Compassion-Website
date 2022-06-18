module.exports = async (policyContext, config, { strapi }) => {
    const user = (policyContext.state.user);
    const body = policyContext.request.body.data;
    if(!user.approved){return false;}
    // const fundraiser_id = policyContext.
    return true;
}