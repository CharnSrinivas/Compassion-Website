export function stringToSlug(str: string): string {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes
    return str;
};
export function isMobile() {
    let userAgent = navigator.userAgent;
    let mobiles = ['Android', 'BlackBerry', 'iPhone', "iPad", "iPod", "Opera Mini", "IEMobile"]
    for (let i = 0; i < mobiles.length; i++) {
        if (userAgent.match(mobiles[i])) {
            return true;
        }
    }
    return false;

};