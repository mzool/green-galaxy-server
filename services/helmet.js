export const helmetOptions = {
    contentSecurityPolicy: false, // Disable Content Security Policy header
    frameguard: { action: 'deny' }, // Deny embedding the app in frames
    hidePoweredBy: true, // Change X-Powered-By header
    hsts: {
        maxAge: 31536000, // 1 year in seconds
        includeSubDomains: true, // Include subdomains
        preload: true, // Enable HSTS preloading
    }, // Enable HTTP Strict Transport Security
    referrerPolicy: { policy: 'same-origin' }, // Set Referrer-Policy header
    noSniff: true, // Set X-Content-Type-Options to 'nosniff'
}


export const directives = {
    defaultSrc: [
        "'self'",
    ], // Allow resources to be loaded from the same origin by default

    // Define trusted sources for scripts
    scriptSrc: [
        "'self'",
    ],

    // Define trusted sources for styles (including fonts)
    styleSrc: [
        "'self'",
        // 'https://fonts.googleapis.com', // Example: Allow Google Fonts

    ],

    // Define trusted sources for images (including product images)
    imgSrc: ["'self'",],

    // Define trusted sources for fonts
    fontSrc: [
        "'self'",
        //'https://fonts.gstatic.com', // Example: Google Fonts fonts.gstatic.com
        // Add other trusted font sources here
    ],

    // Restrict other resource types as needed, e.g., media, frames, and connect
    mediaSrc: ["'self'"],
    frameSrc: ["'self'"],
    connectSrc: ["'self'"],

    // Block inline event handlers and scripts
    // Note: This is a strict setting; you may need to fine-tune for your specific application
    // Referrer-Policy header can be set to control referrer information
    scriptSrcAttr: ["'none'"],
    objectSrc: ["'none'"],
    baseUri: ["'none'"],

    // Set up reporting URI for CSP violations
    reportUri: 'https://api.green-galaxy.net/api/csp-report',
};
