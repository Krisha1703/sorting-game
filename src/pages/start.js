import { useRouter } from "next/navigation";

export default function Start() {
  const router = useRouter();

  const handleStartClick = () => {
    router.push("/algorithm");
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/sorting-game-bg.png')" }}
    >
      {/* Text and Button Layer */}
      <div className="absolute top-[12vh] left-[22vw] w-full h-full flex flex-col justify-center items-center text-white">
        <button
          onClick={handleStartClick}
          className="bg-green-600 rounded-md p-4 text-white w-1/6 text-xl shadow-lg hover:bg-green-700"
        >
          START
        </button>
      </div>
    </div>
  );
}
