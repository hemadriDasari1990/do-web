const getRandomBGColor = (index: number) => {
  let colorValues = [
    "linear-gradient(180deg,#ff9ec9 0,#fd71af 100%)",
    "linear-gradient(180deg,#7997ff 0,#57f 100%)",
    "linear-gradient(180deg,#5ddd93 .03%,#00b884 99.97%)",
    "linear-gradient(180deg,#ffdb58 0,#ffc800 100%)",
    "linear-gradient(180deg,#ff9696 .03%,#fd7171 99.97%)",
    "linear-gradient(180deg,#4dc 0,#2cc8b8 100%)",
  ];
  return index <= colorValues?.length ? colorValues[index] : colorValues[0];
};

export const getRandomColor = (index: number) => {
  let colorValues = [
    "#57f",
    "#fd71af",
    "#49ccf9",
    "#ffc800",
    "#00b884",
    "#fd7171",
    "#7b68ee",
  ];
  return index <= colorValues?.length ? colorValues[index] : colorValues[0];
};

export default getRandomBGColor;
