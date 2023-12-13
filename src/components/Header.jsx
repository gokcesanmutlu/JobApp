import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <h2>Jobb App</h2>
            <nav>
                <NavLink to={"/"}>Job List</NavLink>
                <NavLink to={"/add"}>Add to Job</NavLink>
            </nav>
        </header>
    )
}

export default Header