import Nav from 'react-bootstrap/Nav';


const Navbar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <a href="#grandTableau">Grand tableau</a>
                </li>
                <li>
                    <a href="#tableau-max_vitesse_mean">Graphe 1</a>
                </li>
                <li>
                    <a href="#grandTableau">Grand tableau</a>
                </li>
            </ul>
        </nav>
    )
}

export { Navbar }