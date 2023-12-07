
// Define a whitelist of trusted domains (origins)
const whitelist = ['http://localhost:5173', 'http://localhost:3000', `https://green-galaxy.net`];

// Configure CORS middleware with security settings
export const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true); // Allow requests from trusted domains
        } else {
            callback(new Error('Not allowed by CORS')); // Block requests from other domains
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed HTTP methods
    credentials: true, // Allow sending cookies and authentication headers
    optionsSuccessStatus: 204, // Respond with a 204 (No Content) status for preflight requests
};

