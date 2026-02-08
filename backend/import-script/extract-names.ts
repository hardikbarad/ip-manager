import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import * as XLSX from "xlsx";

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
async function processEmailsAndGenerateExcel() {
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
      .on("end", () => {
        try {
          console.log(`Processed ${results.length} entries`);
          
          // Display results
          console.log("\nExtracted Names:");
          console.log("Company\t\t\tName\t\tEmail");
          console.log("=".repeat(80));
          results.forEach((row) => {
            console.log(`${row.Company}\t\t${row.Name}\t\t${row.Email}`);
          });

          // Create workbook and worksheet
          const workbook = XLSX.utils.book_new();
          const worksheet = XLSX.utils.json_to_sheet(results);

          // Add worksheet to workbook
          XLSX.utils.book_append_sheet(workbook, worksheet, "Company Names");

          // Write to file
          XLSX.writeFile(workbook, OUTPUT_FILE_PATH);

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
