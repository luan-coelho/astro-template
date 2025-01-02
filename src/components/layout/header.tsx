import React from "react"
import { Menu } from "lucide-react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useStore } from "@nanostores/react"
import { currentModule, modules, toggleSidebar } from "@/store/sidebar-store"

export default function Header() {
    const $modules = useStore(modules)

    function handleModuleChange(value: string) {
        const modulez = $modules!.find(module => module.id == value)!
        // changeCurrentModule(modulez)
    }

    return (
        <header
            className={`sticky top-0 flex min-h-11 items-center justify-between bg-white px-4 py-3 shadow-sm transition-all duration-300`}>
            <div onClick={toggleSidebar} className="cursor-pointer rounded p-2 hover:bg-[#f5f5f5]">
                <Menu size={18} />
            </div>
            <Select value={currentModule?.get()?.id?.toString() || ""}>
                <SelectTrigger className="w-auto" disabled={!$modules || $modules.length == 0}>
                    <SelectValue placeholder={$modules && $modules.length > 0 ? "Módulo" : "Nenhum módulo vinculado"} />
                </SelectTrigger>
                {$modules && (
                    <SelectContent>
                        {$modules.map(module => (
                            <SelectItem key={module.id} value={module.id}>
                                {module.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                )}
            </Select>
        </header>
    )
}
