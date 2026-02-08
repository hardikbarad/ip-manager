import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import ExcelJS from "exceljs";

const CSV_FILE_PATH = path.resolve(
  process.cwd(),
  "import-script/company-emails.csv"
);

const OUTPUT_FILE_PATH = path.resolve(
  process.cwd(),
  "import-script/company-names-output.xlsx"
);

console.log("Reading CSV from:", CSV_FILE_PATH);

interface CompanyEmail {
  Company: string;
  Email: string;
}

interface CompanyWithName {
  Company: string;
  Name: string;
  Email: string;
}

// Function to extract first name from email
function extractFirstName(email: string): string {
  // Get the part before @
  const localPart = email.split("@")[0];
  
  // Remove numbers and special characters, split by dot or underscore
  const nameParts = localPart.split(/[._]/);
  
  // Get the first part
  let firstName = nameParts[0];
  
  // Remove any numbers from the name
  firstName = firstName.replace(/[0-9]/g, "");
  
  // Capitalize first letter
  if (firstName.length > 0) {
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  }
  
  return firstName;
}

// Function to process CSV and generate Excel
function processEmailsAndGenerateExcel() {
  try {
    // Check if CSV file exists
    if (!fs.existsSync(CSV_FILE_PATH)) {
      console.error(`CSV file not found at: ${CSV_FILE_PATH}`);
      process.exit(1);
    }

    const results: CompanyWithName[] = [];

    // Read CSV file
    fs.createReadStream(CSV_FILE_PATH)
      .pipe(csvParser())
      .on("data", (data: CompanyEmail) => {
        const firstName = extractFirstName(data.Email);
        results.push({
          Company: data.Company,
          Name: firstName,
          Email: data.Email,
        });
      })
      .on("end", async () => {
        try {
          console.log(`Processed ${results.length} entries`);
          
          // Display results
          console.log(`\nExtracted Names:`);
          console.log(`${"Company".padEnd(25)} ${"Name".padEnd(20)} Email`);
          console.log("=".repeat(80));
          results.forEach((row) => {
            console.log(`${row.Company.padEnd(25)} ${row.Name.padEnd(20)} ${row.Email}`);
          });

          // Create workbook and worksheet using ExcelJS
          const workbook = new ExcelJS.Workbook();
          const worksheet = workbook.addWorksheet("Company Names");

          // Add header row
          worksheet.columns = [
            { header: "Company", key: "Company", width: 25 },
            { header: "Name", key: "Name", width: 20 },
            { header: "Email", key: "Email", width: 40 },
          ];

          // Add data rows
          results.forEach((row) => {
            worksheet.addRow(row);
          });

          // Style the header row
          worksheet.getRow(1).font = { bold: true };

          // Write to file
          await workbook.xlsx.writeFile(OUTPUT_FILE_PATH);

          console.log(`\nExcel file successfully created at: ${OUTPUT_FILE_PATH}`);
          process.exit(0);
        } catch (error) {
          console.error("Error generating Excel file:", error);
          process.exit(1);
        }
      })
      .on("error", (error) => {
        console.error("Error reading CSV file:", error);
        process.exit(1);
      });
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

// Run the function
processEmailsAndGenerateExcel();
