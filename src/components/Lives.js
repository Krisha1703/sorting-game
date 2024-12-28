import Image from "next/image";

const Lives = ({ lives, level }) => {
  return (
    <div className="absolute top-0 left-0 p-4 flex gap-2">
      <h1 className="text-2xl font-semibold mx-2">Level: {level}</h1>
      {Array.from({ length: 3 }, (_, index) => (
        <Image
          key={index}
          src="/heart.png"
          alt="life"
          width={40}
          height={40}
          className={lives <= index ? "grayscale" : ""}
        />
      ))}
    </div>
  );
};

export default Lives;
