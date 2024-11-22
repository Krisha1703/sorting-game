"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "../app/globals.css";
import Image from "next/image";

const Algorithm = () => {
  // State to track the selected algorithm
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);

  // Router instance to handle navigation
  const router = useRouter();

  // Handle click on a sorting option button
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
        {/* Sorting Options */}
        <div className="flex space-x-4 text-xl font-semibold my-10 mx-10">
          <button
            className={`rounded-full p-2 px-4 ${
              selectedAlgorithm === "Bubble Sort"
                ? "bg-green-600 text-white"
                : "bg-gray-500"
            }`}
            onClick={() => handleOptionClick("Bubble Sort")}
          >
            Bubble Sort
          </button>
          <button
            className={`rounded-full p-2 px-4 ${
              selectedAlgorithm === "Insertion Sort"
                ? "bg-green-600 text-white"
                : "bg-gray-500"
            }`}
            onClick={() => handleOptionClick("Insertion Sort")}
          >
            Insertion Sort
          </button>
          <button
            className={`rounded-full p-2 px-4 ${
              selectedAlgorithm === "Selection Sort"
                ? "bg-green-600 text-white"
                : "bg-gray-500"
            }`}
            onClick={() => handleOptionClick("Selection Sort")}
          >
            Selection Sort
          </button>
        </div>

        {/* Green box displaying selected algorithm and Next button */}
        {selectedAlgorithm && (
          <div className="bg-green-600 rounded-xl p-6 w-3/4 mx-auto text-white text-xl font-semibold my-5 flex flex-col items-center">
            {/* Display Selected Algorithm in Uppercase */}
            <div className="text-6xl text-center text-yellow-400">
              <h1>LEARN</h1>
              <h1 className="uppercase my-4">{selectedAlgorithm}</h1> {/* Text transformed to uppercase */}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNextClick}
            >
              <Image src="/next button.png" width={150} height={150} alt="next button" className="rounded-full my-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Algorithm;
