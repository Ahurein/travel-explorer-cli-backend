import {Router} from 'express'

export const attractionRoutes = (router: Router) => {
    router.route("/").post()
}