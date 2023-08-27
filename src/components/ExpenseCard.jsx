import React from "react";
import { Card, CardContent, Typography, Box, styled } from "@mui/material";

const Container = styled(Box)`
  display: flex;
  gap: 20px;
`;

const StyledCard = styled(Card)`
  flex: 1;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled(CardContent)`
  background-color: #f5f5f5;
  border-radius: 10px 10px 0 0;
  padding: 10px;
  text-align: center;
`;


const ExpenseAmount = styled(Typography)`
  color: #e74c3c;
  font-size: 24px;
  font-weight: bold;
`;

const ExpenseCard = ({transactions}) => {
  console.log('Expense transactions: ',transactions)
  
  const totalExpenses = transactions.reduce((total, transaction) => {
    return total + Math.abs(transaction.amount);
  }, 0);

  return (
    <Container>
      <StyledCard>
        <CardHeader>
          <Typography variant="subtitle1" color="textSecondary">
            Total Expenses
          </Typography>
          <ExpenseAmount>{`$${totalExpenses}`}</ExpenseAmount>
        </CardHeader>
      </StyledCard>
    </Container>
  );
};

export default ExpenseCard;
