import React, { useState, useEffect } from 'react';

function VotingSession({ contract }) {
  const [proposals, setProposals] = useState([]);
  const [selectedProposal, setSelectedProposal] = useState(-1);
  const [votingStatus, setVotingStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const updateProposals = async () => {
    if (contract) {
        try {
            const proposalsCount = await contract.methods.proposalsCount().call();
            const proposalDescriptions = [];
            console.log(proposalsCount)
    
            for (let i = 0; i < proposalsCount; i++) {
              const proposal = await contract.methods.proposals(i).call();
              proposalDescriptions.push(proposal.description);
            }
    
            setProposals(proposalDescriptions);
          } catch (error) {
            console.error('Error fetching proposals:', error);
          }
    }
  };

  useEffect(() => {
    // Mettez à jour la liste des propositions à l'initialisation du composant
    updateProposals();
  }, [contract]);

  const handleVote = async () => {
    try {
      setLoading(true);
      // Vérifiez si une proposition a été sélectionnée
      if (selectedProposal === -1) {
        setVotingStatus('Select a proposal to vote.');
        return;
      }
      // Appelez la fonction du contrat pour voter
      await contract.vote(selectedProposal);
      setVotingStatus(`Vote for "${proposals[selectedProposal]}" submitted.`);
    } catch (error) {
      setVotingStatus(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Voting Session</h2>
      <select
        onChange={(e) => setSelectedProposal(e.target.value)}
        value={selectedProposal}
      >
        <option value={-1} disabled>Select a proposal</option>
        {proposals.map((proposal, index) => (
          <option key={index} value={index}>{proposal}</option>
        ))}
      </select>
      <button onClick={handleVote} disabled={loading}>
        Vote
      </button>
      {votingStatus && <p>{votingStatus}</p>}
    </div>
  );
}

export default VotingSession;
