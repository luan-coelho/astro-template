import { DataPagination, Pageable } from "@/types"

import apiClient from "@/lib/api-client"

export abstract class Service<T> {
    protected abstract getUrl(): string

    /**
     * Busca todos os registros com paginação
     * @param page Página
     * @param size Tamanho de registros por página
     * @param sort Ordenação no formato campo:asc|desc
     * @param filters Filtros no formato campo;operador;valor
     * @param options Opções de requisição
     */
    async fetchAllWithPagination(
        { page, size, sort, filters }: Pageable,
        options?: RequestInit,
    ): Promise<DataPagination<T>> {
        const endpoint = `${this.getUrl()}?page=${page}&size=${size}&sort=${sort}`
        if (filters) {
            endpoint.concat(`&filters=${filters}`)
        }
        return apiClient.get<DataPagination<T>>(endpoint, options)
    }

    /**
     * Busca todos os registros sem paginação
     */
    async fetchAll(options?: RequestInit): Promise<T[]> {
        return apiClient.get<T[]>(`${this.getUrl()}/all`, options)
    }

    async fetchById(id: string, options?: RequestInit): Promise<T> {
        return apiClient.get<T>(`${this.getUrl()}/${id}`, options)
    }

    async create(data: Partial<T>, options?: RequestInit): Promise<T> {
        return apiClient.post<T>(this.getUrl(), data, options)
    }

    async updateById(id: string, data: Partial<T>, options?: RequestInit): Promise<T> {
        return apiClient.put<T>(`${this.getUrl()}/${id}`, data, options)
    }

    async deleteById(id: string, options?: RequestInit): Promise<void> {
        return apiClient.delete(`${this.getUrl()}/${id}`, options)
    }

    async activateById(id: string, options?: RequestInit): Promise<void> {
        return apiClient.patch(`${this.getUrl()}/${id}/activate`, options)
    }

    async disableById(id: string, options?: RequestInit): Promise<void> {
        return apiClient.patch(`${this.getUrl()}/${id}/disable`, options)
    }
}