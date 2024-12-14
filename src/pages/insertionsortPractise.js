import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import "../app/globals.css"

const InsertionSortGame = () => {
  const router = useRouter();

  const [selectedAlgorithm, setSelectedAlgorithm] = useState("Insertion Sort");
  const [isModalOpen, setIsModalOpen] = useState(true);

  // Images of numbers
  const images = [
    "/old numbers/5.png",
    "/old numbers/3.png",
    "/old numbers/4.png",
    "/old numbers/2.png",
    "/old numbers/1.png",
  ];

  // Set numbers as the images directly
  const [numbers, setNumbers] = useState(images);
  const [currentIndex, setCurrentIndex] = useState(0); // Start from the first image
  const [sortedIndexes, setSortedIndexes] = useState([]); // Track sorted images
  const [message, setMessage] = useState("Start with the first image.");
  const [feedbackImage, setFeedbackImage] = useState(""); // Feedback image (error or success)
  const [isNextEnabled, setIsNextEnabled] = useState(true);
  const [isFixEnabled, setIsFixEnabled] = useState(false);
  const [isLeftEnabled, setIsLeftEnabled] = useState(false);

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

  // Handle "Next" button click
  const handleNext = () => {
    
    if (message === "Congratulations! The images are sorted.") {
      // If the sorting is completed, navigate to the next page
      router.push("/insertionsortChallenge");
    }

    else if (currentIndex < numbers.length) {
      setMessage("Move the current image to its correct position or fix it.");
      setIsNextEnabled(false);
      setIsFixEnabled(true);
      setIsLeftEnabled(true);
      setFeedbackImage(""); // Clear any feedback image when starting
    }
  };

  const handleFix = () => {
    if (
      currentIndex === 0 ||
      numbers[currentIndex] >= numbers[currentIndex - 1]
    ) {
      const newSortedIndexes = [...sortedIndexes, currentIndex];
      setSortedIndexes(newSortedIndexes);
  
      if (newSortedIndexes.includes(numbers.length - 1)) {
        // Success if the last image is marked as sorted
        setMessage("Congratulations! The images are sorted.");
        setFeedbackImage("/yellow-star.webp"); // Success image
        setIsNextEnabled(true);
        setIsFixEnabled(false);
        setIsLeftEnabled(false);
      } else {
        setMessage("Success! Move to the next image.");
        setFeedbackImage("/yellow-star.webp"); // Success image
        setCurrentIndex((prev) => prev + 1);
        setIsNextEnabled(true);
        setIsFixEnabled(false);
        setIsLeftEnabled(false);
      }
    } else {
      setMessage("Error: Current image is not in the correct position.");
      setFeedbackImage("/red-cross.webp"); // Error image
    }
  };

  // Handle "Left" button click
  const handleLeft = () => {
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
      setFeedbackImage("/red-cross.webp"); // Error image
    }
  };

  // Handle "Reset" button click
  const handleReset = () => {
    setNumbers(images); // Reset to original image order
    setCurrentIndex(0);
    setSortedIndexes([]);
    setMessage("Start with the first image.");
    setIsNextEnabled(true);
    setIsFixEnabled(false);
    setIsLeftEnabled(false);
    setFeedbackImage(""); // Clear feedback image
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
              src="/popup_insertion.png"
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
                  sortedIndexes.includes(index)
                    ? "border-green-500"
                    : index === currentIndex
                    ? "border-yellow-500"
                    : "border-gray-500"
                }`}
              >
                {/* Display Image */}
                <Image
                  width={64}
                  height={64}
                  src={image} // Use the image directly
                  alt={`Number ${index + 1}`}
                  className="rounded-full"
                />
              </div>
            ))}
          </div>

          <div className="flex space-x-10 mt-6">
            <button
              onClick={handleLeft}
              disabled={!isLeftEnabled}
              className={` ${isLeftEnabled ? "opacity-100" : "opacity-50 cursor-not-allowed"}`}
            >
              <Image src="/left.png" width={200} height={200} alt="Move Left" />
            </button>

            <button
              onClick={handleFix}
              disabled={!isFixEnabled}
              className={` ${isFixEnabled ? "opacity-100" : "opacity-50 cursor-not-allowed"}`}
            >
              <Image src="/fix.png" width={200} height={200} alt="Fix" />
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
            onClick={handleNext}
            disabled={!isNextEnabled}
            className={` ${isNextEnabled ? "opacity-100" : "opacity-50 cursor-not-allowed"}`}
          >
            <Image src="/next.png" width={150} height={150} alt="Next" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsertionSortGame;
