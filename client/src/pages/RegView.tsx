import RegionCard from "@/components/RegionCard";
import { REGION_STORAGE_KEY } from "@/config/config"
import regsJSON from "@/json/countries.json"
import type { iRegionSelect } from "@/types/types"
import { useState } from "react";

export default function RegView() {

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
        <div className="mx-auto max-w-5xl min-h-screen mt-20">
            {/* Provisional */}
            {selectedReg && (
                <p className="text-center text-white mt-4">
                    Región seleccionada: <strong>{selectedReg.name}</strong>
                </p>
            )}
            {/* Provisonal */}
            <h1 className="text-center text-white text-5xl font-black">Elige Región 🌍</h1>
            <div className="mt-10 grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1">
                {regs.map((reg) => (
                    <RegionCard key={reg.value} reg={reg} handleSelectReg={handleSelectReg}/>
                ))}
            </div>
        </div>
    )
}