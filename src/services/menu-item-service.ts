import { apiRoutes } from "@/routes.ts"
import { Service } from "@/services/service"

import type { MenuItem } from "@/types/model.ts"

export class MenuItemService extends Service<MenuItem> {
    getUrl(): string {
        return apiRoutes.menuItems.index
    }
}

const menuItemService = new MenuItemService()
export default menuItemService
