const getRandomBGColor = (index: number) => {
  let colorValues = [
    "linear-gradient(50deg, #ea087b 0%, #ff5656 100%)",
    "linear-gradient(50deg, #0072ff 0%, #0089ffeb 100%)",
    "linear-gradient(50deg, #ffc800 0%, #ff0000ba 100%)",
    "linear-gradient(50deg, #2d7bf1 0%, #27fd00 100%)",
    "linear-gradient(50deg, rgb(255 224 0) 0%, rgb(255 0 59 / 94%) 100%)",
    "linear-gradient(90deg, #f8ff00 0%, #3ad59f 100%)",
  ];
  return index <= colorValues?.length ? colorValues[index] : colorValues[0];
};

export const getRandomColor = () => {
  let colorValues = [
    "#ff0100",
    "#172b4d",
    "#ffa600",
    "#00ff21",
    "#ff0080",
    "#ff0039",
  ];
  return colorValues[Math.floor(Math.random() * colorValues.length)];
};

export default getRandomBGColor;
