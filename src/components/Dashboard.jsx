import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import {
  Typography,
  styled,
  Box,
  Grid,
  Container,
  Paper,
  Button,
} from "@mui/material";
import ExpenseCard from "./ExpenseCard";
import NewTransaction from "./NewTransaction";
import Transactions from "./Transactions";

const MainContainer = styled(Container)`
  background-color: #f3f5f7;
  padding-top: 40px;
  padding-bottom: 40px;
`;

const CenteredContent = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled(Typography)`
  font-size: 36px;
  color: #1976d2;
  text-transform: uppercase;
  font-weight: bold;
`;

function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    try {
      const userId = localStorage.getItem("user");
      const response = await axios.get(
        `http://localhost:8082/expenses/${userId}`
      );

      if (response.status === 200) {
        setTransactions(response.data);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }
  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  const handleLogout = () => {
    // clear the user data from localStorage and navigate to a login page
    localStorage.removeItem("user"); 
    window.location.href = "http://localhost:3000"; // Navigate to the login page
  };

  const handleDeleteTransaction = async (transactionId) => {

    await axios
      .delete(`http://localhost:8082/expenses/${transactionId}`)
      .then((response) => {
        const updatedTransactions = transactions.filter(
          (transaction) => transaction.id !== transactionId
        );
        setTransactions(updatedTransactions);
        alert(response.data.message);
      });
  };

  const handleEditTransaction = async (transaction) => {

    setSelectedTransaction(transaction);
    setIsEditing(true);
  };

  const editTransaction = (editedTransaction) => {
    const updatedTransactions = transactions.map((transaction) => {
      if (transaction.id === editedTransaction.id) {
        return editedTransaction;
      }
      return transaction;
    });

    setTransactions(updatedTransactions);
  };

  return (
    <MainContainer>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CenteredContent>
            <Header>Expense Tracker</Header>
            <Button
              variant="outlined"
              style={{ marginLeft: "auto" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </CenteredContent>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <ExpenseCard transactions={transactions}/>
            <NewTransaction
              addTransaction={addTransaction}
              selectedTransaction={selectedTransaction}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              editTransaction={editTransaction}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Transactions
              transactions={transactions}
              onDelete={handleDeleteTransaction}
              onEdit={handleEditTransaction}
            />
          </Paper>
        </Grid>
      </Grid>
    </MainContainer>
  );
}

export default Dashboard;
