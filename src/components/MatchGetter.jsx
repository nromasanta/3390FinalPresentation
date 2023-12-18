import React from 'react';

const MatchGetter = ({ dailymatches }) => {
    
  //console.log(matches[0])
    if (!dailymatches) {
        // Handle the case when matches is null (e.g., loading or no data)
        return <div>Loading matches...</div>;
      }

  return (
    

<div></div>

  );
}

export default MatchGetter;