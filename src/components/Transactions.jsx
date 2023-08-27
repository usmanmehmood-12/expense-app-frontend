import React from "react";
import {
  Box,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  styled,
} from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useState } from "react";

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
  console.log(transactions);

  const [sortCriteria, setSortCriteria] = useState("updatedAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const handleSort = (criteria) => {
    if (sortCriteria === criteria) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortCriteria(criteria);
      setSortOrder("asc");
    }
  };

  const sortedTransactions = transactions.slice().sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortCriteria] > b[sortCriteria] ? 1 : -1;
    } else {
      return a[sortCriteria] < b[sortCriteria] ? 1 : -1;
    }
  });

  return (
    <StyledBox>
      <Typography variant="h5">Transaction History</Typography>
      <Divider />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={sortCriteria === "description"}
                direction={sortCriteria === "description" ? sortOrder : "asc"}
                onClick={() => handleSort("description")}
              >
                Description
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={sortCriteria === "amount"}
                direction={sortCriteria === "amount" ? sortOrder : "asc"}
                onClick={() => handleSort("amount")}
              >
                Amount
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={sortCriteria === "updatedAt"}
                direction={sortCriteria === "updatedAt" ? sortOrder : "asc"}
                onClick={() => handleSort("updatedAt")}
              >
                Updated At
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody xs={12}>
          {sortedTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.description}</TableCell>
              <TableCell align="right">
                {transaction.amount < 0 ? (
                  <Expense>{`$${Math.abs(transaction.amount)}`}</Expense>
                ) : (
                  <Income>{`$${transaction.amount}`}</Income>
                )}
              </TableCell>
              <TableCell align="right">
                {transaction?.updatedAt?.split("T")[0]}
              </TableCell>
              <TableCell align="right">
                <IconButton onClick={() => onDelete(transaction.id)}>
                  <DeleteOutlinedIcon />
                </IconButton>
                <IconButton onClick={() => onEdit(transaction)}>
                  <EditOutlinedIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledBox>
  );
};

export default Transactions;
