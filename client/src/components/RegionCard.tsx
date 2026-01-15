import type { iRegionSelect } from "@/types/types"

interface iRegionCardProps {
    reg : iRegionSelect,
    handleSelectReg : (reg: iRegionSelect) => void
}

export default function RegionCard({ reg, handleSelectReg } : iRegionCardProps) {
  return (
    <div onClick={() => handleSelectReg(reg)} key={reg.value} className="flex flex-col items-center rounded-2xl border border-white/10  bg-white/5 p-6 
        hover:bg-white/10 hover:scale-105 transition mx-5">
        <img src={reg.flag} alt={reg.name} className="w-32 h-32 object-contain cursor-pointer" />
        <p className="mt-2 text-center text-white font-semibold">{reg.name}</p>
    </div>
  )
}
