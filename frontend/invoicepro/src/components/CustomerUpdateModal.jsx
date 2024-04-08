import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { updateCustomerInvoice } from "../serviceHandle";
// import { toast } from "react-toastify";

function CustomerUpdateModal({ show, onHide, selectedRowData, updateListing }) {
  // Destructure selectedRowData to access individual properties
  const { id, customer_id, name, phone, email, address } = selectedRowData;

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    setFormData({
      id: id,
      name: name,
      phone: phone,
      email: email,
      address: address,
    });
  }, [id, customer_id, name, phone, email, address]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async () => {
    console.log("formdata", formData, formData.id);
    try {
      await updateCustomerInvoice(formData.id, formData, "customer");
      updateListing();
      toast("Customer updated successfully");
      onHide();
    } catch (error) {
      let errorMessage = "";
      const errorData = error.response.data;
      for (const key in errorData) {
        if (errorData.hasOwnProperty(key)) {
          errorMessage += `${errorData[key]}\n`; // Append key and its corresponding value to errorMessage
        }
      }
      toast(errorMessage);
    }
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit: <strong>{name ? name : "Customer"}</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="id">
            <Form.Label>ID</Form.Label>
            <Form.Control type="text" value={customer_id} readOnly />
          </Form.Group>

          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="number"
              value={formData.phone}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={formData.address}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} variant="secondary">
          Close
        </Button>
        <Button onClick={handleSubmit} variant="primary">
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CustomerUpdateModal;
