import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Import the useRouter hook
import PractiseModal from "@/components/PractiseModal";
import SortingAlgorithmSelector from "@/components/SortingAlgorithmSelector";
import NumbersSection from "@/components/BubbleSort/NumbersSection";
import ActionsSection from "@/components/BubbleSort/ActionsSection";
import FeedbackSection from "@/components/BubbleSort/FeedbackSection";
import "../../../app/globals.css";

const BubbleSortPractice = () => {
  const router = useRouter(); // Initialize the router
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
  const [isSorted, setIsSorted] = useState(false);
  const [images, setImages] = useState([ "/old numbers/5.png", "/old numbers/3.png", "/old numbers/4.png", "/old numbers/2.png", "/old numbers/1.png" ]);

  // Effect to dynamically navigate based on the selected algorithm
  useEffect(() => {
    if (selectedAlgorithm === "Bubble Sort") {
      router.push("/BubbleSort/Practise/BubbleSortPractise");
    } else if (selectedAlgorithm === "Insertion Sort") {
      router.push("/InsertionSortPractise");
    } else if (selectedAlgorithm === "Selection Sort") {
      router.push("/SelectionSortPractise");
    }
  }, [selectedAlgorithm, router]);

  const handleNextClick = () => {
    setNextClicked(true);
    setNextButtonOpacity(0.5);
    setSwapButtonOpacity(1);
    setDontSwapButtonOpacity(1);
  
    // If we've reached the last comparison in the current pass
    if (currentIndex >= numbers.length - 2) {
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
        router.push("/BubbleSort/Practise/BubbleSortChallenge");
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
        newImages[currentIndex] = `/old numbers/${secondNumber}.png`;
        newImages[currentIndex + 1] = `/old numbers/${firstNumber}.png`;
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

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/algorithms-bg.png')" }}
    >
      <PractiseModal selectedAlgorithm={selectedAlgorithm} />
      <SortingAlgorithmSelector
          selectedAlgorithm={selectedAlgorithm}
          onAlgorithmSelect={setSelectedAlgorithm}
          isOtherAlgorithmSelected={true} // Default algorithm (Bubble Sort)
        />

      <div className="flex space-x-4 w-full max-w-5xl mx-auto">
        <div className="bg-green-700 border-dashed border-[#66FF00] border-4 rounded-xl p-6 flex flex-col justify-between items-center w-1/2 text-white shadow-lg">
          <NumbersSection
            numbers={numbers}
            images={images}
            highlightedImages={highlightedImages}
            isSorted={isSorted}
            nextClicked={nextClicked}
          />
          <ActionsSection
            swapButtonOpacity={swapButtonOpacity}
            dontSwapButtonOpacity={dontSwapButtonOpacity}
            handleSwapDontSwapClick={handleSwapDontSwapClick}
          />
        </div>
        <FeedbackSection
          message={message}
          feedbackImage={feedbackImage}
          nextButtonOpacity={nextButtonOpacity}
          handleNextClick={handleNextClick}
        />
      </div>
    </div>
  );
};

export default BubbleSortPractice;
