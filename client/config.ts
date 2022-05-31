export const server_url = process.env['NODE_ENV'] === "production" ? "http://api-compassion.toptechonly.com" : "http://192.168.42.156:1337";
// "http://compassion-api.toptechonly.com"
export const jwt_aut_token = 'jwt-auth-token';
export const fundraiser_ref = 'api::fund-raise.fund-raise';
export const charity_ref = 'api::charity.charity';

export const fundraiser_tags = [
    "medical",
    "memorial",
    "emergency",
    "education",
    "animals",
    "environment",
    "business",
    "community",
    "competition",
    "creative",
    "event",
    "faith",
    "family",
    "funeral",
    "sports",
    "travel",
    "volunteer",
    "wishes",
    "other",
]