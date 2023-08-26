import { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import {
  Typography,
  styled,
  Box,
  Grid,
  Container,
  Paper,
  Button,
} from '@mui/material';
import Balance from './Balance';
import ExpenseCard from './ExpenseCard';
import NewTransaction from './NewTransaction';
import Transactions from './Transactions';


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
      
    useEffect(() => {
        fetchTransactions();
      }, []);

      async function fetchTransactions() {
        try {
          const userId = localStorage.getItem('user');
          const response = await axios.get(`http://localhost:8082/expenses/${userId}`);
          
          if (response.status === 200) {
            console.log('incoming transactions: ',response.data)
            setTransactions(response.data);
          }
        } catch (error) {
          console.error('Error fetching transactions:', error);
        }
      }
      const addTransaction = (newTransaction) => {
        setTransactions([...transactions, newTransaction]);
      };

      const handleLogout = () => {
        // Assuming you want to clear the user data from localStorage and navigate to a login page
        localStorage.removeItem('user'); // Clear user data from localStorage
        window.location.href=('http://localhost:3000'); // Navigate to the login page
      };
      
      const handleDeleteTransaction = async(transactionId) => {

        await axios.delete(`http://localhost:8082/expenses/${transactionId}`)
        .then(response=>{
            console.log('delete response: ',response)
        const updatedTransactions = transactions.filter(transaction => transaction.id !== transactionId);
        setTransactions(updatedTransactions);
        alert(response.data.message)
        })
      };
      
  return (
    <MainContainer>
      <Grid container spacing={2}>
        <Grid item xs={12}>            
          <CenteredContent>
            <Header>Expense Tracker</Header>
            <Button
              variant="outlined"
              style={{ marginLeft: 'auto' }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </CenteredContent>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <ExpenseCard />
            <NewTransaction addTransaction={addTransaction} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Transactions transactions={transactions} onDelete={handleDeleteTransaction}  />
          </Paper>
        </Grid>
      </Grid>
    </MainContainer>
  );
}

export default Dashboard;
