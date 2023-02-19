import CardTasks from './components/CardTasks';
import Container from './components/Container';
import Header from './components/Header';
import './styles/index.scss';
import ThemeProvider from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <main>
        <Container>
          <Header />
          <CardTasks />
        </Container>
      </main>
    </ThemeProvider>
  );
}

export default App;
