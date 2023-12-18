import React, { useContext, useState, useEffect } from 'react';
import UserContext from './UserContext';
// import { calculateOdds } from '../../server/misc/bettingOdds';

const ProcessVote = ({ match }) => {

  // bunch of variables ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState({});
  const [betAmountTeam1, setBetAmountTeam1] = useState(''); // need to have diff variables per team otherwise fields don't work
  const [betAmountTeam2, setBetAmountTeam2] = useState('');
  const [betAmountTeam3, setBetAmountTeam3] = useState('');
  const [betAmountTeam4, setBetAmountTeam4] = useState('');
  // using votedforteam1or2 and team3or4 for clarify, but think 
  // of these as group 1 and group 2
  const [votedForTeam1or2, setVotedForTeam1or2] = useState(false); // Track if voted for Team 1 or 2
  const [votedForTeam3or4, setVotedForTeam3or4] = useState(false); 
  let [oddsTeam1, setOddsTeam1] = useState(null);
  let [oddsTeam2, setOddsTeam2] = useState(null);
  let [oddsTeam3, setOddsTeam3] = useState(null);
  let [oddsTeam4, setOddsTeam4] = useState(null);
  //  console.log('User is logged in with username:', user.username);
  //  console.log('User has:', user.points);
  //  console.log('User group1 status vote:', user.group1BetStatus);
  // console.log('User group2 status vote:', user.group2BetStatus);
  // end ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  // console.log(user.password)
  useEffect(() => {
    console.log("grounding")
  if (user){    
    console.log("HI");
    if ( user.group1BetStatus ) {
      console.log("HI");
      setVotedForTeam1or2(true);
    }
    if ( user.group2BetStatus ) {
      setVotedForTeam3or4(true);
    }
  }

    const fetchUserData = async () => {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) { // needed to make sure it actually returned something
        try {
          const response = await fetch(`http://localhost:4000/api/users/byUsername/${storedUsername}`);
          const data = await response.json();
          if (response.ok) {
            setUserData(data);
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    fetchUserData();

    const fetchTeamSkillIndices = async () => {
      try {
        const responseTeam1 = await fetch(`http://localhost:4000/api/teams/${match.team1._id}`);
        const responseTeam2 = await fetch(`http://localhost:4000/api/teams/${match.team2._id}`);
        const responseTeam3 = await fetch(`http://localhost:4000/api/teams/${match.team3._id}`);
        const responseTeam4 = await fetch(`http://localhost:4000/api/teams/${match.team4._id}`);
        const team1Data = await responseTeam1.json();
        const team2Data = await responseTeam2.json();
        const team3Data = await responseTeam3.json();
        const team4Data = await responseTeam4.json();

        console.log('Team 3 Data:', team3Data.skillIndex); 
        console.log('Team 4 Data:', team4Data.skillIndex); 
  
  
        if (responseTeam1.ok && responseTeam2.ok && responseTeam3.ok && responseTeam4.ok) {
          let skillDifference = team1Data.skillIndex - team2Data.skillIndex;
          let maxSkillDifference = 1000; ///can't be too good otherwise it's a wrap
          // positive = first team good
          // negative = second team good
          // The probability is scaled between 0.1 and 0.9 
          let winProbabilityTeam1 = (skillDifference / maxSkillDifference) / 2;
          // winProbabilityTeam1 = Math.max(0.1, Math.min(0.9, winProbabilityTeam1)); // Ensuring it stays between 0.1 and 0.9
          let winProbabilityTeam2 = 1 - winProbabilityTeam1;
          oddsTeam1 = 1 / winProbabilityTeam1;
          oddsTeam2 = 1 / winProbabilityTeam2;
          setOddsTeam1(oddsTeam1);
          setOddsTeam2(oddsTeam2);
          console.log("ods for our first", oddsTeam1, oddsTeam2)
          // ----------------------------------------------------------------
          //calculateOdds is not working with team3 and team4, do it here...
           skillDifference = team3Data.skillIndex - team4Data.skillIndex;
           maxSkillDifference = 1000; ///can't be too good otherwise it's a wrap
          // positive = first team good
          // negative = second team good
          // The probability is scaled between 0.1 and 0.9 
          let winProbabilityTeam3 = (skillDifference / maxSkillDifference) / 2;
          // winProbabilityTeam1 = Math.max(0.1, Math.min(0.9, winProbabilityTeam1)); // Ensuring it stays between 0.1 and 0.9
          let winProbabilityTeam4 = 1 - winProbabilityTeam3;
          oddsTeam3 = 1 / winProbabilityTeam3;
          oddsTeam4 = 1 / winProbabilityTeam4;
          setOddsTeam3(oddsTeam3);
          setOddsTeam4(oddsTeam4);
          console.log("in here!", oddsTeam3, oddsTeam4);
          // ----------------------------------------------------------------
        }
      } catch (error) {
        console.error('Error fetching team skill indices:', error);
      }
    };
  
    fetchTeamSkillIndices();
  }, [user, match.team1._id, match.team2._id, match.team3._id, match.team4._id]);


  // the actual stuff, 
  const handleVote = async (teamId, betAmount, betGroup) => {
    if (!user) {
      console.log('User must be logged in to vote.');
      return;
    }

   
    try {
      // Check if the user has already voted in this group to prevent updating the bet
      if (Number(betAmount) > user.points) {
        console.error('Bet amount exceeds your available points.');
        return;
      }

      // Update the bet on the team
      const betResponse = await fetch(`http://localhost:4000/api/teams/team/${teamId}/bet`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ betAmount: Number(betAmount) }),
      });

      if (!betResponse.ok) {
          const betData = await betResponse.json();
          console.error('Failed to update bet:', betData.message);
          return;
      }

      // put in userBets collection
      const userBetResponse = await fetch(`http://localhost:4000/api/userBets/place`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              userId: userData._id, 
              teamId, 
              betAmount, 
              betGroup
          }),
      });

      if (!userBetResponse.ok) {
          const userBetData = await userBetResponse.json();
          console.error('Failed to place user bet:', userBetData.message);
          return;
      }
  
      const newPointValue = user.points - Number(betAmount);

      const updatedBetInfo = {
        [`group${betGroup}BetStatus`]: true,
        [`group${betGroup}BetAmount`]: betAmount,
        ['points'] : newPointValue
      };

      const userUpdateResponse = await fetch(`http://localhost:4000/api/users/${userData._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBetInfo),
      });

      if (!userUpdateResponse.ok) {
        console.error('Failed to update user bet status and amount');
        return;
      }

    } catch (error) {
      console.error('Error submitting vote:', error);
    }
  };
  // -----------------------------------------------------------




  return (
    <div className="main-container mt-5">
      {user ? (
        <>
      <h1 className="text-center my-8 font-bold text-2xl">Place your Prediction</h1>
      <div className="voteContainer flex justify-between mr-80 ml-80">
        {/* Prediciton Vote 1*/}
        <div className="matchListOne text-center">
          <div className = "font-bold text-lg">{match.team1.teamName}</div>
          <form 
            onSubmit={(e) => {
              e.preventDefault(); // do not refresh the page
              handleVote(match.team1._id, betAmountTeam1, 1); // 
            }}
          > 
            <input
              className = "mt-2 border rounded p-2 text-center"
              type="text"
              value={betAmountTeam1} // user types in a value to pet
              onChange={(e) => setBetAmountTeam1(e.target.value)} // set the bet amount for team 1
              disabled={votedForTeam1or2} // voted so disable
            />
            <button type="submit" className = "mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors" disabled={votedForTeam1or2}>Vote</button>
          </form>
          {/* Team 2 */}
          <div className = "font-bold text-lg mt-5">{match.team2.teamName}</div>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleVote(match.team2._id, betAmountTeam2, 1);
            }}
          > 
            <input
              className = "mt-2 border rounded p-2 text-center"
              type="text"
              value={betAmountTeam2}
              onChange={(e) => setBetAmountTeam2(e.target.value)}
              disabled={votedForTeam1or2}
            />
            <button type="submit" className = "mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors" disabled={votedForTeam1or2}>Vote</button>
          </form>
        </div>
        {/* TODO:
            replicate above logic
            adjust variable names
            that's it
            do not overthink it 
         */}
        {/* Prediction Group2 */}
        <div className="matchListOne text-center">
         {/* Team 3 */}
          <div className = "font-bold text-lg ">{match.team3.teamName}</div>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleVote(match.team3._id, betAmountTeam3, 2);
            }}
          > 
            <input
              className = "mt-2 border rounded p-2 text-center"
              type="text"
              value={betAmountTeam3}
              onChange={(e) => setBetAmountTeam3(e.target.value)}
              disabled={votedForTeam3or4}
            />
            <button type="submit" className = "mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors" disabled={votedForTeam3or4}>Vote</button>
          </form>
        {/* Team 4 */}
          <div className = "font-bold text-lg mt-5">{match.team4.teamName}</div>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleVote(match.team4._id, betAmountTeam4, 2);
            }}
          > 
            <input
              className = "mt-2 border rounded p-2 text-center"
              type="text"
              value={betAmountTeam4}
              onChange={(e) => setBetAmountTeam4(e.target.value)}
              disabled={votedForTeam3or4}
            />
            <button type="submit" className = "mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors" disabled={votedForTeam3or4}>Vote</button> 

          </form>
        </div>

       
      </div> 
     </>
     ) :(
        <div className = "text-center"> Log in to vote </div>
      )} 
    </div>
  );
};

export default ProcessVote;