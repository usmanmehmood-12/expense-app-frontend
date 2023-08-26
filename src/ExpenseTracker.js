import {
  styled,
  Container,
} from '@mui/material';
import SignInSide from './components/SignIn';


const MainContainer = styled(Container)`
  background-color: #f3f5f7;
  padding-top: 40px;
  padding-bottom: 40px;
`;

function App() {

  return (
    <MainContainer>
      <SignInSide/>
    </MainContainer>
  );
}

export default App;
