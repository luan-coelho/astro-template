import { atom } from "nanostores"
import type { Module } from "@/types/model.ts"
import userService from "@/services/user-service.ts"

export const isSidebarExpanded = atom<boolean>(true)

export const currentModule = atom<Module>({} as Module)

export const modules = atom<Module[]>([])

export function toggleSidebar() {
    isSidebarExpanded.set(!isSidebarExpanded.get())
}

const id = "123e4567-e89b-12d3-a456-426614174001"
const userModules = await userService.getModulesByUserId(id)
modules.set(userModules)
