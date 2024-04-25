import { NavLink } from 'react-router-dom';
import logoImg from '../assets/pet-logo.jpg'
import Button from '../ui/Button';

function MainNavigation() {
    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="A Dog Catalog"></img>
                <h4> Pet Catalog</h4>
            </div>
            <nav>
                <ul className="pet-list">
                    <li>
                        <NavLink to="/" className={({ isActive }) => {
                            return (isActive ? "active" : undefined)
                        }} end>
                            <Button textOnly type="button">Admin</Button>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/pets" className={({ isActive }) => {
                            return (isActive ? "active" : undefined)
                        }}>
                            <Button textOnly type="button">Pets</Button>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;
