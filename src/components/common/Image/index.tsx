import React, { useState, useRef } from "react";
import { useIntersection } from "./intersectionObserver";
import useStyles from "./styles";

const LazyImage = (props: any) => {
  const { src, width, height } = props;
  const assetUrl = process.env.REACT_APP_STATIC_ASSETS_URL as string;
  const srcURL = assetUrl + src;
  // const placeholder = assetUrl + placeholderImg;

  const { loader } = useStyles();

  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef: any = useRef();

  useIntersection(imgRef, () => {
    setIsInView(true);
  });

  const handleOnLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div ref={imgRef}>
      {isInView && (
        <>
          <img
            className={`${!!isLoaded ? loader : ""} ${props?.className}`}
            src={srcURL}
            onLoad={handleOnLoad}
            width={width}
            height={height}
            style={props?.style}
          />
        </>
      )}
    </div>
  );
};

export default LazyImage;
