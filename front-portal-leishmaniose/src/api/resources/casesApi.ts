import { objectToQueryString } from '../../utility/Utils'
import BaseApi from '../baseApi'
import { Case } from '../../types/Case'

const baseApi = new BaseApi<Case>('cases')

export const casesApi = {
  async getAll() {
    return await baseApi.getAll()
  },

  async getAllPaginated(
    page?: number,
    searchString?: string,
    sortColumn?: string,
    sortDirection?: string
  ) {
    let url = '/cases'
    const queryObj: Record<string, any> = {}

    if (page) {
      queryObj.page = page
    }

    if (searchString) {
      queryObj.search_all_fields_string = searchString
    }

    if (sortColumn) {
      queryObj.sort_by = sortColumn
    }

    if (sortDirection) {
      queryObj.sort_direction = sortDirection
    }

    const queryString = objectToQueryString(queryObj)

    if (queryString) {
      url += `?${queryString}`
    }

    return await baseApi.get(url)
  },

  async getOne(id: number) {
    return await baseApi.getOne(id)
  },

  async create(data: Partial<Case>) {
    return await baseApi.create(data)
  },

  async update(id: number, data: Partial<Case>) {
    return await baseApi.update(id, data)
  },

  async delete(id: number) {
    return await baseApi.delete(id)
  }
}
