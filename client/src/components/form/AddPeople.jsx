import React from 'react'
import { useMutation } from "@apollo/client";
import { Button, Divider, Form, Input } from "antd";
import { useEffect, useState } from "react";
import "../../App.css"
import { ADD_PERSON, GET_PEOPLE } from "../../query/query";
import { v4 as uuidv4 } from "uuid";



function AddPeople() {
    const [id] = useState(uuidv4());
    const [form] = Form.useForm();
    const [, forceUpdate] = useState();
  
    const [addPerson] = useMutation(ADD_PERSON);
  
    useEffect(() => {
      forceUpdate({});
    }, []);
  
    const onFinish = (values) => {
      const { firstName, lastName } = values;
  
      addPerson({
        variables: {
          id,
          firstName,
          lastName,
        },
        update: (cache, { data: { addPerson } }) => {
          const data = cache.readQuery({ query: GET_PEOPLE });
          if (!data) return;
          cache.writeQuery({
            query: GET_PEOPLE,
            data: {
              ...data,
              people: [...data.people, addPerson],
            },
          });
        },
      });
      form.resetFields();
    };
  
    return (
      <div style={{ width: "90%", margin:"0 auto" }}>
        <Divider orientation="center" style={{ fontSize: "1.5rem" }}>
          Add Person
        </Divider>
        <Form
          name="add-people-form"
          layout="inline"
          size="medium"
          form={form}
          style={{ justifyContent: "center", gap:"1rem" }}
          onFinish={onFinish}
        >
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: "Please enter a first name" }]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: "Please enter a last name" }]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
          <Form.Item shouldUpdate={true}>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  !form.isFieldsTouched(true) ||
                  form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                Add
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
    );
}

export default AddPeople
