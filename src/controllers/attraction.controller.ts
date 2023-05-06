import { Response, Request } from "express";
import { getAttractionByCountryService, getAttractionsByContinentService, getAttractionsNearYouService, getByContinentAndCityService, getCountryThingsToDoService } from "../services/attraction.service";

export const getAttractionsByContinent = async (req: Request, res: Response) => {
    try {
      const { continent, page } = req.body as unknown as {continent: string, page: number}
      if (!continent) return res.status(400).json({"message": "Missing required fields"});
      const continentAttractions = await getAttractionsByContinentService(continent, page);
      const data = continentAttractions.length < 1?  {} : continentAttractions[0] 
      return res.status(200).json({"data": data});
    } catch (error) {
      return res.status(400).json({"message": "Encountered and error"});
    }
  }
  
export const getAttractionsByCountry = async (req: Request, res: Response) => {
    try {
      const { country, page } = req.body as unknown as {country: string, page: number}
      if (!country) return res.status(400).json({"message": "Missing required fields"});
      const countryAttractions = await getAttractionByCountryService(country, page);

      const data = countryAttractions.length < 1?  {} : countryAttractions[0] 
      return res.status(200).json({"data": data});
    } catch (error) {
      return res.status(400).json({"message": "Encountered and error"});
    }
  }
  
  export const getAttractionsNearYou = async (req: Request, res: Response) => {
    try {
      const { country, page } = req.body as unknown as {country: string, page: number};
      if (!country) return res.status(400).json({"message": "Missing required fields"});
      const continentAttractions = await getAttractionsNearYouService(country, page);
      return res.status(200).json({"data": continentAttractions});
    } catch (error) {
      return res.status(400).json({"message": "Encountered and error"});
    }
  }
  
  export const getContinentThingsToDo = async (req: Request, res: Response) => {
    try {
      const { continent } = req.body as unknown as {continent: string};
      if (!continent) return res.status(400).json({"message": "Missing required fields"});
      const continentAttractions = await getByContinentAndCityService(continent);
      return res.status(200).json({"data": continentAttractions});
    } catch (error) {
        return res.status(400).json({"message": "Encountered and error"});
    }
}
  
  export const getCountryThingsToDo = async (req: Request, res: Response) => {
    try {
      const { country } = req.body as unknown as {country: string};
      if (!country) return res.status(400).json({"message": "Missing required fields"});
      const continentAttractions = await getCountryThingsToDoService(country);
      return res.status(200).json({"data": continentAttractions});
    } catch (error) {
        return res.status(400).json({"message": "Encountered and error"});
    }
  }
