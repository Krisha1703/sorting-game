"use client";

import React from "react";
import "../app/globals.css";
import Link from "next/link";
import Image from "next/image";

const BubbleSortChallenge = () => {
  
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

      {/* Main Flex Container */}
      <div className="">
        {/* Left Box: Numbers and Actions */}
        <div className="bg-green-700 rounded-xl p-6 flex flex-col mx-auto  w-3/4 text-white shadow-lg">
          
         <div className="flex ">
          {/* Back Button */}
          <div className="self-start">
            <Link href="/bubblesortChallenge">
              <button className="border-solid border-2 border-yellow-400 text-yellow-400 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shadow-md hover:bg-yellow-400 hover:text-green-700">
                &#x2190;
              </button>
            </Link>
          </div>

          <button
          className={`rounded-full mx-auto  p-2 px-4 text-xl font-bold w-1/4 bg-gray-500 text-white`}
        >
          Levels
        </button>
        </div>

        <div className="relative w-full h-[55vh]">
    {/* Circle 1 */}
    <Link href="/BubbleSortLevelOne">
        <div className="absolute top-[60%] left-[5%] bg-white z-10 cursor-pointer rounded-full border-8 w-[10vw] h-[10vw] flex items-center justify-center text-6xl border-green-400 border-solid text-green-700 font-bold">1</div>
    </Link>

    {/* Dotted Line Between 1 and 2 */}
    <div className="absolute top-[77%] left-[20%] w-[18%] h-0 border-dashed border-t-8 border-white transform rotate-[-30deg] origin-top-left"></div>
    <Image src="/yellow-star.webp" width={40} height={40} alt="star" className="absolute top-[60%] left-[5%] z-20  grayscale"/>
    <Image src="/yellow-star.webp" width={40} height={40} alt="star" className="absolute top-[55%] left-[10%] z-20 grayscale" />
    <Image src="/yellow-star.webp" width={40} height={40} alt="star" className="absolute top-[60%] left-[15%] z-20 grayscale"/>
    
    {/* Circle 2 */}
    <div className="absolute top-[10%] left-[30%] bg-white cursor-pointer rounded-full border-8 w-[10vw] h-[10vw] flex items-center justify-center text-6xl border-green-900 border-solid text-green-700 font-bold">2</div>
    
    {/* Dotted Line Between 2 and 3 */}
    <div className="absolute top-[35%] left-[45%] w-[16%] h-0 border-dashed border-t-8 border-white transform rotate-[30deg] origin-top-left"></div>
    <Image src="/yellow-star.webp" width={40} height={40} alt="star" className="absolute top-[10%] left-[30%] z-20  grayscale"/>
    <Image src="/yellow-star.webp" width={40} height={40} alt="star" className="absolute top-[5%] left-[35%] z-20 grayscale" />
    <Image src="/yellow-star.webp" width={40} height={40} alt="star" className="absolute top-[10%] left-[40%] z-20 grayscale"/>
    
    {/* Circle 3 */}
    <div className="absolute top-[60%] left-[55%] bg-white cursor-pointer rounded-full border-8 w-[10vw] h-[10vw] flex items-center justify-center text-6xl border-green-900 border-solid text-green-700 font-bold">3</div>
    
    {/* Dotted Line Between 3 and 4 */}
    <div className="absolute top-[77%] left-[70%] w-[18%] h-0 border-dashed border-t-8 border-white transform rotate-[-30deg] origin-top-left"></div>
    <Image src="/yellow-star.webp" width={40} height={40} alt="star" className="absolute top-[60%] left-[55%] z-20  grayscale"/>
    <Image src="/yellow-star.webp" width={40} height={40} alt="star" className="absolute top-[55%] left-[60%] z-20 grayscale" />
    <Image src="/yellow-star.webp" width={40} height={40} alt="star" className="absolute top-[60%] left-[65%] z-20 grayscale"/>

    {/* Circle 4 */}
    <div className="absolute top-[10%] left-[80%] bg-white cursor-pointer rounded-full border-8 w-[10vw] h-[10vw] flex items-center justify-center text-6xl border-green-900 border-solid text-green-700 font-bold">4</div>

    <Image src="/yellow-star.webp" width={40} height={40} alt="star" className="absolute top-[10%] left-[80%] z-20  grayscale"/>
    <Image src="/yellow-star.webp" width={40} height={40} alt="star" className="absolute top-[5%] left-[85%] z-20 grayscale" />
    <Image src="/yellow-star.webp" width={40} height={40} alt="star" className="absolute top-[10%] left-[90%] z-20 grayscale"/>

</div>

    <Image src="/home-icon.png" width={50} height={50} alt="home" className="absolute bg-white cursor-pointer rounded-full p-2 bottom-10 right-40"/>


        </div>
      </div>
    </div>
  );
};

export default BubbleSortChallenge;
