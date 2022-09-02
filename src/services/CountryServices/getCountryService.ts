import axios, { AxiosResponse } from "axios";
import { Request, Response } from "express";
import { logger } from "../../logger/logger";
import { Country, Currency } from "../../models/countryType";
const getCountries = () => {
  logger.info("Getting Countries from RestCountries");
  return axios
    .get<Country[]>(`${process.env.BASE_URI}/all`)
    .then((res) =>
      res.data.map((x) => ({
        name: x.name,
        capital: x.capital,
        area: x.area,
        currencies: x.currencies?.map((x) => x.code).toString(),
      }))
    )
    .catch((err) => {
      throw Error(err.message);
    });
};
export default getCountries;
