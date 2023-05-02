import { Response, Request } from "express";
import { getAttractionsByContinentService, getAttractionsNearYouService, getByContinentAndCityService } from "../services/attraction.service";

export const getAttractionsByContinent = async (req: Request, res: Response) => {
    try {
      const { continent, page } = req.body as unknown as {continent: string, page: number}
      if (!continent) return res.status(400).json({"message": "Missing required fields"});
      const continentAttractions = await getAttractionsByContinentService(continent, page);
      const hasMore = continentAttractions.length < 1 ? false : true
      return res.status(200).json({"data": {continentAttractions, hasMore}});
    } catch (error) {
      return res.status(400).json({"message": "Encountered and error"});
    }
  }
  
  export const getAttractionsNearYou = async (req: Request, res: Response) => {
    try {
      const { country, page } = req.body as unknown as {country: string, page: number};
      if (!country) return res.status(400).json({"message": "Missing required fields"});
      const continentAttractions = await getAttractionsNearYouService(country, page);
      const hasMore = continentAttractions.length < 1 ? false : true
      return res.status(200).json({"data": {continentAttractions, hasMore}});
    } catch (error) {
      return res.status(400).json({"message": "Encountered and error"});
    }
  }
  
  export const getByContinentAndCity = async (req: Request, res: Response) => {
    try {
      const { continent } = req.body as unknown as {continent: string};
      if (!continent) return res.status(400).json({"message": "Missing required fields"});
      const continentAttractions = await getByContinentAndCityService(continent);
      const hasMore = continentAttractions.length < 1 ? false : true
      return res.status(200).json({"data": {continentAttractions, hasMore}});
    } catch (error) {
        return res.status(400).json({"message": "Encountered and error"});
    }
  }
