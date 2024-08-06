import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export async function GET(req: NextRequest) {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const spreadsheetId = process.env.SPREADSHEET_ID;

  if (!clientEmail || !privateKey || !spreadsheetId) {
    console.error("Missing environment variables");
    return NextResponse.json(
      { error: "Missing environment variables" },
      { status: 500 }
    );
  }

  // console.log("Environment Variables:", {
  //   clientEmail,
  //   privateKey: privateKey ? "PRIVATE_KEY_PRESENT" : "MISSING_PRIVATE_KEY",
  //   spreadsheetId,
  // });

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const range = "シート1!A1:I186"; // 取得したい範囲を指定

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    if (rows && rows.length) {
      // 最初の行（ヘッダー行）を除外
      const dataWithoutHeader = rows.slice(1);
      //console.log("API Response Data:", dataWithoutHeader);
      return NextResponse.json(dataWithoutHeader, { status: 200 });
    } else {
      //console.log("No data or empty rows");
      return NextResponse.json([], { status: 200 });
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Error fetching data from Google Sheets:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
