import React, { useState } from "react";
import "./App.css";
import {
  useGetAllProductsQuery,
  useDeleteProductsMutation,
  useAddProductMutation,
  useUpdateProductMutation,
} from "./store";
import { Button, Input, Modal, Form } from "antd";

const App = () => {
  const { data = [] } = useGetAllProductsQuery();
  const [deleteProducts] = useDeleteProductsMutation();
  const [addProducts] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const [addValue, setAddValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [form] = Form.useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      name: addValue,
    };
    addProducts(newData);
    setAddValue("");
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    form.setFieldsValue({
      name: product.name,
    });
    setIsModalOpen(true);
  };

  const handleEditSubmit = (values) => {
    const updatedProduct = { ...editingProduct, name: values.name };
    updateProduct(updatedProduct);
    setIsModalOpen(false);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    deleteProducts(productToDelete.id);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-x-2 w-[450px] mx-auto flex items-center mt-10"
      >
        <Input
          value={addValue}
          onChange={(e) => setAddValue(e.target.value)}
          size="large"
          type="text"
          placeholder="Add new product"
          name="productValue"
        />
        <Button
          size="large"
          htmlType="submit"
          className="!bg-green-500"
          type="primary"
        >
          Add
        </Button>
      </form>

      <ul className="mt-10 mx-auto w-[450px] p-10">
        {data.map((item, index) => (
          <li
            className="flex items-center justify-between p-2 bg-slate-200 rounded-md"
            key={index}
          >
            <div>
              <span>{index + 1}. </span>
              <strong>{item.name}</strong>
            </div>
            <div className="space-x-2">
              <Button
                htmlType="submit"
                onClick={() => handleDeleteClick(item)}
                className="!bg-red-500"
                type="primary"
              >
                Delete
              </Button>
              <Button
                htmlType="submit"
                onClick={() => handleEditClick(item)}
                type="primary"
              >
                Edit
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        title="Edit Product"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleEditSubmit}>
          <Form.Item
            name="name"
            label="Product Name"
            rules={[
              { required: true, message: "Please input the product name!" },
            ]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>
          <div className="flex justify-end space-x-2">
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </div>
        </Form>
      </Modal>

      <Modal
        title="Confirm Delete"
        open={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        onOk={confirmDelete}
        okText="Yes, Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this product?</p>
      </Modal>
    </>
  );
};

export default App;
