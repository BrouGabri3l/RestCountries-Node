import Router from "express";
import { getCountriesExcel } from "../controllers/CountryController";
const countryRouter = Router();

countryRouter.get("/countries", getCountriesExcel);

export default countryRouter;
