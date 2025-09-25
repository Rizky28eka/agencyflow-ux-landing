import { http, HttpResponse } from 'msw'
import { projects } from './data'
 
export const handlers = [
  http.get('/api/projects', () => {
    return HttpResponse.json(projects)
  }),
]