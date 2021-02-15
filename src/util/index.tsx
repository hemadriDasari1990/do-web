export const replaceStr = (
    originalStr: string, 
    matchStr: string, 
    replacebleStr: string
) => {
    if(
        originalStr && 
        typeof matchStr !== "undefined" && 
        typeof replacebleStr !== "undefined"
    ) {
        return originalStr.replace(matchStr, replacebleStr);
    }
    return originalStr;
}

export const parseJwt = (token: string) => {
    if(!token){
        return;
    }
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map((c: string) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};