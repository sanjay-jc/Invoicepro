import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

function CreateCustomerModal({
  show,
  onHide,
  updateListing,
  fields,
  moduletype,
  initialData,
  isEdit,
}) {
  const formObject = Object.fromEntries(
    fields["createFields"].map((field) => [Object.keys(field)[0], ""])
  );

  const [formData, setFormData] = useState(formObject);
  // Update form data with initial data if provided
  useEffect(() => {
    const formObject = Object.fromEntries(
      fields["createFields"].map((field) => [Object.keys(field)[0], ""])
    );

    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(formObject);
    }
  }, [initialData, fields]);

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
      if (isEdit) {
        await fields["updateFunction"](initialData.id, formData, moduletype);
      } else {
        await fields["createFunction"](formData, moduletype);
      }
      toast(`${moduletype} created successfully!`);
      setFormData(formObject);
      updateListing();
      onHide();
    } catch (error) {
      let errorMessage = "";
      const errorData = error.response.data.error;
      for (const key in errorData) {
        if (errorData.hasOwnProperty(key)) {
          errorMessage += `${key}: ${errorData[key]}\n`;
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
          Create {fields["header"]}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {fields["createFields"].map((field, index) => (
            <Form.Group controlId={Object.keys(field)[0]} key={index}>
              <Form.Label>{field[Object.keys(field)[0]]}</Form.Label>
              {field.type === "select" ? (
                <Form.Control
                  as="select"
                  value={formData[Object.keys(field)[0]] || ""}
                  onChange={handleChange} // Just pass handleChange directly
                >
                  {field.statusFields &&
                    field.statusFields.map((status, statusIndex) => (
                      <option key={statusIndex} value={status.id}>
                        {status.name}
                      </option>
                    ))}
                </Form.Control>
              ) : (
                <Form.Control
                  type={field.type}
                  value={formData[Object.keys(field)[0]] || ""}
                  onChange={handleChange} // Just pass handleChange directly
                  required={field.required}
                />
              )}
            </Form.Group>
          ))}
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
