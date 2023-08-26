import React, { useState } from 'react';
import { Box, Button, TextField, Typography, styled } from '@mui/material';
import axios from 'axios';

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);

  & > h5,
  & > div,
  & > button {
    margin-top: 20px;
    width: 100%;
  }
`;

const StyledTextField = styled(TextField)`
  width: 100%;
`;

const AddButton = styled(Button)`
  background-color: #0eaf52;
  color: #ffffff;
  &:hover {
    background-color: #0b8a3d;
  }
`;

const NewTransaction = ({ addTransaction }) => {

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = async () => {
    if (description.trim() === '' || amount.trim() === '') {
      console.log('Both description and amount are required.');
      setErrorMessage('Please fill in both description and amount.');
      return; // Exit the function if either field is empty
    }
    const transactionData = {
      description: description,
      amount: amount,
    };

    console.log('transactionData: ',transactionData)
    try {
      const userId= localStorage.getItem('user')
      const response = await axios.post(`http://localhost:8082/expenses/${userId}`
      ,transactionData
      );
      console.log('new transaction response',response)
      if (response.status===201) {
        console.log('inside new transaction 201')
        // Handle success, maybe show a success message
        addTransaction({
          id: response.data.id, // Assuming the response contains the ID of the new transaction
          description: description,
          amount: parseFloat(amount),
        });

        setDescription('');
        setAmount('');

      } else {
        // Handle errors, show an error message or perform appropriate actions
      }
    } catch (error) {
      console.error('Error submitting transaction:', error);
      // Handle error, show an error message or perform appropriate actions
    }
  };
  

  return (
    <Container>
      <Typography variant="h5">New Expense</Typography>
      <StyledTextField label="Enter expense description" variant="outlined" value={description}
        onChange={handleDescriptionChange} />
      <StyledTextField label="Enter amount" variant="outlined" value={amount}
        onChange={handleAmountChange} />
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <AddButton  variant="contained" onClick={handleSubmit}>Add Transaction</AddButton>
    </Container>
  );
};

export default NewTransaction;
