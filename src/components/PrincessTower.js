import Image from 'next/image';

const PrincessTower = () => {
  return (
    <Image
        src="/Princess Tower.png"
        width={800}
        height={800}
        alt="princess tower"
        className="absolute left-[63.5vw] top-20 scale-[140%]"
    />
  )
}

export default PrincessTower