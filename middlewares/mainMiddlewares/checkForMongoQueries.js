// Middleware to intercept and handle MongoDB queries
const mongoQueryInterceptor = (req, res, next) => {
    // Check if any of the request data contains MongoDB queries
    const hasMongoQuery = checkForMongoQuery(req.body) || checkForMongoQuery(req.params)
        || checkForMongoQuery(req.query);
    if (hasMongoQuery) {
        return res.status(401).json({ success: false, message: "Invalid input" })

    } else
        next();
};

// Function to check if an object contains MongoDB queries
const checkForMongoQuery = (data) => {
    if (typeof data === 'object' && data !== null) {
        for (const key in data) {
            if (typeof data[key] === 'object' && data[key] !== null) {
                // Check for MongoDB query operators
                if (Object.keys(data[key]).some(operator => operator.startsWith('$'))) {
                    console.log("invalid inputs: ", data);
                    return true;
                }
            }
        }
    }
    return false;
};
export default mongoQueryInterceptor;
