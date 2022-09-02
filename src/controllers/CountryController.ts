import { NextFunction } from "express";
import getCountries from "../services/CountryServices/getCountryService";
import { createExcel } from "../services/excelServices/createExcel";
import express from "express";
import path from "path";
import { logger } from "../logger/logger";

export const getCountriesExcel = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction
) => {
  try {
    const fileDir: string = path.resolve(<string>process.env.EXCEL_PATH);
    const countriesData = await getCountries();
    await createExcel(countriesData);
    logger.info("Sending File");
    return res.status(200).download(fileDir);
  } catch (err: any) {
    next(err);
  }
};
