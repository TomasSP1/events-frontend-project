import React from "react";
import AdminNotApprovedEvents from "./AdminNotApprovedEvents";
import AdminCreateCategory from "./AdminCreateCategory";

function AdminPage(props) {
  return (
    <div>
      <AdminCreateCategory />
      <AdminNotApprovedEvents events={props.eventsArr} />
    </div>
  );
}

export default AdminPage;
