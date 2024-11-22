"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "../app/globals.css";

const BubbleSortPractice = () => {
  // State to manage action selection, sorting, and messages
  const [action, setAction] = useState(null);
  const [step, setStep] = useState(0); // Tracks current step of the sorting process
  const [numbers, setNumbers] = useState([5, 3, 4, 2, 1]); // Numbers to sort
  const [sorted, setSorted] = useState(false); // Flag to check if the numbers are sorted
  const [message, setMessage] = useState("Compare the first two elements."); // Message for user feedback
  const [feedbackImage, setFeedbackImage] = useState(null); // State for feedback image

  // Handle button clicks for actions (Swap / Don't Swap)
  const handleActionClick = (selectedAction) => {
    setAction(selectedAction);
  };

  // Handle the 'Next' button click to move to the next comparison
  const handleNextClick = () => {
    const newNumbers = [...numbers];
    const currentStep = step;

    if (currentStep < numbers.length - 1) {
      // Compare the current pair
      if (newNumbers[currentStep] > newNumbers[currentStep + 1]) {
        // If the first number is greater, they should swap
        if (action === "Swap") {
          newNumbers[currentStep] = numbers[currentStep + 1];
          newNumbers[currentStep + 1] = numbers[currentStep];
          setNumbers(newNumbers);
          setMessage(`Correct! Swapped ${numbers[currentStep]} and ${numbers[currentStep + 1]}.`);
          setFeedbackImage("/yellow-star.webp"); // Show yellow star for correct swap
        } else {
          setMessage(`Oops! ${numbers[currentStep]} is greater than ${numbers[currentStep + 1]}, so we swap.`);
          setFeedbackImage("/red-cross.webp"); // Show red cross for incorrect action
        }
      } else {
        // No swap needed
        if (action === "Don't Swap") {
          setMessage(`Correct! No swap needed between ${numbers[currentStep]} and ${numbers[currentStep + 1]}.`);
          setFeedbackImage("/yellow-star.webp"); // Show yellow star for correct action
        } else {
          setMessage(`Oops! No need to swap ${numbers[currentStep]} and ${numbers[currentStep + 1]}.`);
          setFeedbackImage("/red-cross.webp"); // Show red cross for incorrect action
        }
      }

      // Move to the next pair of elements
      setStep(step + 1);
    } else {
      // Once the first pass is done, we reset and check the array
      setStep(0);
      setSorted(isSorted(newNumbers));

      if (isSorted(newNumbers)) {
        setMessage("Great! All elements are in their correct position. Ready for more practice?");
      } else {
        setMessage("Resetting and checking again...");
        setNumbers(newNumbers); // Recheck the numbers
      }
    }
  };

  // Function to check if the numbers are sorted
  const isSorted = (nums) => {
    return nums.every((num, idx) => idx === 0 || num >= nums[idx - 1]);
  };

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
      <div className="flex space-x-4 w-full max-w-5xl mx-auto">
        {/* Left Box: Numbers and Actions */}
        <div className="bg-green-700 rounded-xl p-6 flex flex-col justify-between items-center w-1/2 text-white shadow-lg">
          {/* Back Button */}
          <div className="self-start">
            <Link href="/bubbleSortTutorial">
              <button className="border-solid border-2 border-yellow-400 text-yellow-400 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shadow-md hover:bg-yellow-400">
                &#x2190;
              </button>
            </Link>
          </div>

          {/* Row of Elements */}
          <div className="flex space-x-6 my-10">
            {numbers.map((num, index) => {
              const isHighlighted = step === index || step === index + 1; // Highlight the two numbers being compared
              const isSortedItem = sorted && num === numbers[index]; // Check if the element is in its sorted position
              return (
                <div
                  key={index}
                  className={`w-16 h-16 bg-white text-green-900 rounded-full flex items-center justify-center text-xl font-bold border-4 ${
                    isHighlighted
                      ? "border-yellow-500 shadow-xl"
                      : isSortedItem
                      ? "border-green-500 shadow-xl"
                      : "border-green-800 shadow-lg"
                  }`}
                >
                  {num}
                </div>
              );
            })}
          </div>

          {/* Swap and Don't Swap Buttons */}
          <div className="flex space-x-10 mt-6">
            <button
              className={`w-36 h-14 rounded-full text-white text-lg font-bold shadow-md transition ${
                action === "Swap"
                  ? "bg-blue-700"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              onClick={() => handleActionClick("Swap")}
            >
              SWAP
            </button>
            <button
              className={`w-36 h-14 rounded-full text-white text-lg font-bold shadow-md transition ${
                action === "Don't Swap"
                  ? "bg-red-700" // Red background for "Don't Swap"
                  : "bg-red-600 hover:bg-red-700"
              }`}
              onClick={() => handleActionClick("Don't Swap")}
            >
              DON&apos;T SWAP
            </button>
          </div>
        </div>

        {/* Right Box: Text, Next Button, and Feedback Image */}
        <div className="bg-green-700 rounded-xl p-6 flex flex-col justify-center items-center w-1/3 text-white shadow-lg">
          {/* Dynamic Instruction */}
          <p className="text-xl font-semibold text-center mb-6">{message}</p>

          {/* Feedback Image (Yellow Star or Red Cross) */}
          {feedbackImage && (
            <div className="mb-4">
              <Image src={feedbackImage} width={75} height={75} alt="Feedback" />
            </div>
          )}

          {/* Next Button */}
          <button
            className="bg-yellow-300 rounded-full px-6 py-3 text-xl font-bold text-green-900 shadow-md hover:bg-yellow-400"
            onClick={handleNextClick}
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
};

export default BubbleSortPractice;
