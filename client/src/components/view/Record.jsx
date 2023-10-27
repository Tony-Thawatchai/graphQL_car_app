import React from 'react'
import { Button, Divider, Form, Input , List} from "antd";
import PeopleCard from './PeopleCard';
import PeopleList from './PeopleList';




function Record() {
  return (
    <div style={{ width: "90%", margin:"0 auto" }}>
        <Divider orientation="center" style={{ fontSize: "1.5rem" }}>
          Record
        </Divider>
        
        <PeopleList />
      
    </div>
  )
}

export default Record
