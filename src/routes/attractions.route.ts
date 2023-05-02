import {Router} from 'express'
import { getAttractionsByContinent, getAttractionsNearYou, getByContinentAndCity } from '../controllers/attraction.controller'

export const attractionRoutes = (router: Router) => {
    router.route("/attractions/continent").post(getAttractionsByContinent)
    router.route("/attractions/near-you").post(getAttractionsNearYou)
    router.route("/attractions/things-to-do").post(getByContinentAndCity)
}