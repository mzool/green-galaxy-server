function getCookie(cookie, target, searchForaText) {
    let value = null;

    if (searchForaText) {
        cookie.split(";").map((ck) => {
            if (ck.split("=")[0].trim().includes(target)) {
                value = ck.split("=")[1].trim();
            }
        });
    } else {
        cookie.split(";").map((ck) => {
            if (ck.split("=")[0].trim() === target) {
                value = ck.split("=")[1].trim();
            }
        });
    }
    if (!value || value == undefined) { return null }
    else return value;
}

export default getCookie;
