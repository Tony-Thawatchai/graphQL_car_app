import "../../App.css"
import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import {
  GET_PEOPLE,
  REMOVE_PERSON,
  REMOVE_CARS_BY_PERSON_ID,
  REMOVE_CAR,
  GET_CARS,
} from "../../query/query";
import React from "react";
import { filter } from "lodash";

function RemovePerson({ id }) {
  
  const [removePerson] = useMutation(REMOVE_PERSON, {
    update(cache, { data: { removePerson } }) {
      const { people } = cache.readQuery({ query: GET_PEOPLE });
      if (people === null) return;
      console.log("removePerson data: ", people);
      cache.writeQuery({
        query: GET_PEOPLE,
        data: {
          people: people.filter((person) => person.id !== removePerson.id),
        },
      });
    },
  });

  const [removeCarsByPersonId] = useMutation(REMOVE_CARS_BY_PERSON_ID
    , {
    update(cache, { data: { removeCarsByPersonId } }) {
      const {data} = cache.readQuery({ query: GET_CARS });
      console.log("removeCarByPersonId data: ", data);
      if (data && data.cars) {
        cache.writeQuery({
          query: GET_CARS,
          data: {
            cars: data.cars.filter(
              (car) => car.personId !== removeCarsByPersonId.personId
            ),
          },
        });
      }
    },
  }
  );

  const handleButtonClick = () => {
    let result = window.confirm("Are you sure you want to delete this person?");
    console.log(id)
    let personId = id;
    if (result) {
      removePerson({
        variables: {
          id,
        },
      });
      removeCarsByPersonId({
        variables: {
          personId,
        },
      });
    }
   
  };

  return (
    <DeleteOutlined
      key="delete"
      onClick={handleButtonClick}
      className='delete-button'
      // style={{ color: "red" }}
    />
  );
}

export default RemovePerson;
