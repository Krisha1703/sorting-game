"use client";

import React from "react";
import Link from "next/link";
import "../app/globals.css";

const BubbleSortTutorial = () => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/algorithms-bg.png')" }}
    >

       {/* Sorting Options */}
       <div className="flex space-x-4 text-xl font-semibold py-10 mx-10">
          <button
            className={`rounded-full p-2 px-4 bg-green-600 text-white`}
          >
            Bubble Sort
          </button>
          <button
            className={`rounded-full p-2 px-4 bg-gray-500 text-white`}
          >
            Insertion Sort
          </button>
          <button
            className={`rounded-full p-2 px-4 bg-gray-500 text-white`}
          >
            Selection Sort
          </button>
        </div>

    <div className="flex justify-center">
      {/* Left Side - Tutorial Text */}
      <div className="flex flex-col items-center bg-green-800 text-white p-6 rounded-lg w-1/3 mx-4">
        
        <div className="flex justify-between w-full ">
          {/* Back Button */}
          <Link href="/algorithm">
            <button className="border-solid border-2 border-yellow-400 text-yellow-400 rounded-full p-2 px-3 text-2xl font-bold mb-4">
              &#x2190;
            </button>
          </Link>

          {/* Next Button */}
          <Link href="/bubblesortPractise">
            <button className="border-solid border-2 border-yellow-400 text-yellow-400 rounded-full p-2 px-3 text-2xl font-bold mb-4">
              &#x2192;
            </button>
          </Link>
        </div>

        {/* Tutorial Description */}
        <p className="text-center font-semibold text-lg leading-relaxed">
          Work through comparing pairs of adjacent numbers in a list and switch
          positions if the first number is greater than the last number. This
          process is repeated several times until all items are completely
          sorted.
        </p>
      </div>

      {/* Right Side - Visualization */}
      <div className="flex flex-col items-center bg-green-800 text-white p-6 rounded-lg w-1/3 mx-4">
        {/* Placeholder for Graphical Content */}
        <div className="w-full h-48 bg-black flex items-center justify-center rounded-md relative">
        {/* Video Element */}
        <video
          className="absolute inset-0 w-full h-full object-cover rounded-md"
          src="/tutorial-video.mp4"
          type="video/mp4"
          controls
          autoPlay
        />
      </div>


        {/* Next Button */}
        <Link href="/bubblesortPractise">
          <button className="mt-4 bg-yellow-400 text-green-900 px-6 py-2 rounded-lg text-xl font-bold">
            next
          </button>
        </Link>
      </div>
      </div>
    </div>
  );
};

export default BubbleSortTutorial;
