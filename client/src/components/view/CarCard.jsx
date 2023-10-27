import React from 'react'

import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useParams } from "react-router-dom";

import RemoveCar from '../buttons/RemoveCar';
import UpdateCar from '../form/UpdateCar';

const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function CarCard({ props, personId }) {
    const { id, make, model, year, price } = props;
    const { ownerId } = useParams();
    
    const [editMode, setEditMode] = useState(false);
  
    const handleButtonClick = () => {
      setEditMode(!editMode);
    };
  
    return (
      <div>
        {editMode ? (
          <UpdateCar
            props={props}
            personId={personId}
            onButtonClick={handleButtonClick}
          />
        
        ) : (
          <Card
            headStyle={{ backgroundColor: "#D9D9D9" }}
            size="small"
            bordered={false}
            // title={`${year} ${make} ${model} >> $ ${price} `}
            title={`${year} ${make} ${model} >> $${formatNumber(price)}`}
            actions={[
              <EditOutlined key="edit" onClick={handleButtonClick} />,
            
                <RemoveCar id={id} />
              
            ]}
          ></Card>
        )}
      </div>
    );
}

export default CarCard
