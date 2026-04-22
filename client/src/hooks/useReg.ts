
const flags: Record<string, string> = {
    es : "https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/es.svg",
    fr : "https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/fr.svg",
    it : "https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/it.svg",
    pt : "https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/pt.svg",
    eng : "https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/gb-eng.svg",
};

export const useReg = (reg?: string) => {
    if (!reg) return {};

    return {
        flag: flags[reg]
    };
};