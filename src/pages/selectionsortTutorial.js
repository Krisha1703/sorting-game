"use client";

import React, { useState } from "react";
import Link from "next/link";
import "../app/globals.css";
import { useRouter } from "next/router"; 
import Image from "next/image";

const SelectionSortTutorial = () => {
  const router = useRouter();
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("Selection Sort"); // Default selection is Bubble Sort

  const handleOptionClick = (algorithm) => {
    setSelectedAlgorithm(algorithm); // Update selected algorithm
    const algo_page = algorithm.split(' ')[0].toLowerCase(); // Extract first word and convert to lowercase
    router.push(`${algo_page}sortTutorial`);
  };

  const getImageSrc = (algorithm) => {
    // Determine the image source based on selection
    return selectedAlgorithm === algorithm
      ? `/${algorithm.replace(/ /g, " ")}_AF.png` // Selected state (AF)
      : `/${algorithm.replace(/ /g, " ")}_BF.png`; // Default state (BF)
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/algorithms-bg.png')" }}
    >
      {/* Sorting Options */}
      <div className="flex space-x-4 text-xl font-semibold py-10 mx-10">
        <div
          className="cursor-pointer"
          onClick={() => handleOptionClick("Bubble Sort")}
        >
          <Image
            src={getImageSrc("Bubble Sort")}
            alt="Bubble Sort"
            width={250}
            height={250}
            className="rounded-full"
          />
        </div>

        <div
          className="cursor-pointer"
          onClick={() => handleOptionClick("Insertion Sort")}
        >
          <Image
            src={getImageSrc("Insertion Sort")}
            alt="Insertion Sort"
            width={250}
            height={250}
            className="rounded-full"
          />
        </div>

        <div
          className="cursor-pointer"
          onClick={() => handleOptionClick("Selection Sort")}
        >
          <Image
            src={getImageSrc("Selection Sort")}
            alt="Selection Sort"
            width={250}
            height={250}
            className="rounded-full"
          />
        </div>
      </div>

      <div className="flex justify-center">
        {/* Left Side - Tutorial Text */}
        <div className="flex flex-col items-center bg-green-700 border-dashed border-[#66FF00] border-4 text-white p-6 rounded-lg w-1/3 mx-4">
          <div className="flex justify-between w-full ">
            {/* Back Button */}
            <Link href="/algorithm">
              <button className="border-solid border-2 border-yellow-400 text-yellow-400 rounded-full p-2 px-3 text-2xl font-bold mb-4 hover:bg-yellow-400 hover:text-green-700">
                &#x2190;
              </button>
            </Link>

            {/* Next Button */}
            <Link href="/bubblesortPractise">
              <button className="border-solid border-2 border-yellow-400 text-yellow-400 rounded-full p-2 px-3 text-2xl font-bold mb-4 hover:bg-yellow-400 hover:text-green-700">
                &#x2192;
              </button>
            </Link>
          </div>

          {/* Tutorial Description */}
          <p className="text-center font-semibold text-lg leading-relaxed">
            Selection Sort is a step-by-step algorithm that sorts elements by repeatedly selecting 
            the smallest (or largest) item from the unsorted portion and swapping it with the first 
            unsorted item. Imagine sorting a deck of cards: you find the smallest card, place it in 
            its correct position, and repeat the process until the deck is fully sorted.
          </p>
        </div>

        {/* Right Side - Visualization */}
        <div className="flex flex-col items-center bg-green-700 border-dashed border-[#66FF00] border-4 text-white p-6 rounded-lg w-1/3 mx-4">
          {/* Placeholder for Graphical Content */}
          <div className="w-full h-48 bg-black flex items-center justify-center rounded-md relative">
            {/* Video Element */}
            <video
              className="absolute inset-0 w-full h-full object-cover rounded-md"
              src="/selectionsort-tutorial-video.mp4"
              type="video/mp4"
              controls
              autoPlay
            />
          </div>

          {/* Next Button */}
          <Link href="/selectionsortPractise">
            <Image src="/next.png" width={150} height={150} alt="next" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SelectionSortTutorial;
