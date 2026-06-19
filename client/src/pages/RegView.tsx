import RegionCard from "@/components/RegionCard";
import regsJSON from "@/json/countries.json"
import { useAppStore } from "@/stores/useAppStore";
import type { iRegionSelect } from "@/types/helperTypes"
import { Link } from "react-router-dom";
export default function RegView() {
    const regs = regsJSON as iRegionSelect[];
    const selectedReg = useAppStore(state => state.regSelect);
    const updateRegSelect = useAppStore(state => state.updateRegSelect);
    const handleSelectReg = (reg: iRegionSelect) => {
        updateRegSelect(reg);
    };
    return (
        <main className="mx-auto max-w-5xl relative px-4 sm:px-6 lg:px-0">
            <Link to={selectedReg ? '/' : '#'} className={`fixed top-4 sm:top-6 right-4 sm:right-6 z-50 px-5 sm:px-8 py-3 sm:py-4 rounded-full font-extrabold 
                text-sm sm:text-lg uppercase tracking-wide transition-all duration-150
                ${selectedReg ? "bg-[#C53F56] text-white shadow-[0_6px_0_0_#8B1A2B] hover:translate-y-0.5 hover:shadow-[0_4px_0_0_#8B1A2B] active:translate-y-1 active:shadow-[0_2px_0_0_#8B1A2B]"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}>
                Empieza a leer
            </Link>
            <div className="pt-16 sm:pt-20">
                <h1 className="text-center text-gray-700 text-3xl sm:text-5xl font-black">Elige una Región 🌍</h1>
                <div className="mt-6 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                    {regs.map((reg) => (
                        <RegionCard key={reg.value} reg={reg} handleSelectReg={handleSelectReg} isSelected={selectedReg?.value === reg.value}/>
                    ))}
                </div>
            </div>
        </main>
    )
}