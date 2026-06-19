import type { iRegionSelect } from "@/types/helperTypes"
interface iRegionCardProps {
  reg : iRegionSelect,
  isSelected: boolean
  handleSelectReg : (reg: iRegionSelect) => void
}
export default function RegionCard({ reg, isSelected, handleSelectReg } : iRegionCardProps) {
  return (
    <div onClick={() => handleSelectReg(reg)} key={reg.value} className={`flex flex-col items-center rounded-2xl border p-3 sm:p-6 hover:scale-105 transition mx-2 sm:mx-5 cursor-pointer
      ${isSelected ? "border-[#C53F56] bg-[#C53F56] ring-2 ring-[#C53F56]" : "hover:bg-white/10"}`}>
      <img src={reg.flag} alt={reg.name} className="w-20 h-20 sm:w-32 sm:h-32 object-contain cursor-pointer" />
      <p className="mt-2 text-center text-gray-700 font-semibold text-sm sm:text-base">{reg.name}</p>
    </div>
  )
}