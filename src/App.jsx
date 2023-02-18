import { useState } from 'react';
import CardTasks from './CardTasks';
import Container from './Container';
import Header from './Header';
import './styles/index.scss';

function App() {
  const [themeColor, setThemeColor] = useState('light');

  const toggleThemeColor = () => {
    setThemeColor(themeColor === 'light' ? 'dark' : 'light');
  };
  return (

      <main className={`${themeColor}`}>
        <Container>
          <Header toggleThemeColor={toggleThemeColor} themeColor={themeColor}/>
          <CardTasks />
        </Container>
      </main>

  );
}

export default App;
