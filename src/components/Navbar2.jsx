import Blockies from "react-blockies";
import { useSelector, useDispatch } from "react-redux";
import { loadAccount,loadSigner } from "../redux-store/interactions";
import config from "../config.json";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
function MyNavbar() {
  const account = useSelector((state) => state.ProviderReducer.account);
  const connection = useSelector((state) => state.ProviderReducer.connection);
  const balance = useSelector((state) => state.ProviderReducer.balance);
  const chainId = useSelector((state) => state.ProviderReducer.chainId);
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("Select a network");
  
    const handleloadAccount = async () => {
    // Fetch current account & balance from Metamask
      await loadAccount(connection, dispatch);
      await loadSigner(connection , dispatch);
  };
  const handleNetChange = async (selectedValueDropDown) => {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: selectedValueDropDown }],
    });
    setSelectedValue(selectedValueDropDown);
  };

  return (
    <Navbar bg="antiquewhite" expand="lg">
      <Navbar.Brand href="#">
        <img
          src="logo.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="My Logo"
        />
        <span> Richest Wallets</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav
          className="mr-auto"
          style={{ color: "black", fontSize: "1.2rem", fontWeight: "bold" }}
        >
          {chainId && (
            <NavDropdown title={selectedValue} onSelect={handleNetChange}>
             <NavDropdown.Item eventKey="0x7A69">Localhost</NavDropdown.Item>
              <NavDropdown.Item eventKey="0x5">Goerli</NavDropdown.Item>
            </NavDropdown>
          )}

          <p>
            <small>My balance :</small>{" "}
            {balance ? Number(balance).toFixed(3) + "ETH" : "0 ETH"}
          </p>

          {account ? (
            <Nav.Link
              href={
                config[chainId]
                  ? `${config[chainId].explorerURL}${account}`
                  : `#`
              }
              target={"_blank"}
              rel={"noreferrer"}
            >
              Account: {account.slice(0, 4) + "..." + account.slice(-4)}
              {/*   <Blockies
              seed={account}
              size={10}
              scale={4}
              bgColor="#21FFEB"
              spotColor="#767F92"
              className="identicon"
            /> */}
            </Nav.Link>
          ) : (
            <Button variant="primary" onClick={handleloadAccount}>
              Connect Wallet
            </Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNavbar;
