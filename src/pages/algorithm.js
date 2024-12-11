"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "../app/globals.css";
import Image from "next/image";

const Algorithm = () => {
  // State to track the selected algorithm
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("Bubble Sort");

  // Router instance to handle navigation
  const router = useRouter();

  // Handle click on an image option
  const handleOptionClick = (algorithm) => {
    setSelectedAlgorithm(algorithm); // Update selected algorithm
  };

  // Handle "Next" button click
  const handleNextClick = () => {
    switch (selectedAlgorithm) {
      case "Bubble Sort":
        router.push("/bubblesortTutorial");
        break;
      case "Insertion Sort":
        router.push("/insertionsortTutorial");
        break;
      case "Selection Sort":
        router.push("/selectionsortTutorial");
        break;
      default:
        break;
    }
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/algorithms-bg.png')" }}
    >
      {/* Main Content */}
      <div className="relative z-10 flex flex-col text-white">
        {/* Sorting Options as Images */}
        <div className="flex space-x-4 justify-start my-2">
          {/* Bubble Sort Image */}
          <div
            onClick={() => handleOptionClick("Bubble Sort")}
            className="cursor-pointer"
          >
            <Image
              src={
                selectedAlgorithm === "Bubble Sort"
                  ? "/Bubble Sort_AF.png"
                  : "/Bubble Sort_BF.png"
              }
              width={250}
              height={250}
              alt="Bubble Sort"
            />
          </div>

          {/* Insertion Sort Image */}
          <div
            onClick={() => handleOptionClick("Insertion Sort")}
            className="cursor-pointer"
          >
            <Image
              src={
                selectedAlgorithm === "Insertion Sort"
                  ? "/Insertion Sort_AF.png"
                  : "/Insertion Sort_BF.png"
              }
              width={250}
              height={250}
              alt="Insertion Sort"
            />
          </div>

          {/* Selection Sort Image */}
          <div
            onClick={() => handleOptionClick("Selection Sort")}
            className="cursor-pointer"
          >
            <Image
              src={
                selectedAlgorithm === "Selection Sort"
                  ? "/Selection Sort_AF.png"
                  : "/Selection Sort_BF.png"
              }
              width={250}
              height={250}
              alt="Selection Sort"
            />
          </div>
        </div>

        {/* Green box displaying selected algorithm and Next button */}
        {selectedAlgorithm && (
          <div className="bg-green-600 border-dashed border-[#66FF00] border-4 rounded-xl p-6 w-3/4 mx-auto text-white text-xl font-semibold my-2 flex flex-col items-center">
            {/* Display Selected Algorithm in Uppercase */}
            <div className="text-6xl text-center text-yellow-400">
              <h1>LEARN</h1>
              <h1 className="uppercase my-4">{selectedAlgorithm}</h1>
            </div>

            {/* Next Button */}
            <button onClick={handleNextClick}>
              <Image
                src="/next button.png"
                width={150}
                height={150}
                alt="next button"
                className="rounded-full my-5"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Algorithm;
