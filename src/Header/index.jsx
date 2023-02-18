import './Header.scss';

function Header({toggleThemeColor}) {
    return (
        <header className={`header`}>
            <h1>TO DO</h1>
            <button onClick={toggleThemeColor}>Mudar tema</button>
        </header>
    )
}

export default Header