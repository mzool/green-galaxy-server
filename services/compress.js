
function shouldCompress(req, res) {
    if (req.headers['no-compression']) {
        return false
    }

    // fallback to standard filter function
    return compression.filter(req, res)
}
export default shouldCompress