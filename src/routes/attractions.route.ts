import {Router} from 'express'
import {getAttractionsByCity, getAttractionsByContinent, getAttractionsByCountry, getAttractionsNearYou, getContinentThingsToDo, getCountryThingsToDo} from '../controllers/attraction.controller'

export const attractionRoutes = (router: Router) => {
    router.route("/attractions/continent").post(getAttractionsByContinent)
    router.route("/attractions/country").post(getAttractionsByCountry)
    router.route("/attractions/city").post(getAttractionsByCity)
    router.route("/attractions/near-you").post(getAttractionsNearYou)
    router.route("/attractions/country-things-to-do").post(getCountryThingsToDo)
    router.route("/attractions/continent-things-to-do").post(getContinentThingsToDo)
}