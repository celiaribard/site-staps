import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import icon_strength from '../images/strength.png'
import { FormIdSujet } from './FormIdSujet';
import { Link } from "react-router-dom"
import { BoutonNormaliser } from './BoutonNormaliser';

// https://react-bootstrap.netlify.app/docs/getting-started/introduction/ 
// https://react-bootstrap.netlify.app/docs/components/navbar/#action/3.4
// https://blog.logrocket.com/create-responsive-navbar-react-css/ 

const MyNavbar = ({ onFormSubmit, inputId }) => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
            <Container>
                <Navbar.Brand href="#">
                    <img src={icon_strength} width="25em"></img>
                    &nbsp;
                    Master Poussée
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#tableau-toutes-donnees">Toutes les données</Nav.Link>
                        {inputId &&
                            <Nav.Link href="#tableau-mes-donnees">Mes poussées</Nav.Link>
                        }
                        <NavDropdown title="Histogrammes" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#tableau-max_puissance_max">Puissance max</NavDropdown.Item>
                            <NavDropdown.Item href="#tableau-max_force_peak_tot"> Force peak tot </NavDropdown.Item>
                            <NavDropdown.Item href="#tableau-max_vitesse_mean">Vitesse mean</NavDropdown.Item>
                            <NavDropdown.Item href="#tableau-min_temps_force_max">Temps force max</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item >
                                <input
                                    type="checkbox"
                                    id="test"
                                >
                                </input>
                                <label htmlFor="test"> Normaliser les données</label>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <FormIdSujet onFormSubmit={onFormSubmit} />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export { MyNavbar }