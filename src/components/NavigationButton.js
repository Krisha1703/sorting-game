"use client";

import React from "react";
import Image from "next/image";

const NavigationButton = ({ src, alt, width, height, onClick, customClass }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`cursor-pointer ${customClass}`}
      onClick={onClick}
    />
  );
};

export default NavigationButton;
