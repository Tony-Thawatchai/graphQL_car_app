import React from "react";
import { List, Card, Typography } from "antd";
import { EditOutlined } from "@ant-design/icons";



import { useState } from "react";
import "../../App.css";
import { useQuery } from "@apollo/client";
import { GET_PEOPLE } from "../../query/query";

import PeopleCard from "./PeopleCard";

// const people = [
//     {
//       id: '1',
//       firstName: 'Bill',
//       lastName: 'Gates'
//     },
//     {
//       id: '2',
//       firstName: 'Steve',
//       lastName: 'Jobs'
//     },
//     {
//       id: '3',
//       firstName: 'Linux',
//       lastName: 'Torvalds'
//     }
//   ]
function PeopleList() {
  const { loading, error, data } = useQuery(GET_PEOPLE);
  
 
  
  return (
    <div>
      <List
        bordered={false}
        style={{ width: "100%" }}
        dataSource={
          // people
          data ? data.people : []
        }
        renderItem={(item) => (
          <List.Item key={item.id}>
             <PeopleCard item={item} isShowPage={false}/>
          </List.Item>
        )}
      />
    </div>
  );
}

export default PeopleList;
