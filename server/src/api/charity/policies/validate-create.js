module.exports = async (policyContext, config, { strapi }) => {
    const user = (policyContext.state.user);
    if(!user.approved){return false;}
    // const fundraiser_id = policyContext.
    return false;
    
}