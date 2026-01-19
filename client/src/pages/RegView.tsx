import RegionCard from "@/components/RegionCard";
import { REGION_STORAGE_KEY } from "@/config/config"
import regsJSON from "@/json/countries.json"
import type { iRegionSelect } from "@/types/types"
import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegView() {
    // const [active, isActive] = useState<boolean>(false);
    const [selectedReg, setSelectedReg] = useState<iRegionSelect>(() => {
        const stored = localStorage.getItem(REGION_STORAGE_KEY);
        return stored ? JSON.parse(stored) : null
    });

    const regs = regsJSON as iRegionSelect[];

    const handleSelectReg = (reg : iRegionSelect) => {
        setSelectedReg(reg);
        localStorage.setItem(REGION_STORAGE_KEY, JSON.stringify(reg));
    }

    return (
        <main className="mx-auto max-w-5xl relative">
            <Link to={selectedReg ? '/' : '#'}  className={`fixed top-6 right-6 z-50 px-8 py-4 rounded-full font-extrabold 
                text-lg uppercase tracking-wide transition-all duration-150
                ${selectedReg ? "bg-green-500 text-white shadow-[0_6px_0_0_#15803d] hover:translate-y-0.5 hover:shadow-[0_4px_0_0_#15803d] active:translate-y-1 active:shadow-[0_2px_0_0_#15803d]"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}>
                Empieza a leer
            </Link>
            <div className="pt-20">
                {/* Provisional */}
                {selectedReg && (
                    <p className="text-center text-white mt-4">
                        Región seleccionada: <strong>{selectedReg.name}</strong>
                    </p>
                )}
                {/* Provisonal */}
                <h1 className="text-center text-white text-5xl font-black">Elige una Región 🌍</h1>
                <div className="mt-10 grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1">
                    {regs.map((reg) => (
                        <RegionCard key={reg.value} reg={reg} handleSelectReg={handleSelectReg}/>
                    ))}
                </div>
            </div>
        </main>
    )
}