export const server_url = process.env['NODE_ENV'] === "production" ? "http://compassion-api.toptechonly.com" : "http://localhost:1337";
export const jwt_aut_token = 'jwt-auth-token';
export const fundraiser_ref = 'api::fund-raise.fund-raise'
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
    "sports",
    "travel",
    "volunteer",
    "wishes",
    "other",
]