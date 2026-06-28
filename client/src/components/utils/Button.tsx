import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface iButtonProps {
  url: string;
  icon?: ReactNode;
  children: ReactNode;
  replace : boolean
}

export default function Button({ url, icon, children, replace }: iButtonProps) {
  return (
    <Link to={url} replace={replace} className="mt-2 px-3 py-3 sm:px-6 sm:py-5 mx-2 rounded-full font-extrabold uppercase tracking-wide transition-all duration-150 bg-[#C53F56] text-white shadow-[0_6px_0_0_#8B1A2B]
        hover:translate-y-0.5 hover:shadow-[0_4px_0_0_#8B1A2B] active:translate-y-1 active:shadow-[0_2px_0_0_#8B1A2B] flex items-center justify-center gap-2">
        <span className="block sm:hidden">
            {icon}
        </span>
        <span className="hidden sm:flex items-center gap-2">
            {icon}
            {children}
        </span>
    </Link>
  )
}