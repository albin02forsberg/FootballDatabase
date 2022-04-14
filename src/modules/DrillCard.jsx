import React from "react";

export default function DrillCard({ drill }) {
  return (
    <li className="list-group-item">
      <a href={"#" + drill.id}>{drill.data().name}</a>
    </li>
  );
}
