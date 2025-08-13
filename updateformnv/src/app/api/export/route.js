import dbConnect from "@/utils/dbconnect";
import {Form }from "@/models/form.model";
import { Parser } from "json2csv";
import ExcelJS from "exceljs";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const format = searchParams.get("format");

  try {
    const forms = await Form.find().lean();

    if (format === "csv") {
      const fields = ["name", "number", "email", "address", "aadhar", "pass", "year"];
      const parser = new Parser({ fields });
      const csv = parser.parse(forms);
      
      return new NextResponse(csv, {
        status: 200,
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": 'attachment; filename="forms.csv"',
        },
      });
    } else if (format === "xlsx") {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Forms");
      worksheet.columns = [
        { header: "Name", key: "name", width: 20 },
        { header: "Number", key: "number", width: 15 },
        { header: "Email", key: "email", width: 25 },
        { header: "Address", key: "address", width: 30 },
        { header: "Aadhar", key: "aadhar", width: 20 },
        { header: "Pass", key: "pass", width: 15 },
        { header: "Year", key: "year", width: 10 },
      ];

      forms.forEach((form) => {
        worksheet.addRow(form);
      });

      const buffer = await workbook.xlsx.writeBuffer();
      return new NextResponse(buffer, {
        status: 200,
        headers: {
          "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "Content-Disposition": 'attachment; filename="forms.xlsx"',
        },
      });
    } else {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Invalid format" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Error exporting forms:", error);
    return new NextResponse(
      JSON.stringify({ success: false, message: "Export failed" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
