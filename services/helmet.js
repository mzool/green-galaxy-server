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
    defaultSrc: ["'self'"], // Allow resources to be loaded from the same origin by default

    // Define trusted sources for scripts
    scriptSrc: [
        "'self'",
        "'unsafe-inline'", // Avoid if possible, this is for inline event handlers and scripts
        "'unsafe-eval'",   // Avoid if possible, this is for dynamic code execution like eval(), delete to turn off
        //'https://ajax.googleapis.com', // Example: Include trusted CDNs

    ],

    // Define trusted sources for styles (including fonts)
    styleSrc: [
        "'self'",
       // 'https://fonts.googleapis.com', // Example: Allow Google Fonts
     
    ],

    // Define trusted sources for images (including product images)
    imgSrc: [
        "'self'",
        'https://cdn.example.com', // Example: Allow a CDN for images
        // Add other trusted image sources here
    ],

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
    // Reports will be sent to this endpoint for monitoring
    // Replace 'https://report.example.com/csp-report' with your actual reporting endpoint
   // reportUri: 'https://report.example.com/csp-report',
};
// Use Helmet with Content Security Policy (CSP) configuration
// app.use(
//     helmet.contentSecurityPolicy({
        
//     })
// );

