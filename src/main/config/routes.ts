import { Router, type Express } from 'express'
import fg from 'fast-glob'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  fg.sync('**/src/main/routes/**routes.ts').forEach(async (file) => {
    const route = (await import(`../../../${file}`)).default
    route(router)
  })
}
