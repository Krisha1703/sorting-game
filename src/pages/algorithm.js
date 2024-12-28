import React, { useState } from "react";
import { useRouter } from "next/router";
import "../app/globals.css";
import Image from "next/image";
import SortingAlgorithmSelector from "@/components/SortingAlgorithmSelector";

const Algorithm = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("Bubble Sort"); // Track selected algorithm
  const router = useRouter();

  // Handle "Next" button click
  const handleNextClick = () => {
    switch (selectedAlgorithm) {
      case "Bubble Sort":
        router.push(`/SortingTutorialPage?algorithm=${encodeURIComponent(selectedAlgorithm)}`);
        break;
      case "Insertion Sort":
        router.push(`/SortingTutorialPage?algorithm=${encodeURIComponent(selectedAlgorithm)}`);
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
        <SortingAlgorithmSelector
          selectedAlgorithm={selectedAlgorithm}
          onAlgorithmSelect={setSelectedAlgorithm}
          isOtherAlgorithmSelected={false} // Default algorithm (Bubble Sort)
        />

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
