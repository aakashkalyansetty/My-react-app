import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../assets/logo.png";
import user from "../../assets/user.png";
import './Header.css';

class Header extends React.Component{
  state = {
    search:false,
  }

logout = (e) => {
    localStorage.clear();
    window.location.href = '/';
    return false;
}
    render(){
      console.log(window.location.pathname)
        return (
            <div>
              <section className="d-flex justify-content-between">
              <span><img src={logo} className="nav-logo" /></span>
              <div  className="d-flex align-items-center">{this.state.search?<input
                placeholder="Switch User"
                classNames="test-class"
              />:<div></div>}<span><img src={user} className="user-logo" onClick={() => this.setState({search:!this.state.search})}/></span>
              <p className="welcome">Hello <br/> Admin CCpaynet (Admin)</p>
              </div>
              </section>
            <Navbar collapseOnSelect expand="lg" className="navbar" variant="dark">
            <Navbar.Brand href="#home"></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="nav navbar-nav">
                <Nav.Link href="../Dashboard" className={window.location.pathname== '/Dashboard/Dashboard.js'?'active':null}>Dashboard</Nav.Link>
                <Nav.Link href="../UserIndex" className={window.location.pathname== '/UserIndex/UserIndex.js'?'active':null}>Users</Nav.Link>
                <Nav.Link href="../ProcessorIndex" className={window.location.pathname== '/ProcessorIndex/ProcessorIndex.js'?'active':null}>Processors</Nav.Link>
                <NavDropdown title="Validation" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/BlacklistIndex">Blacklist</NavDropdown.Item>
                  <NavDropdown.Item href="/DuplicateCheckIndex">Duplicate Check</NavDropdown.Item>
                  <NavDropdown.Item href="/ForteIndex">Forte</NavDropdown.Item>
                </NavDropdown>
              </Nav>

              <Nav className="navbar-nav ml-auto">
                <Nav.Link className={window.location.pathname== '/'?'active':null} onClick={this.logout} id="logout">Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          </div>
          
        );
    }
}

export default Header;