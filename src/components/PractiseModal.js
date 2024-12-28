import { useState } from "react";
import Image from "next/image";

const PractiseModal = ({ selectedAlgorithm }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Modal content mapping based on selectedAlgorithm
  const modalContent = {
    "Bubble Sort": {
      imageSrc: "/popup_bubble.png",
    },
    "Insertion Sort": {
      imageSrc: "/popup_insertion.png",
    },
    "Selection Sort": {
      imageSrc: "/popup_selection.png",
    },
  };

  // Fallback content if selectedAlgorithm doesn't match any key
  const content = modalContent[selectedAlgorithm] || {
    imageSrc: "/popup_bubble.png",
  };

  // Render nothing if the modal is closed
  if (!isModalOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
        <Image
          src={content.imageSrc}
          alt={`${selectedAlgorithm} Modal`}
          width={1200}
          height={1200}
          className="mx-auto cursor-pointer"
          onClick={closeModal}
        />
    </div>
  );
};

export default PractiseModal;
