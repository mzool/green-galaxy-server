
const validateRequest = (schema) => {
    return (req, res, next) => {
        try {
            // Early return if a special header is present
            // if (req.headers._md === 'f-1') {
            //     return next();
            // }
            const methodsToValidate = ["body", "params", "headers", "query"];
            const errorArray = [];

            methodsToValidate.forEach((method) => {
                if (schema[method]) {
                    const validation_result = schema[method].validate(req[method], {
                        abortEarly: false,
                    });
                    if (validation_result.error) {
                        errorArray.push(validation_result.error.details[0].message);
                    }
                }
            });

            if (errorArray.length > 0) {
                return res.status(400).json({
                    message: "Validation error",
                    errors: errorArray,
                });
            }

            next();
        } catch (err) {
            // Pass errors to the next middleware or error handler
            next(err);
        }
    };
};

export default validateRequest;
