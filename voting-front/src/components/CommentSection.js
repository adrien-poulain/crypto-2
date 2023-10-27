import React, { useState, useEffect } from 'react';

function CommentSection({ contract }) {
  const [proposals, setProposals] = useState([]);
  const [selectedProposal, setSelectedProposal] = useState(-1);
  const [comment, setComment] = useState('');
  const [commentStatus, setCommentStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const updateProposals = async () => {
    if (contract) {
        const proposalCount = await contract.methods.proposalsCount();
        const proposalList = [];
        for (let i = 0; i < proposalCount; i++) {
        const proposal = await contract.proposals(i);
        proposalList.push(proposal.description);
        }
        setProposals(proposalList);
    }
  };

  useEffect(() => {
    // Mettez à jour la liste des propositions à l'initialisation du composant
    updateProposals();
  }, [contract]);

  const handleAddComment = async () => {
    try {
      setLoading(true);
      // Vérifiez si une proposition a été sélectionnée
      if (selectedProposal === -1) {
        setCommentStatus('Select a proposal to add a comment.');
        return;
      }
      // Appelez la fonction du contrat pour ajouter un commentaire
      await contract.addComment(selectedProposal, comment);
      setCommentStatus('Comment added successfully.');
      setComment('');
    } catch (error) {
      setCommentStatus(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add Comment</h2>
      <select
        onChange={(e) => setSelectedProposal(e.target.value)}
        value={selectedProposal}
      >
        <option value={-1} disabled>Select a proposal</option>
        {proposals.map((proposal, index) => (
          <option key={index} value={index}>{proposal}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Enter Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={handleAddComment} disabled={loading}>
        Add Comment
      </button>
      {commentStatus && <p>{commentStatus}</p>}
    </div>
  );
}

export default CommentSection;
