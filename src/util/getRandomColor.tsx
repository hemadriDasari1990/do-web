const bgColorValues = [
  "linear-gradient(180deg,#ff9ec9 0,#fd71af 100%)",
  "linear-gradient(180deg,#7997ff 0,#57f 100%)",
  "linear-gradient(180deg,#5ddd93 .03%,#00b884 99.97%)",
  "linear-gradient(180deg,#ffdb58 0,#ffc800 100%)",
  "linear-gradient(180deg,#ff9696 .03%,#fd7171 99.97%)",
  "linear-gradient(180deg,#4dc 0,#2cc8b8 100%)",
  "linear-gradient(180deg,#ff9ec9 0,#fd71af 100%)",
  "linear-gradient(180deg,#7997ff 0,#57f 100%)",
  "linear-gradient(180deg,#5ddd93 .03%,#00b884 99.97%)",
  "linear-gradient(180deg,#ffdb58 0,#ffc800 100%)",
];

const getRandomBGColor = (index: number) => {
  return index < bgColorValues?.length
    ? bgColorValues[index]
    : bgColorValues[0];
};

export const getRandomColor = (index: number) => {
  const colorValues = [
    "#57f",
    "#fd71af",
    "#49ccf9",
    "#ffc800",
    "#00b884",
    "#fd7171",
    "#7b68ee",
  ];
  return index < colorValues?.length ? colorValues[index] : colorValues[0];
};

export const getSectionColor = (index: number) => {
  const colorValues = [
    "#f5cd0b1c",
    "#0079bf1c",
    "#ffd2f3",
    "#fff1d2",
    "#ffd6d2",
    "#d2d8ff",
    "#7b68ee",
  ];
  return index < colorValues?.length ? colorValues[index] : colorValues[0];
};

export const getRandomAvatarColor = () => {
  return bgColorValues[Math.floor(Math.random() * 16)];
};

export default getRandomBGColor;
