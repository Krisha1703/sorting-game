import Image from "next/image";

const NumbersSection = ({ numbers, currentIndex, sortedIndexes }) => {
  return (
    <div className="flex space-x-4">
      {numbers.map((num, index) => (
        <Image
          key={index}
          src={num.image}
          alt={`Number ${num.value}`}
          width={64}
          height={64}
          className={`rounded-full ${
            sortedIndexes.includes(index) ? "border-green-500 border-4 border-solid" : ""
          } ${index === currentIndex ? "border-yellow-500 border-4 border-solid" : ""}`}
        />
      ))}
    </div>
  );
};

export default NumbersSection;
