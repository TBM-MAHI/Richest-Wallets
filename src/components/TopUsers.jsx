import { Card, ListGroup, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { loadTopUsers, loadTotalUsers } from "../redux-store/interactions";
import { useEffect } from "react";

function TopUsersCard() {
  const dispatch = useDispatch();
  const contract = useSelector((state) => state.ContractReducer.tokenContr);
  const signer = useSelector((state) => state.ProviderReducer.signer);
  const total = useSelector((state) => state.UserReducer.total);
  const userEventArray = useSelector((state) => state.RegisterdReducer.userEventArray);
  const topThreeUserArray = useSelector(
    (state) => state.UserReducer.topThreeUserArray
  );
  console.log("top three ", topThreeUserArray);
  
  // LOAD TOP THREE USERS
  useEffect(() => {
    console.log("fired useEffect from TopUsers");
    async function fetchData() {
      await loadTotalUsers(contract, dispatch);
     await loadTopUsers(contract, dispatch, signer);
    }
    fetchData();
  }, [userEventArray,signer]);

  return (
    <Container className="mt-5 mx-0" style={{ maxWidth: "500px" }}>
      <Card style={{ width: "30rem" }}>
        <Card.Body>
          {total !== 0 ? (
            <p className="text-center fs-4">
              Total Registered User
              <span className="fw-bold"> {total}</span>
            </p>
          ) : (
            <p className="text-center fs-4">
             No Users Registered </p>
          )}
          <Card.Title>Top Three Wealthiest Users</Card.Title>
          {topThreeUserArray ? (
            <ListGroup variant="flush">
              {topThreeUserArray.map((ob) => (
                <ListGroup.Item>
                  <p className="my-1 fw-bold">User: {ob.name} </p>
                  <p className="my-1 fw-bold fs-6">Balance: {ob.balance} ETH</p>
                  <small> Address:{ob.walletAddress} </small>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p className="text-center fs-5 fw-normal">
              
              Please connect wallet and Sign the transaction to view Wealthiest
              accounts
            </p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default TopUsersCard;
