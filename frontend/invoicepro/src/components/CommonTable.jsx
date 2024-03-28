import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { getCustomerlist } from "../serviceHandle";
import CustomerUpdateModal from "./CustomerUpdateModal";
import CreateCustomerModal from "./CreateCustomerModal";

function CommonTable() {
  const [modalShow, setModalShow] = useState(false);
  const [createModalShow, setCreateModalShow] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState({});

  const handleEditClick = (data) => {
    setSelectedRowData(data); // Set the data of the selected customer
    setModalShow(true);
  };

  const handleCreateClick = () => {
    setCreateModalShow(true);
  };
  useEffect(() => {
    // Call getCustomerlist when the component mounts (page loads)
    getCustomerlist()
      .then((customerList) => {
        // Handle the fetched customer list
        setRowData(customerList.results);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching customer list:", error);
      });
  }, []);

  const updateListing = () => {
    // Call getInvoiceList to fetch the updated invoice list after saving
    getCustomerlist()
      .then((customerList) => {
        // Handle the fetched invoice list
        setRowData(customerList.results);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching invoice list:", error);
      });
  };

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
          <h1 className="mb-3">Customers</h1>
          <button
            className="btn btn-primary"
            onClick={() => {
              handleCreateClick();
            }}
          >
            Create Customer
          </button>
        </div>
        <div className="">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Customer Id</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rowData.length === 0 ? (
                <tr className="text-center">
                  <td colSpan="6">No customers found</td>
                </tr>
              ) : (
                rowData.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.customer_id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.email}</td>
                    <td>{customer.address}</td>
                    <td>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleEditClick(customer)}
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
      <CustomerUpdateModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        selectedRowData={selectedRowData}
        updateListing={updateListing}
      />
      <CreateCustomerModal
        show={createModalShow}
        onHide={() => setCreateModalShow(false)}
        updateListing={updateListing}
      />
    </div>
  );
}

export default CommonTable;
