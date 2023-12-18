const DailyMatches = require('../models/dailyMatchModel');

const resetMatches = async () => {
  try {
    await DailyMatches.deleteMany({});
    console.log('All daily matches have been cleared.');
  } catch (error) {
    console.error('Error clearing daily matches:', error);
  }
};

module.exports = resetMatches;