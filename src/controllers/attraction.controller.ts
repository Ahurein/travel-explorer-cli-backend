import { Response, Request } from "express";
import { getAttractionByCityService, getAttractionByCountryService, getAttractionsByContinentService, getAttractionsNearYouService, getContinentThingsToDoService, getCountryThingsToDoService } from "../services/attraction.service";

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
  
export const getAttractionsByCity = async (req: Request, res: Response) => {
    try {
      const { country, city, page } = req.body as unknown as {country: string, page: number, city: string}
      if (!country || !city) return res.status(400).json({"message": "Missing required fields"});
      const cityAttractions = await getAttractionByCityService(country,city, page);

      const data = cityAttractions.length < 1?  {} : cityAttractions[0] 
      return res.status(200).json({"data": data});
    } catch (error) {
      return res.status(400).json({"message": "Encountered and error"});
    }
  }
  
  export const getAttractionsNearYou = async (req: Request, res: Response) => {
    try {
      const { country, page } = req.body as unknown as {country: string, page: number};
      if (!country) return res.status(400).json({"message": "Missing required fields"});
      const attractions = await getAttractionsNearYouService(country, page);
      return res.status(200).json({"data": attractions });
    } catch (error) {
      return res.status(400).json({"message": "Encountered and error"});
    }
  }
  
  export const getContinentThingsToDo = async (req: Request, res: Response) => {
    try {
      const { continent, page } = req.body as unknown as {continent: string, page: number};
      if (!continent) return res.status(400).json({"message": "Missing required fields"});
      const continentAttractions = await getContinentThingsToDoService(continent, page);
      const data = continentAttractions.length > 0 ? continentAttractions[0] : {}
      return res.status(200).json(data);
    } catch (error) {
      console.log(error)
        return res.status(400).json({"message": "Encountered and error"});
    }
}
  
  export const getCountryThingsToDo = async (req: Request, res: Response) => {
    try {
      const { country, page } = req.body as unknown as {country: string, page: number};
      if (!country) return res.status(400).json({"message": "Missing required fields"});
      const continentAttractions = await getCountryThingsToDoService(country, page);
      const data = continentAttractions.length > 0 ? continentAttractions[0] : {}
      return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json({"message": "Encountered and error"});
    }
  }
