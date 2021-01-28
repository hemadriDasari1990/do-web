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