import React from "react";
import Image from "next/image";

const FeedbackSection = ({ message, feedbackImage, nextEnabled, onNext }) => {
  return (
    <div className="bg-green-700 border-dashed border-[#66FF00] border-4 rounded-xl p-6 flex flex-col justify-center items-center w-1/3 text-white shadow-lg">
      <p className="text-xl font-semibold text-center mb-6">{message}</p>

      {feedbackImage && (
        <Image src={feedbackImage} alt="Feedback" width={50} height={50} />
      )}

      <button
        onClick={onNext}
        disabled={!nextEnabled}
        className={` ${
          nextEnabled ? "opacity-100" : "opacity-50 cursor-not-allowed"
        }`}
      >
        <Image src="/next.png" width={150} height={150} alt="Next" />
      </button>
    </div>
  );
};

export default FeedbackSection;
