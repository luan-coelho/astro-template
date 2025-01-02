import { apiRoutes } from "@/routes"
import { Service } from "@/services/service"

import type { Module, User } from "@/types/model.ts"
import apiClient from "@/lib/api-client"

export class UserService extends Service<User> {
    getUrl(): string {
        return apiRoutes.menuItems.index
    }

    getModulesByUserId(id: string): Promise<Module[]> {
        return apiClient.get<Module[]>(apiRoutes.users.modules(id))
    }
}

const userService = new UserService()
export default userService
