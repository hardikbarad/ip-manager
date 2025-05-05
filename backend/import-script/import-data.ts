import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import csvParser from "csv-parser";
import dotenv from "dotenv";
import CMDB from "../src/models/cmdb.model";
import { ICMDB } from "../src/types/cmdb.types";

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "";

const CSV_FILE_PATH = path.resolve(
  process.cwd(),
  "import-script/cmdb_202410242352.csv"
);

console.log("Looking for CSV at:", CSV_FILE_PATH);

// Function to parse the threatDetails string into an array
function parseThreatDetails(threatDetails: string): string[] {
  if (!threatDetails) return [];

  try {
    // Try to parse as JSON if it looks like JSON
    if (threatDetails.startsWith("[") && threatDetails.endsWith("]")) {
      return JSON.parse(threatDetails);
    }

    // Otherwise, split by comma
    return threatDetails.split(",").map((item) => item.trim());
  } catch (error) {
    console.error("Error parsing threat details:", error);
    return [threatDetails];
  }
}

// Function to import CSV data into MongoDB
async function importData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB successfully");

    // Check if CSV file exists
    if (!fs.existsSync(CSV_FILE_PATH)) {
      console.error(`CSV file not found at: ${CSV_FILE_PATH}`);
      process.exit(1);
    }

    console.log(`Importing data from: ${CSV_FILE_PATH}`);

    // Clear existing data (optional - remove this if you want to keep existing data)
    await CMDB.deleteMany({});
    console.log("Cleared existing data");

    const results: ICMDB[] = [];
    let count = 0;

    // Process CSV file
    fs.createReadStream(CSV_FILE_PATH)
      .pipe(csvParser())
      .on("data", (data: any) => {
        // Process each row
        const entry: ICMDB = {
          addressIP: data.addressIP,
          addressType: data.addressType,
          organization: data.organization,
          country: data.country,
          countryCode: data.countryCode,
          continentCode: data.continentCode,
          usageType: data.usageType,
          threatLevel: data.threatLevel,
          threatDetails: parseThreatDetails(data.threatDetails),
          firstSeen: data.firstSeen ? new Date(data.firstSeen) : undefined,
          lastSeen: data.lastSeen ? new Date(data.lastSeen) : undefined
        };

        results.push(entry);
        count++;

        // Log progress
        if (count % 1000 === 0) {
          console.log(`Processed ${count} entries`);
        }
      })
      .on("end", async () => {
        try {
          // Insert all entries into MongoDB
          console.log(`Importing ${results.length} entries into MongoDB...`);

          // Insert in batches to avoid memory issues with large datasets
          const BATCH_SIZE = 1000;
          for (let i = 0; i < results.length; i += BATCH_SIZE) {
            const batch = results.slice(i, i + BATCH_SIZE);
            await CMDB.insertMany(batch, { ordered: false });
            console.log(
              `Imported batch ${i / BATCH_SIZE + 1} (${i} - ${
                i + batch.length
              })`
            );
          }

          console.log(`Successfully imported ${results.length} entries`);
          process.exit(0);
        } catch (error) {
          console.error("Error importing data:", error);
          process.exit(1);
        }
      })
      .on("error", (error) => {
        console.error("Error processing CSV:", error);
        process.exit(1);
      });
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

// Run the import function
importData();
