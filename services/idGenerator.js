// Generate user friendly id  
// id length is equal to lenOfId +1
// product ids start with pr_

function idGenerator(lenOfId, product = false, cart = false, blog = false) {
    try {
        /// id
        let id = String(Math.floor(Math.random() * 10));
        for (let i = 0; i < lenOfId; i++) {

            id = id + String(Math.floor(Math.random() * 10))
        }
        if (product === true) {
            return "pr_ " + id
        } else if (cart == true) {
            return "_cart_number_" + id
        } else if (blog == true) {
            return "blog_" + id
        } else { return id }

    } catch (err) {
        console.log(err.message);
        return err
    }

}


export default idGenerator