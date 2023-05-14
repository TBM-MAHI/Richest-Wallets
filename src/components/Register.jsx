import { Button, Form, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { loadRegisterUser } from "../redux-store/interactions";
import { useState } from "react";
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [walletAddress, setWalletAdr] = useState("");

  const contract = useSelector((state) => state.ContractReducer.tokenContr);
  const signer = useSelector((state) => state.ProviderReducer.signer);
  const dispatch = useDispatch();
  let handleRgister = async (e) => {
    e.preventDefault();
    await loadRegisterUser(contract, signer, name, email, dispatch);
    setName("");
    setEmail("");
    setWalletAdr("");
  };
  return (
    <Container className="mt-5 mx-0" style={{ maxWidth: "500px" }}>
      <Form onSubmit={handleRgister}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicWalletAddress">
          <Form.Label>Wallet Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ex: 0x845AFC.....96A"
            value={walletAddress}
            onChange={(e) => setWalletAdr(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
}

export default Register;
