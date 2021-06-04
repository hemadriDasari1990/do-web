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
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
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

export const elipseName = (input: string, inputLength: number) => {
  if (!input) {
    return;
  }
  if (input.length > inputLength) {
    return input.substring(0, inputLength) + "...";
  }
  return input;
};

export const getStickyColor = (index: number) => {
  let colorValues = [
    "#f5cd0b",
    "#0079bf",
    "deeppink",
    "#57f",
    "orange",
    "#ff13f8",
    "#00bf78",
    "#0b94f5",
    "#f5cd0b",
    "#0079bf",
    "deepping",
    "#57f",
    "orange",
    "#ff13f8",
    "#00bf78",
    "#0b94f5",
  ];
  if (index > colorValues?.length) {
    return colorValues[1];
  }
  return colorValues[index];
};

export function formatNumberWithCommas(num: number) {
  if (!num) {
    return 0;
  }
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export function getDownloadFile(res: any, fileName: string) {
  const file = new Blob([res.data], {
    type: "application/vnd.openxmlformats-officedocumment.spreadsheetml.sheet",
  });
  const fileUrl = URL.createObjectURL(file);
  let tempLink = document.createElement("a");
  tempLink.href = fileUrl;
  tempLink.setAttribute("download", fileName);
  tempLink.click();
}

export function getRemainingCharLength(maxCount: number, actualLength: number) {
  if (!maxCount || !actualLength) {
    return 0;
  }
  return maxCount === actualLength ? maxCount : maxCount - actualLength;
}

export const getActivityText = (action: string) => {
  let text = "";
  switch (action) {
    case "create":
      text = " created ";
      break;
    case "update":
      text = " updated ";
      break;
    case "delete":
      text = " deleted ";
      break;
    case "session-start":
      text = " started ";
      break;
    case "session-stop":
      text = " ended ";
      break;
    case "read":
      text = " Marked ";
      break;
    case "un-read":
      text = " Marked ";
      break;
    case "react":
      text = " added ";
      break;
    case "un-react":
      text = " removed ";
      break;
    case "move":
      text = " moved ";
      break;
    case "move":
      text = " moved ";
      break;
    case "private":
      text = " changed ";
      break;
    case "public":
      text = " changed ";
      break;
    case "view":
      text = " viewed ";
      break;
    default:
      break;
  }
  return text;
};

export const getInitials = (value: string) => {
  if (!value) {
    return "";
  }
  let names = value.split(" "),
    initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

export const getHumanReadableDate = (value: string) => {
  if (!value) {
    return "";
  }
  const output =
    new Date(value).toDateString() +
      " at " +
      new Date(value).toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }) || "--";
  return output;
};

export const delay = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));
