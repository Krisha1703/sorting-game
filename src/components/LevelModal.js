import Image from "next/image";

const LevelModal = ({ closeModal, src }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative">
        <Image
          src={src}
          alt=" Sort Modal"
          width={900}
          height={900}
          className="cursor-pointer rounded-2xl"
        />
        <button
          className="bg-green-500 text-white font-semibold p-3 absolute bottom-[11%] left-[45%] z-20 rounded-xl cursor-pointer"
          onClick={closeModal}
        >
          Save the princess!
        </button>
      </div>
    </div>
  );
};

export default LevelModal;
