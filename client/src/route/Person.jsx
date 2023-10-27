import { Link, useParams } from "react-router-dom";
import "../App.css";
import { useQuery } from "@apollo/client";
import { GET_PERSON_WITH_THEIR_CARS } from "../query/query";

import { LeftCircleOutlined } from "@ant-design/icons";
import PeopleCard from "../components/view/PeopleCard";


const Person = () => {
  const { ownerId } = useParams();
  console.log("ownerId", ownerId);

  const { loading, error, data } = useQuery(GET_PERSON_WITH_THEIR_CARS, {
    variables: { personWithTheirCarsId: ownerId },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  console.log("Person", data);
  console.log("data?.personWithTheirCars", data?.personWithTheirCars);
  return (
    <div className="Person">
      <Link
        to="/"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <LeftCircleOutlined style={{ fontSize: "1.5rem", color: "black" }} />
      </Link>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column-reverse",
          margin: "1rem",
          gap: "1rem",
        }}
      >
        <h1>
          {data?.personWithTheirCars.firstName}{" "}
          {data?.personWithTheirCars.lastName}
        </h1>
      </div>
      <PeopleCard item={data?.personWithTheirCars} isShowPage={true} />
    </div>
  );
};

export default Person;
