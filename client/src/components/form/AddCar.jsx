import { Button, Divider, Form, Input, InputNumber, Select } from "antd";
import React from "react";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_CAR, GET_CARS, GET_PEOPLE } from "../../query/query";
import { v4 as uuidv4 } from "uuid";

function AddCar() {
  const [form] = Form.useForm();
  const [people, setPeople] = useState([]);
  const [id] = useState(uuidv4());
  const [, forceUpdate] = useState();
  const { error, data } = useQuery(GET_PEOPLE);

  const [addCar] = useMutation(ADD_CAR);
  
  useEffect(() => {
    if (data && data.people) {
      const options = data.people.map((person) => ({
        value: person.id,
        label: `${person.firstName} ${person.lastName}`,
      }));
      setPeople(options);
    }
    forceUpdate({});
  }, [data]);

  const onFinish = (values) => {
    const { year, make, model, price, personId } = values;

    addCar({
      variables: {
        id,
        year: parseInt(year),
        make,
        model,
        price: parseFloat(price),
        personId,
      },
      update: (cache, { data: { addCar } }) => {
        const data = cache.readQuery({ query: GET_CARS });
        if (!data) return;
        cache.writeQuery({
          query: GET_CARS,
          data: {
            ...data,
            cars: [...data.cars, addCar],
          },
        });
      },
    });
    form.resetFields();
  };

  return (
    <div style={{ width: "90%", margin: "0 auto" }}>
      <Divider orientation="center" style={{ fontSize: "1.5rem" }}>
        Add Car
      </Divider>
      <Form
        name="add-car-form"
        layout="inline"
        size="medium"
        form={form}
        style={{ justifyContent: "center", gap: "1rem" }}
        onFinish={onFinish}
      >
        <Form.Item
          name="year"
          label="Year"
          rules={[{ required: true, message: "Please enter a year" }]}
        >
          <InputNumber min={1} max={2023} placeholder="Year" />
        </Form.Item>
        <Form.Item
          name="make"
          label="Make"
          rules={[{ required: true, message: "Please enter the Make Company" }]}
        >
          <Input placeholder="Make" />
        </Form.Item>
        <Form.Item
          name="model"
          label="Model"
          rules={[{ required: true, message: "Please enter the Car Model" }]}
        >
          <Input placeholder="Model" />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please enter the price" }]}
        >
          <InputNumber prefix="$" min={1} />
        </Form.Item>
        <Form.Item
          name="personId"
          label="Person"
          rules={[{ required: true, message: "Please select a person" }]}
        >
          <Select placeholder="Select a person" options={people} />
        </Form.Item>
        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length ||
                !people.length
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

export default AddCar;
