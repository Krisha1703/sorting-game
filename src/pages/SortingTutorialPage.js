import SortingTutorial from "@/components/SortingTutorialComponent";
import SortingAlgorithmSelector from "@/components/SortingAlgorithmSelector";
import { useState, useEffect } from "react";
import "../app/globals.css";
import { useRouter } from "next/router";

const SortingTutorialPage = () => {
  const router = useRouter();
  const { algorithm } = router.query;
  console.log(algorithm);
   // Update the selected algorithm when the query is available
   useEffect(() => {
    if (algorithm) {
      setSelectedAlgorithm(algorithm);
    }
  }, [algorithm]);

   const [selectedAlgorithm, setSelectedAlgorithm] = useState(algorithm); // Track selected algorithm

   // Data for each algorithm
  const algorithmData = {
    "Bubble Sort": {
      description:
        "Work through comparing pairs of adjacent numbers in a list and switch positions if the first number is greater than the last number. This process is repeated several times until all items are completely sorted.",
      videoSrc: "/bubblesort-tutorial-video.mp4",
      practiceLink: "/BubbleSort/Practise/BubbleSortPractise",
    },
    "Insertion Sort": {
      description:
        "Insertion Sort is a step-by-step algorithm that helps arrange elements by building a sorted list one item at a time. Imagine holding a deck of cards and sorting them in your hand: you take each card and insert it into its correct position. That is exactly how this algorithm works!",
      videoSrc: "/insertionsort-tutorial-video.mp4",
      practiceLink: "/InsertionSort/Practise/InsertionSortPractise",
    },
  };

  // Get the data for the currently selected algorithm
   // Get the data for the currently selected algorithm
   const { description, videoSrc, practiceLink } =
   algorithmData[selectedAlgorithm] || {};
  
   return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/algorithms-bg.png')" }}
    >
      {/* Sorting Options */}
      <SortingAlgorithmSelector
        selectedAlgorithm={selectedAlgorithm}
        onAlgorithmSelect={setSelectedAlgorithm}
      />

      {/* Sorting Tutorial Content */}
      <SortingTutorial
        algorithm={selectedAlgorithm}
        description={description}
        videoSrc={videoSrc}
        practiceLink={practiceLink}
      />
    </div>
  );
};

export default SortingTutorialPage;
