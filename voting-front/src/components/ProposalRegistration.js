import React, { useState } from 'react';

function ProposalRegistration({ contract }) {
  const [description, setDescription] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState('');
  const [loading, setLoading] = useState(false);

  

  const handleRegisterProposal = async () => {
    try {
        setLoading(true);

        // Appelez la fonction du contrat pour enregistrer une proposition en utilisant send
        await contract.methods.registerProposal(description).send({ from: window.ethereum.selectedAddress });
        setRegistrationStatus(`Proposal "${description}" successfully registered.`);
        setDescription('');
    } catch (error) {
      setRegistrationStatus(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Proposal Registration</h2>
      <input
        type="text"
        placeholder="Enter Proposal Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleRegisterProposal} disabled={loading}>
        Register Proposal
      </button>
      {registrationStatus && <p>{registrationStatus}</p>}
    </div>
  );
}

export default ProposalRegistration;
