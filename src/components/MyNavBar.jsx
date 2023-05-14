import { Container, Navbar, Nav, Form, Button } from "react-bootstrap";
import Blockies from "react-blockies";
import { useSelector, useDispatch } from "react-redux";
import { loadAccount, loadSigner } from "../redux-store/interactions";

function MyNavBar() {
  const account = useSelector((state) => state.ProviderReducer.account);
  const connection = useSelector((state) => state.ProviderReducer.connection);
  const balance = useSelector((state) => state.ProviderReducer.balance);
  const chainId = useSelector((state) => state.ProviderReducer.chainId);
  const dispatch = useDispatch();

  const handleloadAccount = async () => {
    // Fetch current account & balance from Metamask
    await loadAccount(connection, dispatch);
    await loadSigner(connection, dispatch);
  };

  const handleNetChange = async (e) => {
    console.log(e.target.value);
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: e.target.value }],
    });
  };

  return (
    <Navbar bg="dark" expand="md" variant="dark">
      <Container>
        <Navbar.Brand
          className="fs-2 fst-italic"
          style={{
            fontFamily: "Lucida Grande",
          }}
        >
          Richest Wallets{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto w-100 justify-content-end">
            <Form.Select
              size="sm"
              style={{ width: "20%" }}
              aria-label="Default select example"
              value={`${chainId ? `${chainId.toString(16)}` : `0`}`}
              onChange={handleNetChange}
            >
              <option value="0">Select a network</option>
              <option value="0x7A69">Localhost</option>
              <option value="0x5">Goerli</option>
            </Form.Select>

            <Nav.Link href="#link">
              <span className="fw-bold fs-6 mx-2 ">
                Balance:
                {balance ? Number(balance).toFixed(3) + "ETH" : "0 ETH"}
              </span>
            </Nav.Link>
            {account ? (
              <Nav.Link href="#link">
                <span className="fw-bold fs-6 mx-2">
                  Address: {account.slice(0, 6) + "..." + account.slice(-4)}
                </span>
                <Blockies
                  seed={account}
                  size={8}
                  scale={4}
                  bgColor="#21FFEB"
                  spotColor="#767F92"
                  className="identicon"
                />
              </Nav.Link>
            ) : (
              <Button variant="primary" onClick={handleloadAccount}>
                Connect Wallet
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavBar;