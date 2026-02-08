# Email Name Extraction Tool

This tool extracts first names from email addresses and generates an Excel file with Company, Name, and Email columns.

## Input Data

The input CSV file is located at:
```
backend/import-script/company-emails.csv
```

The CSV file should have the following format:
```csv
Company,Email
KPMG,siddharthakundu@kpmg.com
EY,sapna.jayaswal@in.ey.com
...
```

## How It Works

The script:
1. Reads the CSV file containing company names and email addresses
2. Extracts the first name from each email address by:
   - Taking the part before the @ symbol
   - Splitting by dots (.) and underscores (_)
   - Taking the first part
   - Removing numbers
   - Capitalizing the first letter
3. Generates an Excel file with three columns: Company, Name, Email

## Usage

To run the name extraction tool:

```bash
cd backend
npm run extract-names
```

## Output

The output Excel file will be created at:
```
backend/import-script/company-names-output.xlsx
```

The Excel file will contain:
- **Company**: The company name
- **Name**: The extracted first name from the email
- **Email**: The complete email address

## Example Output

| Company | Name | Email |
|---------|------|-------|
| KPMG | Siddharthakundu | siddharthakundu@kpmg.com |
| EY | Sapna | sapna.jayaswal@in.ey.com |
| PwC | Abhishek | abhishek.lakhani@pwc.com |
| Deloitte | Satjha | satjha@deloitte.com |

## Dependencies

The tool uses the following npm packages:
- `csv-parser`: For reading CSV files
- `exceljs`: For generating Excel files (secure alternative to xlsx)
