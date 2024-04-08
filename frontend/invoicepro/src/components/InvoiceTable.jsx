import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { getCustomerInvoiceList } from "../serviceHandle";
import CreateInvoiceModal from "./CreateInvoiceModal";
import InvoiceEditmodal from "./InvoiceEditmodal";

function InvoiceTable() {
  const [modalShow, setModalShow] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [invoiceData, setInvoiceData] = useState([]);
  const [selectedInvoiceData, setselectedInvoiceData] = useState({});

  function getStatusClass(status) {
    switch (status) {
      case "Unpaid":
        return "text-bg-danger";
      case "Paid":
        return "text-bg-success";
      case "Cancelled":
        return "text-bg-warning";
      default:
        return "text-bg-danger";
    }
  }

  const handleEditClick = (data) => {
    setselectedInvoiceData(data); // Set the data of the selected customer
    setModalShow(true);
  };

  const handleCreateClick = (data) => {
    // Set the data of the selected customer
    setCreateModal(true);
  };

  const updateListing = () => {
    // Call getInvoiceList to fetch the updated invoice list after saving
    getCustomerInvoiceList("invoice")
      .then((invoiceList) => {
        // Handle the fetched invoice list
        setInvoiceData(invoiceList.results);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching invoice list:", error);
      });
  };

  useEffect(() => {
    // Call getCustomerlist when the component mounts (page loads)
    getCustomerInvoiceList("invoice")
      .then((customerList) => {
        // Handle the fetched customer list
        console.log(customerList.results, "<<<<<<<<<<<,,,");
        setInvoiceData(customerList.results);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching customer list:", error);
      });
  }, []);

  return (
    <div className="page-body">
      <div className="container-xl">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1 className="mb-3">Invoice</h1>
          <button
            className="btn btn-primary"
            onClick={() => handleCreateClick()}
          >
            Create Invoice
          </button>
        </div>
        <div className="">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Invoice Id</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.length === 0 ? (
                <tr className="text-center">
                  <td colSpan="6">No invoices found</td>
                </tr>
              ) : (
                invoiceData.map((invoice) => (
                  <tr key={invoice.id}>
                    <td>{invoice.invoice_id}</td>
                    <td>{invoice.customer.name}</td>
                    <td>{invoice.amount}</td>
                    <td>{invoice.date}</td>
                    <td>
                      <span
                        className={`badge ${getStatusClass(
                          invoice.status
                        )} text-center p-2`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleEditClick(invoice)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </div>
      <InvoiceEditmodal
        show={modalShow}
        onHide={() => setModalShow(false)}
        selectedRowData={selectedInvoiceData}
        updateListing={updateListing}
      />
      <CreateInvoiceModal
        show={createModal}
        onHide={() => setCreateModal(false)}
        updateListing={updateListing}
      />
    </div>
  );
}

export default InvoiceTable;
