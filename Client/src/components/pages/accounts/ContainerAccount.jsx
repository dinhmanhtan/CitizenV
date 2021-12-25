import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/authContext";
import { Navigate } from "react-router-dom";

import Account from "./Account";

function ContainerAccount() {
  const { accountID } = useParams();
  const {
    authState: {
      account: { role },
    },
  } = useContext(AuthContext);

  return (
    <div>
      {role !== 4 ? (
        <Account accountID={accountID} />
      ) : (
        <Navigate to="/notfound" />
      )}
    </div>
  );
}

export default ContainerAccount;
