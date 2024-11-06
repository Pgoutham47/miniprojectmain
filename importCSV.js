const fs = require('fs');
const mongoose = require('mongoose');
const csv = require('csv-parser');
const College = require("C:\\Users\\varun\\OneDrive\\Desktop\\Newmini\\college.js");

mongoose.connect('mongodb://localhost:27017/college-rankings', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  importData();
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const importData = () => {
  const results = [];

  fs.createReadStream("C:\\Users\\varun\\OneDrive\\Desktop\\Newmini\\TSEAMCET_2023_FINALPHASE.csv")
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        await College.deleteMany({});
        console.log('Existing data cleared');

        for (const item of results) {
          const parseValue = (field) => {
            return field && typeof field === 'string' ? parseFloat(field.trim()) || null : null;
          };

          const collegeData = {
            name: item['Institute Name'] || null,
            ocB: parseValue(item["OCB"]),
            ocG: parseValue(item['OCG']),
            bcaB: parseValue(item['BC_AB']),
            bcaG: parseValue(item['BC_AG']),
            bcbB: parseValue(item['BC_BB']),
            bcbG: parseValue(item['BC_BG']),
            bccB: parseValue(item['BC_CB']),
            bccG: parseValue(item['BC_CG']),
            bcdB: parseValue(item['BC_DB']),
            bcdG: parseValue(item['BC_DG']),
            bceB: parseValue(item['BC_EB']),
            bceG: parseValue(item['BC_EG']),
            scB: parseValue(item['SCB']),
            scG: parseValue(item['SCG']),
            stB: parseValue(item['STB']),
            stG: parseValue(item['STG']),
            egoB: parseValue(item['EWSGO']),
            egoG: parseValue(item['EWSG']),
            branch: item['Branch Name'] || null,
          };

          console.log('Importing:', collegeData);

          const college = new College(collegeData);
          await college.save();
        }

        console.log('Data imported successfully');
      } catch (error) {
        console.error('Error importing data:', error);
      } finally {
        mongoose.connection.close();
      }
    });
};
