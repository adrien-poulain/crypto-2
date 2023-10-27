import React, { useState } from 'react';

function VoterRegistration({ contract }) {
  const [address, setAddress] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegisterVoter = async () => {
    try {
    setLoading(true);
    if (contract) {
        // Appelez la fonction du contrat pour enregistrer un électeur
        await contract.methods.registerVoter(address); // Remplacez yourUserAddress
        setRegistrationStatus(`Voter ${address} successfully registered.`);
    } else {
        setRegistrationStatus('Contract is not initialized.');
    }
    } catch (error) {
    setRegistrationStatus(`Error: ${error.message}`);
    } finally {
    setLoading(false);
    }
  };

  return (
    <div>
      <h2>Voter Registration</h2>
      <input
        type="text"
        placeholder="Enter Voter Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={handleRegisterVoter} disabled={loading}>
        Register Voter
      </button>
      {registrationStatus && <p>{registrationStatus}</p>}
    </div>
  );
}

export default VoterRegistration;
