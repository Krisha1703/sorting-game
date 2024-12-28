import SortingTutorial from "@/components/SortingTutorialComponent";
import SortingAlgorithmSelector from "@/components/SortingAlgorithmSelector";
import { useState } from "react";
import { useRouter } from "next/router";
import "../app/globals.css";

// Server-side function to fetch the query parameter
export async function getServerSideProps(context) {
  const { algorithm } = context.query;

  // Check if algorithm is provided, otherwise fallback to default
  const defaultAlgorithm = "Bubble Sort"; // Default algorithm if none is provided
  const selectedAlgorithm = algorithm || defaultAlgorithm;

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

  const algorithmDataForSelected = algorithmData[selectedAlgorithm] || null;

  return {
    props: {
      selectedAlgorithm,
      algorithmData: algorithmDataForSelected,
    },
  };
}

const SortingTutorialPage = ({ selectedAlgorithm, algorithmData }) => {
  const router = useRouter();

  // If algorithmData is not available, show an error or fallback message
  if (!algorithmData) {
    return <div>Algorithm not found.</div>;
  }

  const { description, videoSrc, practiceLink } = algorithmData;

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/algorithms-bg.png')" }}
    >
      {/* Sorting Options */}
      <SortingAlgorithmSelector
        selectedAlgorithm={selectedAlgorithm}
        onAlgorithmSelect={(algorithm) => router.push(`/SortingTutorialPage?algorithm=${algorithm}`)}
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
