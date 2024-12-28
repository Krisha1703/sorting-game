import React, { useState, useEffect } from "react";
import Image from "next/image";

const SortingAlgorithmSelector = ({ selectedAlgorithm, onAlgorithmSelect, isOtherAlgorithmSelected }) => {

  // Initialize the selected algorithm based on the prop
  const [currentSelectedAlgorithm, setCurrentSelectedAlgorithm] = useState(
    isOtherAlgorithmSelected ? selectedAlgorithm : "Bubble Sort"
  );

  // Handle click on an image option
  const handleOptionClick = (algorithm) => {
    onAlgorithmSelect(algorithm); // Notify parent component of the selection
  };

  useEffect(() => {
    // Update the selected algorithm when it changes externally (from the parent)
    if (selectedAlgorithm !== currentSelectedAlgorithm) {
      setCurrentSelectedAlgorithm(selectedAlgorithm);
    }
  }, [selectedAlgorithm]);

  return (
    <div className="flex space-x-4 justify-start mx-40 my-2">
      {/* Bubble Sort Image */}
      <div onClick={() => handleOptionClick("Bubble Sort")} className="cursor-pointer">
        <Image
          src={
            selectedAlgorithm === "Bubble Sort"
              ? "/Bubble Sort_AF.png"
              : "/Bubble Sort_BF.png"
          }
          width={250}
          height={250}
          alt="Bubble Sort"
        />
      </div>

      {/* Insertion Sort Image */}
      <div onClick={() => handleOptionClick("Insertion Sort")} className="cursor-pointer">
        <Image
          src={
            selectedAlgorithm === "Insertion Sort"
              ? "/Insertion Sort_AF.png"
              : "/Insertion Sort_BF.png"
          }
          width={250}
          height={250}
          alt="Insertion Sort"
        />
      </div>

     
    </div>
  );
};

export default SortingAlgorithmSelector;
