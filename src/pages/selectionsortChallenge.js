"use client";

import React, {useState} from "react";
import { useRouter } from "next/navigation";
import "../app/globals.css";
import Link from "next/link";
import Image from "next/image";

const SelectionSortChallenge = () => {

    const router = useRouter();

  const handleStartClick = () => {
    router.push("/SelectionSortLevelOne");
  };

  const [selectedAlgorithm, setSelectedAlgorithm] = useState("Selection Sort"); // Default selection is Bubble Sort

  const handleOptionClick = (algorithm) => {
    setSelectedAlgorithm(algorithm); // Update selected algorithm
  };

  const getImageSrc = (algorithm) => {
    // Determine the image source based on selection
    return selectedAlgorithm === algorithm
      ? `/${algorithm.replace(/ /g, " ")}_AF.png` // Selected state (AF)
      : `/${algorithm.replace(/ /g, " ")}_BF.png`; // Default state (BF)
  };
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/selection-challenge.svg')" }}
    >
      {/* Sorting Options */}
      <div className="flex space-x-4 text-xl font-semibold py-0 -mt-6 mx-10">
        <div
          className="cursor-pointer"
          onClick={() => handleOptionClick("Bubble Sort")}
        >
          <Image
            src={getImageSrc("Bubble Sort")}
            alt="Bubble Sort"
            width={200}
            height={200}
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
            width={200}
            height={200}
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
            width={200}
            height={200}
            className="rounded-full"
          />
        </div>
      </div>

        
          {/* Back Button */}
          <div className="self-start mx-[10vw]">
            <Link href="/bubbleSortTutorial">
              <button className="border-solid border-2 border-yellow-400 text-yellow-400 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shadow-md hover:bg-yellow-400 hover:text-green-700">
                &#x2190;
              </button>
            </Link>

      <Image src="/start.png" width={250} height={250} alt="start" onClick={handleStartClick} className="cursor-pointer my-40 mx-auto"/>

       <Image
          src="/home.png"
          width={150}
          height={150}
          alt="home"
          className="cursor-pointer absolute top-20 right-20"
          onClick={() => {
            router.push("/")
          }}
        />
        

        </div>
      </div>
  );
};

export default SelectionSortChallenge;
