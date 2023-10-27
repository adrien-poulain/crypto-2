import React, { useState, useEffect } from 'react';
import './App.css';
import VoterRegistration from './components/VoterRegistration';
import ProposalRegistration from './components/ProposalRegistration';
import VotingSession from './components/VotingSession';
import Results from './components/Results';
import CommentSection from './components/CommentSection';
import Web3 from 'web3';
import Voting from "./artifacts/contracts/Voting.sol/Voting.json"

// Importez ici les dépendances pour Web3.js ou Ethers.js

function App() {
  const [contract, setContract] = useState(null);

  // Initialisez votre contrat ici
  useEffect(() => {
    async function initializeContract() {
      try {
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
  
          // Demandez à l'utilisateur de se connecter avec son compte MetaMask
          await window.ethereum.enable();
  
          // Obtenez l'adresse du compte connecté
          const accounts = await web3.eth.getAccounts();
          const userAddress = accounts[0];

          console.log(userAddress);
  
          // Remplacez les informations ci-dessous par les détails de votre contrat
          const contractAddress = '0x419bb13dba8cF6624847FEa91C7dadFcc96Be477';
          const contractAbi = Voting.abi; // Remplacez par l'ABI de votre contrat
  
          const contract = new web3.eth.Contract(contractAbi, contractAddress, { from: userAddress });
  
          // Mettez à jour l'état du contrat
          setContract(contract);
        } else {
          console.error('Web3 provider (e.g., MetaMask) not detected. Please install and connect.');
        }
      } catch (error) {
        console.error('Error initializing contract:', error);
      }
    }

    initializeContract();
  }, []);

  return (
    <div className="App">
      <h1>Voting DApp</h1>
      <VoterRegistration contract={contract} />
      <ProposalRegistration contract={contract} />
      <VotingSession contract={contract} />
      <Results contract={contract} />
      <CommentSection contract={contract} />
    </div>
  );
}

export default App;
