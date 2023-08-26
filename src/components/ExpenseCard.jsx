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

// const IncomeAmount = styled(Typography)`
//   color: #0eaf52;
//   font-size: 24px;
//   font-weight: bold;
// `;

const ExpenseAmount = styled(Typography)`
  color: #e74c3c;
  font-size: 24px;
  font-weight: bold;
`;

const ExpenseCard = () => {
  return (
    <Container>
      {/* <StyledCard>
        <CardHeader>
          <Typography variant="subtitle1" color="textSecondary">
            Income
          </Typography>
          <IncomeAmount>$25</IncomeAmount>
        </CardHeader>
      </StyledCard> */}
      <StyledCard>
        <CardHeader>
          <Typography variant="subtitle1" color="textSecondary">
            Total Expenses
          </Typography>
          <ExpenseAmount>$15</ExpenseAmount>
        </CardHeader>
      </StyledCard>
    </Container>
  );
};

export default ExpenseCard;
