import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PractiseModal from "@/components/PractiseModal";
import SortingAlgorithmSelector from "@/components/SortingAlgorithmSelector";
import NumbersSection from "@/components/InsertionSort/NumbersSection";
import ActionSection from "@/components/InsertionSort/ActionSection";
import FeedbackSection from "@/components/InsertionSort/FeedbackSection";
import "../../../app/globals.css";

const InsertionSortPractice = () => {
  const router = useRouter();
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("Insertion Sort");
  const [numbers, setNumbers] = useState([
    { value: 5, image: "/old numbers/5.png" },
    { value: 3, image: "/old numbers/3.png" },
    { value: 4, image: "/old numbers/4.png" },
    { value: 2, image: "/old numbers/2.png" },
    { value: 1, image: "/old numbers/1.png" },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sortedIndexes, setSortedIndexes] = useState([]);
  const [message, setMessage] = useState("Start with the first number.");
  const [feedbackImage, setFeedbackImage] = useState(null);
  const [nextEnabled, setNextEnabled] = useState(true);
  const [fixEnabled, setFixEnabled] = useState(false);
  const [moveLeftEnabled, setMoveLeftEnabled] = useState(false);

  // Effect to dynamically navigate based on the selected algorithm
  useEffect(() => {
    if (selectedAlgorithm === "Bubble Sort") {
      router.push("/BubbleSort/Practise/BubbleSortPractise");
    } else if (selectedAlgorithm === "Insertion Sort") {
      router.push("/InsertionSort/Practise/InsertionSortPractise");
    } else if (selectedAlgorithm === "Selection Sort") {
      router.push("/SelectionSortPractise");
    }
  }, [selectedAlgorithm, router]);

  const handleNext = () => {
    if (sortedIndexes.includes(numbers.length - 1)) {
      setMessage("Congratulations! The numbers are sorted.");
      setFeedbackImage("/yellow-star.webp");
      router.push("/InsertionSort/Practise/InsertionSortChallenge");
    } else {
      setMessage("Move the current number to its correct position.");
      setNextEnabled(false);
      setFixEnabled(true);
      setMoveLeftEnabled(true);
      setFeedbackImage(null);
    }
  };

  const handleFix = () => {
    const currentNumber = numbers[currentIndex];
    const isCorrectPosition =
      currentIndex === 0 || numbers[currentIndex - 1].value <= currentNumber.value;

    if (isCorrectPosition) {
      setSortedIndexes([...sortedIndexes, currentIndex]);
      setMessage("Success! Move to the next number.");
      setFeedbackImage("/yellow-star.webp");
      setCurrentIndex((prev) => prev + 1);
      setNextEnabled(true);
      setFixEnabled(false);
      setMoveLeftEnabled(false);
    } else {
      setMessage("Oops! The current number is not in the correct position.");
      setFeedbackImage("/red-cross.webp");
    }
  };

  const handleMoveLeft = () => {
    if (currentIndex > 0) {
      const newNumbers = [...numbers];
      [newNumbers[currentIndex], newNumbers[currentIndex - 1]] = [
        newNumbers[currentIndex - 1],
        newNumbers[currentIndex],
      ];
      setNumbers(newNumbers);
      setCurrentIndex((prev) => prev - 1);
    } else {
      setMessage("Cannot move left any further.");
      setFeedbackImage("/red-cross.webp");
    }
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
        isOtherAlgorithmSelected={true}
      />
      <div className="flex space-x-4 w-full max-w-5xl mx-auto">
        <div className="bg-green-700 border-dashed border-[#66FF00] border-4 rounded-xl p-6 flex flex-col justify-between items-center w-1/2 text-white shadow-lg">
          <NumbersSection
            numbers={numbers}
            currentIndex={currentIndex}
            sortedIndexes={sortedIndexes}
          />
          <ActionSection
            fixEnabled={fixEnabled}
            moveLeftEnabled={moveLeftEnabled}
            onFix={handleFix}
            onMoveLeft={handleMoveLeft}
          />
        </div>
        <FeedbackSection
          message={message}
          feedbackImage={feedbackImage}
          nextEnabled={nextEnabled}
          onNext={handleNext}
        />
      </div>
    </div>
  );
};

export default InsertionSortPractice;
