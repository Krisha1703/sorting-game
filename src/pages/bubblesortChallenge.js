"use client";

import React from "react";
import { useRouter } from "next/navigation";
import "../app/globals.css";
import Link from "next/link";

const BubbleSortChallenge = () => {

    const router = useRouter();

  const handleStartClick = () => {
    router.push("/bubblesortLevels");
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center overflow-hidden"
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

        <div className="bg-green-700 rounded-xl p-6 mx-auto flex flex-col justify-between items-center w-3/4 text-white shadow-lg">
          {/* Back Button */}
          <div className="self-start">
            <Link href="/bubbleSortTutorial">
              <button className="border-solid border-2 border-yellow-400 text-yellow-400 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shadow-md hover:bg-yellow-400 hover:text-green-700">
                &#x2190;
              </button>
            </Link>
          </div>

        <div className="text-6xl text-center text-yellow-400 leading-[12vh]">
            <h1>FINAL BUBBLE SORT CHALLENGE</h1> 
        </div>
        <button
          onClick={handleStartClick}
          className="bg-green-600 rounded-md p-4 text-white w-1/5 my-5 text-xl shadow-lg hover:bg-green-700"
        >
          START
        </button>

        </div>
      </div>
  );
};

export default BubbleSortChallenge;
