import Link from "next/link";

const BackButton = ({ href }) => {
  return (
    <div className="self-start mx-[10vw] my-20">
      <Link href={href}>
        <button className="border-solid border-2 border-yellow-400 text-yellow-400 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shadow-md hover:bg-yellow-400 hover:text-green-700">
          &#x2190;
        </button>
      </Link>
    </div>
  );
};

export default BackButton;
