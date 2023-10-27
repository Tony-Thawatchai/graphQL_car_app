import React from 'react'
import "../../App.css"
import Title from '../view/Title'
import AddPeople from '../form/AddPeople'
import AddCar from '../form/AddCar'
import Record from '../view/Record'
import { useQuery } from "@apollo/client";
import { GET_PEOPLE } from "../../query/query";

function MainLayout() {
  const { loading, error, data } = useQuery(GET_PEOPLE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data)
 
  return (
    <div className='MainLayout'>
      <Title />
      <AddPeople />
      {data.people.length === 0 ? (  <p>At least 1 people needed before add car</p>):(<AddCar   />)}
  
      <Record />
      
    </div>
  )
}

export default MainLayout
