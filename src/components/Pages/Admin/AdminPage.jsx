import React from "react";

import AdminNotApprovedEvents from "./AdminNotApprovedEvents";
import AdminEditCategory from "./AdminEditCategory";

function AdminPage(props) {
  return (
    <div>
      <AdminEditCategory />
      <AdminNotApprovedEvents events={props.eventsArr} />
    </div>
  );
}

export default AdminPage;
