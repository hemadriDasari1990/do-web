export const replaceStr = (
  originalStr: string,
  matchStr: string,
  replacebleStr: string
) => {
  if (
    originalStr &&
    typeof matchStr !== "undefined" &&
    typeof replacebleStr !== "undefined"
  ) {
    return originalStr.replace(matchStr, replacebleStr);
  }
  return originalStr;
};

export const parseJwt = (token: string) => {
  if (!token) {
    return;
  }
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c: string) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

export const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export function toTitleCase(str: string) {
  return str.replace(
    /\w\$*/g,
    (txt: string) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

const elipseName = (input: string, inputLength: number) => {
  if (!input) {
    return;
  }
  if (input.length > inputLength) {
    return input.substring(0, inputLength) + "...";
  }
  return input;
};
