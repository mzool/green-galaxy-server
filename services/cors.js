// Define a whitelist of trusted domains (origins)
const whitelist = ['http://localhost:5173', 'https://green-galaxy.net'];

// Configure CORS middleware with security settings
export const corsOptions = {
    origin: function (origin, callback) {
        // Check if the origin is included in the whitelist or if it's a development environment
        if (!origin || whitelist.includes(origin)) {
            callback(null, true); // Allow requests from trusted domains or development environment
        } else {
            callback(new Error('Not allowed by CORS')); // Block requests from other domains
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed HTTP methods
    credentials: true, // Allow sending cookies and authentication headers
    optionsSuccessStatus: 204, // Respond with a 204 (No Content) status for preflight requests
};
