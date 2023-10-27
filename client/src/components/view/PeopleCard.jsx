import React from "react";
import { Card, Typography } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import CarList from "./CarList";
import { useState } from "react";
import RemovePerson from "../buttons/RemovePerson";
import UpdatePeople from "../form/UpdatePeople";

function PeopleCard({ item, isShowPage }) {
  const [editMode, setEditMode] = useState(false);
  const [showPage, setShowPage] = useState(isShowPage);
  const [editPersonId, setEditPersonId] = useState(null);

  // console.log(item);

  const handleButtonClick = (id) => {
    setEditMode(!editMode);
    setEditPersonId(id);
  };
  return editPersonId === item.id ? (
    <UpdatePeople props={item} onButtonClick={() => handleButtonClick(null)} />
  ) : (
    <Card
      title={`${item.firstName} ${item.lastName}`}
      style={{
        width: "100%",
        backgroundColor: "#eeffdd",
        textAlign: "left",
      }}
      className="ant-card-actions-custom"
      actions={[
        <EditOutlined key="edit" onClick={() => handleButtonClick(item.id)} />,
        <RemovePerson id={item.id} key={item.id} />,
      ]}
    >
      <CarList props={item} />
      {showPage ? null : (
        <Link to={`people/${item.id}`}>
          <Typography
            style={{
              color: "blue",
              opacity: "0.65",
              margin: "1rem 0",
              fontSize: "1rem",
            }}
          >
            Learn More
          </Typography>
        </Link>
      )}
    </Card>
  );
}

export default PeopleCard;
