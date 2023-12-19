const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const userRoutes = require('./routes/users')
const leagueRoutes = require('./routes/leagues')
const teamRoutes = require('./routes/teams')
const dailyMatchRoutes = require('./routes/dailyMatch')
const userBetsRoutes = require('./routes/userBets');
const cron = require('node-cron');
const { selectRandomTeams, createDailyMatch } = require('./misc/matchCreator');
const schedule = require('node-schedule')
const determineOutcome = require('./misc/determineOutcome')
const resetUserBets = require('./misc/resetBets');
const resetMatches = require('./misc/resetMatches')
const updateMassive = require('./misc/updateMassive');
// NOTE:
// IT IS MATCH NOT GAME
// STOP USING GAME

// creating express app
const app = express()


//middleware
app.use(express.json())
app.use(cors())


// -------- scheduled tasks ---------

// set the schedule 
// use (0 0 * * *) for this to run only on the daily\
// use (0 * * * *) for this to run hourly
// use (* * * * *) to run on the minute, good for testing <--------------- USED THIS FOR THE DEMO
// but make sure to set it to daily for deployment


cron.schedule('0 0 * * *', async () => {
    console.log('Start of day detected, running task to genereate game and reset user bets');
    // await updateMassive();
    await determineOutcome();
    // need to add function to purge anything inside the matches and userbets collection
    await resetMatches();
    await resetUserBets();
    const randomTeams = await selectRandomTeams(); 
    await createDailyMatch(randomTeams); // this function will create two names despite it's singular name
                                        // this function was a pain to make so im not even gonna touch it

});

// cron.schedule('* * * * *', async () => {
//   determineOutcome();
 
// });

// run before end of day
// hour 7pm = 19 

// run before end of day
// more specific time method
const j = schedule.scheduleJob({hour: 23, minute:59}, () => {
   console.log("Running outcome calculations");
   determineOutcome();
});



// this was good for logging movement between the routes and the db
// app.use((req, res, next) => {
//   console.log(req.path, req.method)
//   next()
// })


//routes
app.use('/api/users', userRoutes)
app.use('/api/leagues', leagueRoutes)
app.use('/api/teams', teamRoutes)
app.use('/api/dailyMatches', dailyMatchRoutes)
app.use('/api/userbets', userBetsRoutes);
//connecting to db
mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    //listening
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB & Listening on port", process.env.PORT)
    })    
  })
  .catch((error) => {
    console.log(error)
  })

