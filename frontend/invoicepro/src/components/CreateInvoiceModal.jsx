import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { getCustomerlisting, createInvoice } from "../serviceHandle";
import { toast } from "react-toastify";

function CreateInvoiceModal({ show, onHide, updateListing }) {
  const [customerListing, setCustomerlisting] = useState([]);
  const [formData, setFormData] = useState({
    customer: "",
    amount: "",
    date: "",
    status: "Unpaid", // Default status for new invoices
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
        invoice: {
          customer: formData.customer,
          amount: formData.amount,
          date: formData.date,
          status: formData.status,
        },
      };
      console.log(payload, "MMMMM");
      const response = await createInvoice(payload); // Use your createInvoice service function
      // Check if the API call was successful
      console.log(response, "<<<<<<<<<>>>>>>>>>>>>>>");
      toast("Invoice created successfully!");
      // Optionally, you can reset the form after submission
      setFormData({
        customer: "",
        amount: "",
        date: "",
        status: "Unpaid",
      });
      updateListing();
      // Close the modal after submitting
      onHide();
    } catch (error) {
      toast("Failed to create invoice. Please try again later.");
    }
  };

  useEffect(() => {
    // Call getCustomerlist when the component mounts (page loads)
    getCustomerlisting()
      .then((customerList) => {
        // Handle the fetched customer list
        setCustomerlisting(customerList.results);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching customer list:", error);
      });
  }, []);

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
          Create Invoice
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="customer">
            <Form.Label>Customer</Form.Label>
            <Form.Control
              as="select"
              value={formData.customer}
              onChange={handleChange}
            >
              <option value="{formData.customer}">Select customer...</option>
              {customerListing.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              value={formData.amount}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={formData.date}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Unpaid">Unpaid</option>
              <option value="Paid">Paid</option>
              <option value="Cancelled">Cancelled</option>
            </Form.Control>
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

export default CreateInvoiceModal;
