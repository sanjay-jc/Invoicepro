import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { updateInvoice, getCustomerlisting } from "../serviceHandle";
import { toast } from "react-toastify";

function InvoiceEditmodal({ show, onHide, selectedRowData, updateListing }) {
  // Destructure selectedRowData to access individual properties
  const { id, invoice_id, customer, amount, date, status } = selectedRowData;
  const [customerListing, setCustomerListing] = useState([]);
  // State variable to hold form data
  const [formData, setFormData] = useState({
    id: "",
    customer: "",
    amount: "",
    date: "",
    status: "",
  });

  // Update form data when selectedRowData changes
  useEffect(() => {
    setFormData({
      id: id,
      customer: customer,
      amount: amount,
      date: date,
      status: status,
    });
  }, [id, invoice_id, customer, amount, date, status]);

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
      // Perform API call to save the data
      await updateInvoice(formData.id, formData);
      // Check if the API call was successful
      updateListing();
      toast("Invoice updated successfully!");
    } catch (error) {
      toast("Failed to save data. Please try again later.");
    }
    // Close the modal after submitting
    onHide();
  };

  // const notify = () => toast("Wow so easy!");
  useEffect(() => {
    // Call getCustomerlist when the component mounts (page loads)
    getCustomerlisting()
      .then((customerList) => {
        // Handle the fetched customer list
        setCustomerListing(customerList.results);
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
          Edit: <strong>{invoice_id ? invoice_id : "Invoice Id"}</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="id">
            <Form.Label>Invoice Id</Form.Label>
            <Form.Control type="text" value={invoice_id} readOnly />
          </Form.Group>

          <Form.Group controlId="customer">
            <Form.Label>Customer</Form.Label>
            <Form.Control
              as="select"
              value={formData.customer}
              onChange={handleChange}
            >
              <option value="{formData.customer}">Select customer...</option>
              {/* Map customer data to options */}
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
              format="yyyy-mm-dd"
              value={formData.date}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Select value={formData.status} onChange={handleChange}>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Cancelled">Cancelled</option>
            </Form.Select>
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

export default InvoiceEditmodal;
