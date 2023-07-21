import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import icon_strength from '../images/strength.png'

// https://react-bootstrap.netlify.app/docs/getting-started/introduction/ 
// https://react-bootstrap.netlify.app/docs/components/navbar/#action/3.4
// https://blog.logrocket.com/create-responsive-navbar-react-css/ 

const MyNavbar = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
            <Container>
                <Navbar.Brand>
                    <img src={icon_strength} width="25em"></img>
                    &nbsp;
                    Master Poussée

                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        // <Navbar className="navbar">
        //     <ul>
        //         <li>
        //             <a href="#grandTableau">Grand tableau</a>
        //         </li>
        //         <li>
        //             <a href="#tableau-max_vitesse_mean">Graphe 1</a>
        //         </li>
        //         <li>
        //             <a href="#grandTableau">Grand tableau</a>
        //         </li>
        //     </ul>
        // </Navbar>
    )
}

export { MyNavbar }