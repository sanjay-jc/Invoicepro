import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { createCustomerInvoice } from "../serviceHandle";
import { toast } from "react-toastify";

function CreateCustomerModal({ show, onHide, updateListing }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "", // Default status for new invoices
  });

  // Function to handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
      };
      await createCustomerInvoice(payload, "customer"); // Use your createInvoice service function
      toast("Customer created successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
      });
      updateListing();
      onHide();
    } catch (error) {
      let errorMessage = "";
      const errorData = error.response.data.error;
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
          Create Customer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={formData.customer}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
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

export default CreateCustomerModal;
