import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router"; // Import the useRouter hook
import Image from "next/image";
import "../app/globals.css";

const BubbleSortPractice = () => {
  const router = useRouter(); // Initialize the router
  const [action, setAction] = useState(null);
  const [message, setMessage] = useState("Compare the first two elements.");
  const [feedbackImage, setFeedbackImage] = useState(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("Bubble Sort");
  const [nextButtonOpacity, setNextButtonOpacity] = useState(1);
  const [swapButtonOpacity, setSwapButtonOpacity] = useState(0.5);
  const [dontSwapButtonOpacity, setDontSwapButtonOpacity] = useState(0.5);
  const [nextClicked, setNextClicked] = useState(false);
  const [highlightedImages, setHighlightedImages] = useState([false, false]);
  const [currentIndex, setCurrentIndex] = useState(-1); // Track the current pair being compared
  const [numbers, setNumbers] = useState([5, 3, 4, 2, 1]);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isSorted, setIsSorted] = useState(false);
  const [images, setImages] = useState([ "/5.png", "/3.png", "/4.png", "/2.png", "/1.png" ]);

  const handleOptionClick = (algorithm) => {
    setSelectedAlgorithm(algorithm);
  };

  const getImageSrc = (algorithm) => {
    return selectedAlgorithm === algorithm
      ? `/${algorithm.replace(/ /g, " ")}_AF.png`
      : `/${algorithm.replace(/ /g, " ")}_BF.png`;
  };

  
  const handleNextClick = () => {
    setNextClicked(true);
    setNextButtonOpacity(0.5);
    setSwapButtonOpacity(1);
    setDontSwapButtonOpacity(1);
  
    // If we've reached the last comparison in the current pass
    if (currentIndex >= numbers.length - 2) {
      // Check if the list is sorted
      let isSorted = true;
      for (let i = 0; i < numbers.length - 1; i++) {
        if (numbers[i] > numbers[i + 1]) {
          isSorted = false;
          break;
        }
      }
  
      if (isSorted) {
        setMessage("Congratulations! The list is fully sorted.");
        setNextButtonOpacity(1); // Disable the Next button
        setDontSwapButtonOpacity(0.5);
        setSwapButtonOpacity(0.5);
        setIsSorted(true);
        router.push("/bubblesortChallenge");
        return;
      } else {
        setMessage("End of this round. Restarting the comparison.");
        setNextButtonOpacity(1);
        setDontSwapButtonOpacity(0.5);
        setSwapButtonOpacity(0.5);
        setCurrentIndex(-1); // Restart from the first two numbers
        setHighlightedImages([true, false]); // Highlight the first two numbers
        return;
      }
    }
  
    // Continue to the next pair
    setHighlightedImages([currentIndex + 1, currentIndex + 2]); // Highlight the next pair
    setMessage(
      `Compare ${numbers[currentIndex + 1]} and ${numbers[currentIndex + 2]}`
    );
    setCurrentIndex(currentIndex + 1);
  };
  
  const handleSwapDontSwapClick = (swap) => {
    const firstNumber = numbers[currentIndex];
    const secondNumber = numbers[currentIndex + 1];
  
    if (swap) {
      if (firstNumber > secondNumber) {
        setMessage(`Great, ${firstNumber} > ${secondNumber}. Swapping.`);
        setFeedbackImage("/yellow-star.webp");
  
        // Swap the numbers
        const newNumbers = [...numbers];
        newNumbers[currentIndex] = secondNumber;
        newNumbers[currentIndex + 1] = firstNumber;
        setNumbers(newNumbers);
  
        // Update images accordingly
        const newImages = [...images];
        newImages[currentIndex] = `/${secondNumber}.png`;
        newImages[currentIndex + 1] = `/${firstNumber}.png`;
        setImages(newImages);
      } else {
        setMessage("No swap needed; numbers are already in order.");
        setFeedbackImage("/yellow-star.webp");
      }
    } else {
      if (firstNumber <= secondNumber) {
        setMessage("Correct! No swap needed.");
        setFeedbackImage("/yellow-star.webp");
      } else {
        setMessage("Oops, a swap was needed. Try again.");
        setFeedbackImage("/red-cross.webp");
      }
    }
  
    // Reset button opacity
    setNextButtonOpacity(1);
    setSwapButtonOpacity(0.5);
    setDontSwapButtonOpacity(0.5);
  };
  

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/algorithms-bg.png')" }}
    >
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed top-10 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative">
            <Image
              src="/popup_bubble.png"
              alt="Bubble Sort Modal"
              width={1200}
              height={1200}
              className="cursor-pointer"
              onClick={closeModal}
            />
          </div>
        </div>
      )}

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

      {/* Main Flex Container */}
      <div className="flex space-x-4 w-full max-w-5xl mx-auto">
        {/* Left Box: Numbers and Actions */}
        <div className="bg-green-700 border-dashed border-[#66FF00] border-4 rounded-xl p-6 flex flex-col justify-between items-center w-1/2 text-white shadow-lg">
          <div className="flex space-x-6 my-5">
            {images.map((imgSrc, idx) => (
              <Image
                key={idx}
                src={imgSrc}
                width={64}
                height={64}
                alt={`number-${numbers[idx]}`}
                className={`rounded-full ${
                  isSorted 
                    ? "border-green-500 border-4 border-solid" 
                    : nextClicked && highlightedImages.includes(idx)
                    ? "border-yellow-500 border-4 border-solid"
                    : ""
                }`}                
              />
            ))}
          </div>

          <div className="flex space-x-10 mt-6">
            <Image
              src="/swap.png"
              alt="Swap"
              width={200}
              height={200}
              className="cursor-pointer"
              style={{ opacity: swapButtonOpacity }}
              onClick={() => handleSwapDontSwapClick(true)}
            />
            <Image
              src="/dont swap.png"
              alt="Don't Swap"
              width={200}
              height={200}
              className="cursor-pointer"
              style={{ opacity: dontSwapButtonOpacity }}
              onClick={() => handleSwapDontSwapClick(false)}
            />
          </div>
        </div>

        {/* Right Box: Text, Next Button, and Feedback Image */}
        <div className="bg-green-700 border-dashed border-[#66FF00] border-4 rounded-xl p-6 flex flex-col justify-center items-center w-1/3 text-white shadow-lg">
          <p className="text-xl font-semibold text-center mb-6">{message}</p>

          {feedbackImage && (
            <div className="mb-4">
              <Image src={feedbackImage} width={75} height={75} alt="Feedback" />
            </div>
          )}

          <Image
            src="/next.png"
            width={150}
            height={150}
            alt="Next"
            className="cursor-pointer"
            style={{ opacity: nextButtonOpacity }}
            onClick={handleNextClick}
          />
        </div>
      </div>
    </div>
  );
};

export default BubbleSortPractice;
