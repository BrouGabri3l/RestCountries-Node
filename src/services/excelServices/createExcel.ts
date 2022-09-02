import Excel, { Alignment, Font, Style } from "exceljs";
import getCountries from "../CountryServices/getCountryService";
import { Country } from "../../models/countryType";
import { logger } from "../../logger/logger";

interface IStyle {
  font: Partial<Font>;
  alignment: Partial<Alignment>;
}

const columnStyle: IStyle = {
  font: {
    bold: true,
    size: 12,
    color: { argb: "808080" },
  },
  alignment: { horizontal: "center" },
};

const titleStyle: IStyle = {
  font: {
    color: { argb: "4F4F4F" },
    bold: true,
    size: 16,
  },
  alignment: { horizontal: "center" },
};

const columnsValues = [
  {
    header: "Name",
    key: "name",
    width: 30,
  },
  { header: "Capital", key: "capital", width: 20 },
  {
    header: "Area",
    key: "area",
    width: 15,
    style: { numFmt: "#,##0.00" },
  },
  { header: "Currencies", key: "currencies", width: 13 },
];

export const createExcel = async (data: any[]) => {
  logger.info("Creating Excel");
  const path = process.env.EXCEL_PATH;
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("Countries List");

  worksheet.columns = columnsValues;

  worksheet.spliceRows(1, 0, Array("Countries List"));
  worksheet.mergeCells("A1", "D1");
  const columns = worksheet.getRow(2);
  const title = worksheet.getCell("A1");

  if (data) {
    data.forEach((country) => {
      worksheet.addRow(country);
    });
  }

  for (let index = 2; index <= worksheet.columnCount; index++) {
    worksheet.getColumn(index).eachCell((cell) => {
      if (typeof cell.value == "object") cell.value = "-";
    });
  }

  title.style = titleStyle;

  columns.font = columnStyle.font;
  columns.alignment = columnStyle.alignment;
  await workbook.xlsx.writeFile(path ?? "");
};
