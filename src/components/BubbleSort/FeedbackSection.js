import Image from "next/image";

const FeedbackSection = ({
  message,
  feedbackImage,
  nextButtonOpacity,
  handleNextClick,
}) => {
  return (
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
  );
};

export default FeedbackSection;
