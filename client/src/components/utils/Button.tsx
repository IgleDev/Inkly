import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
interface iButtonProps {
    url : string;
    children : ReactNode;
}

export default function Button({url, children} : iButtonProps) {
    return (
        <Link to={url}
        className='mt-2 px-10 mx-2 py-5 rounded-full font-extrabold text-lg uppercase tracking-wide transition-all duration-150 bg-[#C53F56] text-white 
            shadow-[0_6px_0_0_#8B1A2B] hover:translate-y-0.5 hover:shadow-[0_4px_0_0_#8B1A2B] active:translate-y-1 active:shadow-[0_2px_0_0_#8B1A2B]'>
            {children}
        </Link>
    )
}
