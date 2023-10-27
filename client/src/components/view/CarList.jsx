import React from 'react'
import {  List } from "antd";
import { useQuery } from "@apollo/client";
import CarCard from './CarCard';

import { GET_CARS } from "../../query/query";

// const carArray =[{
//     year: 2020,
//     make: "Toyota",
//     model: "Corolla",
//     price: 20000,
//     personId: "1",
// },
// {
//     year: 2021,
//     make: "Honda",
//     model: "CR-V",
//     price: 40000,
//     personId: "2",
// }] 
function CarList({ props }) {
    const { id } = props;
    const { loading, error, data } = useQuery(GET_CARS);
  // console.log("CarList  ",data)
    return (
      <List
        style={{ width: "100%" }}
        bordered={false}
        dataSource={
        // carArray
            !data ? [] : data.cars.filter((car) => car.personId === id)
        }
        renderItem={(item) => (
          <List.Item style={{ display: "block", width: "100%" }}>

            <CarCard props={item} personId={id} />
          </List.Item>
        )}
      />
    );
}

export default CarList
