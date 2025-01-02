import { apiRoutes } from "@/routes"
import { Service } from "@/services/service"

import type { Module } from "@/types/model.ts"
import apiClient from "@/lib/api-client"

export class ModuleService extends Service<Module> {
    getUrl(): string {
        return apiRoutes.modules.index
    }

    /*async updateMenuItemsOrder(id: string, menuItemsOrder: MenuItemsOrder[]): Promise<Module> {
        return apiClient.patch(`${this.getUrl()}/${id}/update-menu-items-order`, menuItemsOrder)
    }*/

    async addMenuItem(id: string, menuItemId: string): Promise<Module> {
        return apiClient.patch(`${this.getUrl()}/${id}/add-menu-item/${menuItemId}`)
    }
}

const moduleService = new ModuleService()
export default moduleService
