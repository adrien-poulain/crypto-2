import React, { useState, useEffect } from 'react';

function Results({ contract }) {
  const [winningProposal, setWinningProposal] = useState('');
  const [resultsStatus, setResultsStatus] = useState('');

  const getWinner = async () => {
    try {
      const winnerId = await contract.getWinner();
      setWinningProposal(`Winning Proposal: ${winningProposal.description}`);
    } catch (error) {
      setResultsStatus(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    // Récupérez le gagnant lors de l'initialisation du composant
    getWinner();
  }, []);

  return (
    <div>
      <h2>Results</h2>
      <p>{winningProposal}</p>
      {resultsStatus && <p>{resultsStatus}</p>}
    </div>
  );
}

export default Results;
