import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography, styled } from "@mui/material";
import axios from "axios";

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

const NewTransaction = ({
  addTransaction,
  selectedTransaction,
  isEditing,
  setIsEditing,
  editTransaction,
}) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = async () => {
    if (description.trim() === "" || amount.trim() === "") {
      setErrorMessage("Please fill in both description and amount.");
      return; // Exit the function if either field is empty
    }
    const transactionData = {
      description: description,
      amount: amount,
    };

    try {
      const userId = localStorage.getItem("user");
      const response = await axios.post(
        `http://localhost:8082/expenses/${userId}`,
        transactionData
      );

      if (response.status === 201) {

        addTransaction({
          id: response.data.id,
          description: description,
          amount: parseFloat(amount),
          updatedAt:response.data.updatedAt
        });

        setDescription("");
        setAmount("");
      } else {
        // Handle errors, show an error message or perform appropriate action
      }
    } catch (error) {

      // Handle error, show an error message or perform appropriate action
    }
  };

  const handleEditSubmit = async () => {

    if (description.trim() === "" || amount.trim() === "") {
      setErrorMessage("Please fill in both description and amount.");
      return;
    }

    const updatedTransaction = {
      description: description,
      amount: amount,
    };

    try {
      const response = await axios.put(
        `http://localhost:8082/expenses/${selectedTransaction.id}`,
        updatedTransaction
      );
      
      if (response.status === 200) {
        // Update the transaction in the state
        // Reset form fields and exit edit mode
        setIsEditing(false);
        const editedTransactionData = {
          id: response.data.id,
          description: description,
          amount: amount,
          updatedAt:response.data.updatedAt
        };

        editTransaction(editedTransactionData);
      } else {
        // Handle errors
      }
    } catch (error) {
      // Handle error
    }
  };
  useEffect(() => {
    if (isEditing && selectedTransaction) {
      setDescription(selectedTransaction.description);
      setAmount(selectedTransaction.amount);
    } else {
      setDescription("");
      setAmount("");
    }
  }, [isEditing, selectedTransaction]);

  return (
    <Container>
      <Typography variant="h5">
        {isEditing ? "Edit Expense" : "Add Expense"}
      </Typography>
      <StyledTextField
        label="Enter expense description"
        variant="outlined"
        value={description}
        onChange={handleDescriptionChange}
      />
      <StyledTextField
        label="Enter amount"
        variant="outlined"
        value={amount}
        onChange={handleAmountChange}
      />
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

      <AddButton
        variant="contained"
        onClick={isEditing ? handleEditSubmit : handleSubmit}
      >
        {isEditing ? "Edit Expense" : "Add Expense"}
      </AddButton>
      {isEditing && (
        <Button variant="outlined" onClick={() => setIsEditing(false)}>
          Cancel Edit
        </Button>
      )}
    </Container>
  );
};

export default NewTransaction;
