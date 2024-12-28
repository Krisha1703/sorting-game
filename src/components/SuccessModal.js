import React from "react";
import Image from "next/image";
import formatTime from "./FormatTimer";

const SuccessModal = ({ retryGame, goToHome, nextLevel, lives, elapsedTime, score }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="w-full h-full flex flex-col items-center justify-center p-12 bg-cover bg-no-repeat rounded-md"
        style={{
          backgroundImage: "url('/level-complete.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Display stars based on lives and elapsedTime */}
        {lives === 1 || elapsedTime > 45 ? (
          <Image src="/star.png" width={250} height={100} alt="1 star" />
        ) : lives === 2 || (elapsedTime > 30 && elapsedTime <= 45) ? (
          <div className="flex justify-between">
            <Image src="/star.png" width={250} height={100} alt="2 stars" />
            <Image src="/star.png" width={250} height={100} alt="2 stars" />
          </div>
        ) : lives === 3 && elapsedTime < 30 ? (
          <div className="flex justify-between">
            <Image src="/star.png" width={250} height={100} alt="3 stars" />
            <Image src="/star.png" width={250} height={100} alt="3 stars" />
            <Image src="/star.png" width={250} height={100} alt="3 stars" />
          </div>
        ) : null}

        <h1 className="text-6xl mt-4 text-gray-900 font-bold">
          TIME: <span className="text-red-700 font-semibold mx-1">{formatTime(elapsedTime)}</span>
        </h1>

        <h1 className="text-4xl mt-4 text-gray-900 font-bold">
          Score: <span className="text-yellow-400 font-semibold mx-1">{score}</span>
        </h1>

        <div className="flex mt-6">
          <Image
            src="/again.png"
            width={200}
            height={200}
            alt="retry"
            className="cursor-pointer"
            onClick={retryGame}
          />
          <Image
            src="/home.png"
            width={200}
            height={200}
            alt="home"
            className="cursor-pointer"
            onClick={goToHome}
          />
          <Image
            src="/next.png"
            width={150}
            height={150}
            alt="Next"
            className="cursor-pointer"
            onClick={nextLevel}
          />
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
