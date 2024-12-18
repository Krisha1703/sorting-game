import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import "../app/globals.css";

const SelectionSortPractise = () => {
  const router = useRouter();

  const [selectedAlgorithm, setSelectedAlgorithm] = useState("Selection Sort");
  const [isModalOpen, setIsModalOpen] = useState(true);

  // Images of numbers
  const images = [
    "/old numbers/5.png",
    "/old numbers/3.png",
    "/old numbers/4.png",
    "/old numbers/2.png",
    "/old numbers/1.png",
  ];
    // Feedback image paths
const feedbackImages = {
  correct: "/yellow-star.webp",
  incorrect: "/red-cross.webp",
};

  const [numbers, setNumbers] = useState(images);
  const [currentIndex, setCurrentIndex] = useState(0); // Start from the first image
  const [sortedIndex, setSortedIndex] = useState(-1); // Index of the currently sorted image
  const [currentRoundStart, setCurrentRoundStart] = useState(0); // Tracks the start of the unsorted portion
  const [message, setMessage] = useState("Initialize the first unsorted number as the key.");
  const [feedbackImage, setFeedbackImage] = useState(""); // Feedback image (error or success)
  
  const [isNextEnabled, setIsNextEnabled] = useState(true);
  const [isSelectEnabled, setIsSelectEnabled] = useState(false);
  const [isSkipEnabled, setIsSkipEnabled] = useState(false);

  // State to track green-highlighted indices
const [greenIndices, setGreenIndices] = useState([]);


  const handleOptionClick = (algorithm) => {
    setSelectedAlgorithm(algorithm);
    const algo_page = algorithm.split(" ")[0].toLowerCase();
    router.push(`${algo_page}sortPractise`);
  };

  const getImageSrc = (algorithm) => {
    return selectedAlgorithm === algorithm
      ? `/${algorithm.replace(/ /g, " ")}_AF.png`
      : `/${algorithm.replace(/ /g, " ")}_BF.png`;
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const extractNumber = (imagePath) => {
    if (!imagePath || typeof imagePath !== "string") {
      console.error("Invalid image path:", imagePath);
      return ""; // Return an empty string for invalid input
    }
    const match = imagePath.match(/(\d+)\.png$/); // Match the number before ".png"
    return match ? match[1] : ""; // Return the matched number or an empty string
  };
  
  

  const handleNextClick = () => {
    if (message === "Congratulations! The images are sorted.") {
      // If the sorting is completed, navigate to the next page
      router.push("/selectionsortChallenge");
    } else {
    setIsNextEnabled(false);
    setIsSelectEnabled(true);
    setIsSkipEnabled(true);
  }
  };
  
  const handleSelectClick = () => {
    if (currentIndex === numbers.length) {
      console.log(`Round completed. Key selected: ${numbers[sortedIndex]}`);
  
      // Swap the smallest number (green border) with the first unsorted number (yellow border)
      const updatedNumbers = [...numbers];
      const temp = updatedNumbers[currentRoundStart];
      updatedNumbers[currentRoundStart] = updatedNumbers[sortedIndex];
      updatedNumbers[sortedIndex] = temp;
  
      setNumbers(updatedNumbers); // Update the images
      setGreenIndices((prev) => [...prev, currentRoundStart]); // Keep the swapped key green
  
      if (currentRoundStart === numbers.length - 1) {
      // All numbers are sorted
      setGreenIndices(Array.from({ length: numbers.length }, (_, i) => i)); // Set all to green
      setMessage("Congratulations! The images are sorted.");
      setIsNextEnabled(true);
      setIsSelectEnabled(false);
      setIsSkipEnabled(false);
    } 

    else{
      // Move to the next round
      setCurrentRoundStart((prev) => prev + 1);
      setCurrentIndex(currentRoundStart + 1);
      setSortedIndex(-1); // Reset sorted index (remove green border after the round ends)
  
      setMessage("Key selected and swapped. Moving to the next round.");
      setFeedbackImage(feedbackImages.correct);
    }
    } else {
      const selectedNumber = extractNumber(numbers[currentIndex]);
      const previousKey = extractNumber(numbers[sortedIndex]);
  
      // Case for selecting the first element (default key)
      if (currentIndex === currentRoundStart) {
        setSortedIndex(currentIndex); // Set the first number as the initial key (green border)
        setMessage(`Correct! Since ${selectedNumber} is the first number, it is selected as the key.`);
        setIsNextEnabled(true);
        setIsSelectEnabled(false);
        setIsSkipEnabled(false);
        setFeedbackImage(feedbackImages.correct);
        setCurrentIndex((prev) => prev + 1); // Move to the next number
      } else {
        if (selectedNumber < previousKey) {
          // If the selected number is less than the previous key (green), it's correct
          setSortedIndex(currentIndex); // Update the key (highlight with green border)
          setMessage(
            `Correct! The number ${selectedNumber} is less than the previously selected key ${previousKey}, so we select it as the new key.`
          );
          setCurrentIndex((prev) => prev + 1); // Move to the next number
          setFeedbackImage(feedbackImages.correct);
        } else {
          // If the selected number is greater than the previous key (green), it's incorrect
          setMessage(
            `Oops! The number ${selectedNumber} is greater than the previously selected key ${previousKey}, so we must skip it. Try again!`
          );
          setFeedbackImage(feedbackImages.incorrect);
          // Do not increment currentIndex, reattempt with the same index
        }
      }
    }
  };
  
  const handleSkipClick = () => {
    const selectedNumber = extractNumber(numbers[currentIndex]);
    const previousKey = extractNumber(numbers[sortedIndex]);
  
    if (selectedNumber > previousKey) {
      // Correct skip
      setMessage(
        `Correct! The number ${selectedNumber} is greater than the previously selected key ${previousKey}, so skipping is correct.`
      );
      setFeedbackImage(feedbackImages.correct);
      setCurrentIndex((prev) => prev + 1); // Move to the next number
    } else {
      // Incorrect skip
      setMessage(
        `Oops! The number ${selectedNumber} is less than the previously selected key ${previousKey}, so we must select it, not skip it. Try again!`
      );
      setFeedbackImage(feedbackImages.incorrect);
      // Do not increment currentIndex, reattempt with the same index
    }
  
    setIsNextEnabled(true);
    setIsSelectEnabled(false);
    setIsSkipEnabled(false);
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
              src="/popup_selection.png"
              alt="Insertion Sort Modal"
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
            {numbers.map((image, index) => (
              <div
              key={index}
              className={`flex items-center justify-center border-4 rounded-full ${
                greenIndices.includes(index)
                  ? "border-green-500" // Already sorted (green border)
                  : index === sortedIndex
                  ? "border-green-500" // Currently sorted (green border)
                  : index === currentIndex
                  ? "border-yellow-500" // Current image being compared
                  : index < currentRoundStart
                  ? "border-gray-400" // Already sorted in previous rounds
                  : "border-gray-500" // Unsorted images
              }`}
            >
            
                <Image
                  width={64}
                  height={64}
                  src={image}
                  alt={`Number ${index + 1}`}
                  className="rounded-full"
                />
              </div>
            ))}
          </div>

          <div className="flex space-x-10 mt-6">
            <button
              onClick={handleSelectClick}
              disabled={!isSelectEnabled}
              style={{ opacity: isSelectEnabled ? 1 : 0.5 }}
            >
              <Image src="/select.png" width={200} height={200} alt="Select" />
            </button>

            <button
              onClick={handleSkipClick}
              disabled={!isSkipEnabled}
              style={{ opacity: isSkipEnabled ? 1 : 0.5 }}
            >
              <Image src="/skip.png" width={200} height={200} alt="Skip" />
            </button>
          </div>
        </div>

        {/* Right Box: Text, Next Button, and Feedback Image */}
        <div className="bg-green-700 border-dashed border-[#66FF00] border-4 rounded-xl p-6 flex flex-col justify-center items-center w-1/3 text-white shadow-lg">
          <p className="text-xl font-semibold text-center mb-6">{message}</p>

          {feedbackImage && (
            <Image src={feedbackImage} alt="Feedback" width={50} height={50} />
          )}

          <button
            onClick={handleNextClick}
            disabled={!isNextEnabled}
            style={{ opacity: isNextEnabled ? 1 : 0.5 }}
          >
            <Image src="/next.png" width={150} height={150} alt="Next" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectionSortPractise;
