// In FailureModal.js
import React from "react";
import Image from "next/image";

const FailureModal = ({ resetGame }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="w-full h-full flex flex-col items-center justify-center p-12 bg-cover bg-no-repeat rounded-md"
        style={{
          backgroundImage: "url('/level-complete.svg')", // Change to failed image background
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Display 'Level Failed!' */}
        <h1 className="text-6xl mt-4 text-gray-900 font-bold">LEVEL FAILED!</h1>
    
        <h3 className="text-yellow-400 text-2xl font-semibold ml-20 my-4">
          Oops! Please try again or go back to practise game.
        </h3>
    
        {/* Retry and Home buttons */}
        <div className="flex mt-6">
          <Image
            src="/again.png"
            width={200}
            height={200}
            alt="retry"
            className="cursor-pointer"
            onClick={resetGame}  // Call the resetGame function passed as a prop
          />
          <Image
            src="/home.png"
            width={200}
            height={200}
            alt="home"
            className="cursor-pointer"
            onClick={() => {
              router.push("/"); // Navigate to home
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FailureModal;
