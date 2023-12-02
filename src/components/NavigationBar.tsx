import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "../features/rootReducer";

export const NavigationBar = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  return (
    <Navbar
      sticky="top"
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand href="/#/">Recipe Generator</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/#/">Generate Recipes</Nav.Link>
            <Nav.Link href="#/history">Recipe History</Nav.Link>
          </Nav>
          <Nav>
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
