import Image from "next/image";

const NumbersSection = ({ numbers, images, highlightedImages, isSorted, nextClicked }) => {
  return (
    <div className="flex space-x-6 my-5">
      {images.map((imgSrc, idx) => (
        <Image
          key={idx}
          src={imgSrc}
          width={64}
          height={64}
          alt={`number-${numbers[idx]}`}
          className={`rounded-full  ${
            isSorted
              ? "border-green-500 border-4 border-solid"
              : nextClicked && highlightedImages.includes(idx)
              ? "border-yellow-500 border-4 border-solid"
              : ""
          }`}
        />
      ))}
    </div>
  );
};

export default NumbersSection;
