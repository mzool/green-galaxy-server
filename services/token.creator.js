import jwt from "jsonwebtoken"

/// this function take any number of obtions inside one object and create a token of that options

function generateToken(options = {}, expiresIn, secret = process.env.tokenSecret) {
    const token = jwt.sign(options, secret, { expiresIn: expiresIn });
    return token

}

export default generateToken
