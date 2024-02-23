

async function createDiscount (req, res){
    try{

    }catch(err){
        console.log(err.message);
        logger.error(err);
        return res.status(500).json({success:false, message:"something error"})
    }
}
export default createDiscount