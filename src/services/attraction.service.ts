import { AttractionModel } from "../models/attraction.model";

export const getAttractionsByContinentService = async (continent: string, page = 1) => {
  const formattedContinent = capitalizeWords(continent);

  return AttractionModel.aggregate([
    {
      $match: {
        continent: formattedContinent.trim(),
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        attractions: {$push: "$$ROOT"}
      }
    },
    {
      $project: {
        _id: 0,
        attractions: {
          $slice: ["$attractions", (page - 1) * 10, 10]
        },
        total: 1,
        hasMore: {
          $cond: {
            if: { $gt: ["$total", (page * 10)] },
            then: true,
            else: false
          }
        }
      }
    }
  ]);
}

export const getAttractionByCountryService = async (country: string, page = 1) => {
  const formattedCountry = capitalizeWords(country);

  return AttractionModel.aggregate([
    {
      $match: {
        "attraction.country": formattedCountry?.trim(),
      },
    },
        {
      $group: {
        _id: null,
        total: { $sum: 1 },
        attractions: {$push: "$$ROOT"}
      }
    },
    {
      $project: {
        _id: 0,
        attractions: {
          $slice: ["$attractions", (page - 1) * 10, 10]
        },
        total: 1,
        hasMore: {
          $cond: {
            if: { $gt: ["$total", (page * 10)] },
            then: true,
            else: false
          }
        }
      }
    }
  ]);
};

// ******
export const getOneAttractionPerContinentService = async () => {
  return AttractionModel.aggregate([
    { $group: { _id: "$continent", attractions: { $push: "$$ROOT" } } },
    {
      $project: {
        _id: 0,
        attractions: 1,
      },
    },
    {
      $addFields: {
        randomIndex: {
          $floor: { $multiply: [{ $size: "$attractions" }, { $rand: {} }] },
        },
      },
    },
    {
      $addFields: {
        randomAttraction: { $arrayElemAt: ["$attractions", "$randomIndex"] },
      },
    },
    { $replaceRoot: { newRoot: "$randomAttraction" } },
    {
      $project: {
        continent: 1,
        country: 1,
        attraction: 1,
      },
    },
  ]);
};




export const getAllAttractionByCityService = async (
  country: string,
  city: string
) => {
  const formattedCountry = capitalizeWords(country);
  const formattedCity = capitalizeWords(city);

  return AttractionModel.aggregate([
    {
      $match: {
        $and: [
          { "attraction.country": formattedCountry?.trim() },
          { "attraction.city": formattedCity },
        ],
      },
    },
  ]);
};

export const getAttractionsNearYouService = async (country: string, page = 1) => {
  const formattedCountry = capitalizeWords(country);

  return AttractionModel.aggregate([
    {
      $match: {
        "attraction.country": formattedCountry?.trim(),
      },
    },
    {
      $group: {
        _id: "$attraction.city",
        total: { $sum: 1 },
        attractions: { $push: "$$ROOT" }
      }
    },
    {
      $project: {
        _id: 1,
        attractions: {
          $slice: ["$attractions", (page - 1) * 10, 10]
        },
        total: 1,
        hasMore: {
          $cond: {
            if: { $gt: ["$total", (page * 10)] },
            then: true,
            else: false
          }
        }
      }
    }
  ])
};


export const getByContinentAndCityService = async (continent: string) => {
  const formattedContinent = capitalizeWords(continent);
  return AttractionModel.aggregate([
    {
      $match: {
        continent: formattedContinent.trim(),
      },
    },
    {
      $sort: { _id: 1 },
    },
    {
      $group: {
        _id: "$attraction.city",
        total: { $sum: 1 },
        attractions: { $first: "$$ROOT" },
      },
    },
    {
      $project: {
        city: "$_id",
        total: 1,
        continent: "$attractions.continent",
        country: "$attraction.country",
        attraction: "$attractions.attraction",
      },
    },
    {
      $limit: 30,
    },
    {
      $project: {
        continent: "$continent.name",
        country: 1,
        city: 1,
        attraction: 1,
        total: 1,
      },
    },
  ]);
};

export const getCountryThingsToDoService = async (country: string) => {
  const formattedCountry = capitalizeWords(country);
  return AttractionModel.aggregate([
    {
      $match: {
        country: formattedCountry.trim(),
      },
    },
    {
      $sort: { _id: 1 },
    },
    {
      $group: {
        _id: "$attraction.city",
        total: { $sum: 1 },
        attractions: { $first: "$$ROOT" },
      },
    },
    {
      $project: {
        city: "$_id",
        total: 1,
        continent: "$attractions.continent",
        country: "$attraction.country",
        attraction: "$attractions.attraction",
      },
    },
    {
      $limit: 30,
    },
    {
      $project: {
        continent: "$continent.name",
        country: 1,
        city: 1,
        attraction: 1,
        total: 1,
      },
    },
  ]);
};

const capitalizeWords = (str: string) => {
  let words = str?.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
  }
  return words.join(" ");
};
