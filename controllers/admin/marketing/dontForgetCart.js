
export default async function dontForgetCart(req, res){
    try{

    } catch(err){
        console.log(err.message);
        logger.error(err);
        return res.status(500).json({success: false, message: "Something went error, try again later"})
    }
}
