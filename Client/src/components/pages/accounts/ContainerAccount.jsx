import React from "react";
import { useParams } from "react-router-dom";

import Account from "./Account";

function ContainerAccount() {
  const { accountID } = useParams();

  return (
    <div>
      <Account accountID={accountID} />
    </div>
  );
}

export default ContainerAccount;
