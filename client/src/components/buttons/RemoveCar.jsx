import React from 'react'
import "../../App.css"
import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { GET_CARS, REMOVE_CAR } from "../../query/query";

function RemoveCar({id}) {
    const [removeCar] = useMutation(REMOVE_CAR, {
        update(cache, { data: { removeCar } }) {
          const data = cache.readQuery({ query: GET_CARS });
    
          if (data && data.cars) {
            cache.writeQuery({
              query: GET_CARS,
              data: {
                cars: data.cars.filter((car) => car.id !== removeCar.id),
              },
            });
          }
        },
      });
    
      const handleButtonClick = () => {
        let result = window.confirm("Comfirm deleting this car?");
    
        if (result) {
          removeCar({
            variables: {
              id,
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

export default RemoveCar
