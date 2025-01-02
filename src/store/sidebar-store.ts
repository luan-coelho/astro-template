import { atom } from "nanostores"

export const isSidebarExpanded = atom<boolean>(true)

export function toggleSidebar() {
    isSidebarExpanded.set(!isSidebarExpanded.get())
}
