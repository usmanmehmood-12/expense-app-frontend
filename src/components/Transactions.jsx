import React from "react";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  styled,
} from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const StyledBox = styled(Box)`
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const TransactionItem = styled(ListItem)`
  display: flex;
  justify-content: space-between;
`;

const Income = styled(ListItemText)`
  color: #0eaf52;
  font-weight: bold;
`;

const Expense = styled(ListItemText)`
  color: #e74c3c;
  font-weight: bold;
`;

const Transactions = ({ transactions, onDelete, onEdit }) => {
  return (
    <StyledBox>
      <Typography variant="h5">Transaction History</Typography>
      <Divider />
      <List>
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id}>
            <ListItemText
              primary={transaction.description}
              secondary={transaction.amount < 0 ? "Expense" : "Income"}
            />
            {transaction.amount < 0 ? (
              <Expense>{`$${Math.abs(transaction.amount)}`}</Expense>
            ) : (
              <Income>{`$${transaction.amount}`}</Income>
            )}
            <IconButton onClick={() => onDelete(transaction.id)}>
              <DeleteOutlinedIcon />
            </IconButton>

            <IconButton onClick={() => onEdit(transaction)}>
              <EditOutlinedIcon />
            </IconButton>
          </TransactionItem>
        ))}
      </List>
    </StyledBox>
  );
};

export default Transactions;
