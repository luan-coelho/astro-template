import { useState } from "react"
import { ChevronDown } from "lucide-react"

import type { MenuItem } from "@/types/model.ts"
import { useStore } from "@nanostores/react"
import { isSidebarExpanded } from "@/store/sidebar-store.ts"
import { LucideIcon } from "@/components/lucide-icon"

export function SideBarItem({ menuItem: { icon, label, route, subItems } }: { menuItem: MenuItem }) {
    const $isSidebarExpanded = useStore(isSidebarExpanded)
    const pathname = window.location.pathname
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const isActive = (path: string) => pathname === path

    function isParentOrChildActive(): boolean {
        if (isActive(route || "")) return true
        return subItems?.some(subItem => isActive(subItem.route)) || false
    }

    function toggleSubMenu(): void {
        setIsOpen(!isOpen)
    }

    const parentOrChildActive = isParentOrChildActive()

    const size = $isSidebarExpanded ? 18 : 20

    return (
        <li className="w-full">
            {subItems != undefined && subItems.length > 0 ? (
                <div
                    onClick={subItems ? toggleSubMenu : undefined}
                    className={`flex min-h-11 cursor-pointer items-center ${$isSidebarExpanded ? "justify-between" : "justify-center"} gap-2.5 px-6 py-2.5 text-[#bfbfbf] ${
                        parentOrChildActive && !subItems ? "border-r-4 border-primary bg-[#ffffff0d] text-white" : ""
                    } ${parentOrChildActive && subItems ? "text-primary" : ""} w-full delay-150 hover:bg-[#262626]`}>
                    <div className="flex items-center justify-start gap-2.5">
                        <div className={parentOrChildActive ? "text-primary" : ""}>
                            <LucideIcon name={icon} size={size} />
                        </div>
                        {$isSidebarExpanded && <div className="text-sm font-normal leading-snug">{label}</div>}
                    </div>
                    {subItems && $isSidebarExpanded && (
                        <ChevronDown
                            className={`transition-transform duration-100 ${isOpen ? "rotate-180" : "rotate-0"}`}
                            size={16}
                        />
                    )}
                </div>
            ) : (
                <a
                    href={route || "#"}
                    onClick={subItems ? toggleSubMenu : undefined}
                    className={`flex min-h-11 cursor-pointer items-center ${$isSidebarExpanded ? "justify-start" : "justify-center"} gap-2.5 px-6 py-2.5 text-[#bfbfbf] ${parentOrChildActive ? "border-r-4 border-primary bg-[#ffffff0d] text-white" : ""} w-full delay-150 hover:bg-[#262626]`}>
                    <div className={parentOrChildActive ? "text-primary" : ""}>
                        <LucideIcon name={icon} size={size} />
                    </div>
                    {$isSidebarExpanded && <div className="text-sm font-normal leading-snug">{label}</div>}
                    {subItems && $isSidebarExpanded && (
                        <ChevronDown
                            className={`transition-transform duration-100 ${isOpen ? "rotate-180" : "rotate-0"}`}
                            size={16}
                        />
                    )}
                </a>
            )}

            {isSidebarExpanded && subItems != undefined && subItems.length > 0 && (
                <div
                    className={`overflow-hidden transition-all duration-100 ease-in-out ${isOpen ? "max-h-screen" : "max-h-0"}`}>
                    {subItems?.map(subItem => (
                        <a
                            href={subItem.route}
                            className={`flex min-h-11 items-center justify-start gap-2.5 py-1.5 pl-10 text-[#bfbfbf] ${isActive(subItem.route) ? "bg-[#ffffff0d] text-white" : ""} hover:bg-[#262626]`}>
                            <div className="flex items-center justify-start gap-2.5">
                                <LucideIcon name={subItem.icon} size={size} />
                                {isSidebarExpanded && (
                                    <div className="text-sm font-normal leading-snug">{subItem.label}</div>
                                )}
                            </div>
                        </a>
                    ))}
                </div>
            )}
        </li>
    )
}
