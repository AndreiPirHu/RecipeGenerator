import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "../features/rootReducer";
import "./navigationBar.css";

export const NavigationBar = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  return (
    <Navbar
      id="navbar"
      sticky="top"
      collapseOnSelect
      expand="lg"
      data-bs-theme="light"
    >
      <Container>
        <Navbar.Brand href="/#/">Recipe Generator</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link href="/#/">Home</Nav.Link>
            <Nav.Link href="#/history">History</Nav.Link>
            {isLoggedIn ? (
              <Nav.Link href="#/account">Account</Nav.Link>
            ) : (
              <Nav.Link href="#/login">Log In</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
