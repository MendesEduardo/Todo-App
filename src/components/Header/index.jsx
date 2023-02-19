import './Header.scss';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import sun from './icon-sun.svg';
import moon from './icon-moon.svg';

function Header() {
    const {  toggleTheme, theme } = useContext(ThemeContext);
    return (
        <header className='header'>
            <h1>TO DO</h1>
            <button type='button' onClick={toggleTheme}>
                <img src={theme === 'light' ? sun : moon} alt={theme ? sun : moon}/>
            </button>
        </header>
    )
}

export default Header