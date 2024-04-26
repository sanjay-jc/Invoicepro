import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { getCustomerInvoiceList } from "../serviceHandle";
import CreateCustomerModal from "./CreateCustomerModal";
import { getFieldConfig } from "./FieldConfigs";

function DynamicTable({ moduleName }) {
  function getValue(obj, path) {
    return path
      .split(".")
      .reduce((acc, key) => (acc && acc[key] ? acc[key] : undefined), obj);
  }

  let fieldsConfig = getFieldConfig(moduleName);
  const [createModalShow, setCreateModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState({});

  const handleCreateClick = () => {
    setCreateModalShow(true);
  };

  const handleEditClick = (rowData) => {
    setSelectedRowData(rowData);
    console.log("edit modal", rowData);
    setEditModalShow(true);
  };

  useEffect(() => {
    // Call the fetchFunction when the component mounts (page loads)
    fieldsConfig["fetchFunction"](moduleName)
      .then((modulelist) => {
        // Handle the fetched data
        setRowData(modulelist.results);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching data:", error);
        // Optionally, you can set a default value for rowData or show an error message
      });
  }, []);

  const updateListing = () => {
    // Call getInvoiceList to fetch the updated invoice list after saving
    getCustomerInvoiceList(moduleName)
      .then((modulelist) => {
        // Handle the fetched invoice list
        setRowData(modulelist.results);
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
          <h1 className="mb-3">{fieldsConfig["header"]}</h1>
          <button
            className="btn btn-primary"
            onClick={() => {
              handleCreateClick();
            }}
          >
            Create {fieldsConfig["header"]}
          </button>
        </div>
        <div className="">
          <Table striped bordered hover>
            <thead>
              <tr>
                {fieldsConfig["labels"].map((label, index) => (
                  <th key={index}>{label}</th>
                ))}
                <th>Action</th> {/* New column for action buttons */}
              </tr>
            </thead>
            <tbody>
              {rowData.length === 0 ? (
                <tr className="text-center">
                  <td colSpan="6">No {fieldsConfig["header"]} Found</td>
                </tr>
              ) : (
                rowData.map((listing) => (
                  <tr key={listing.id}>
                    {fieldsConfig["fields"].map((field) => {
                      if (field !== "id") {
                        const value = getValue(listing, field);
                        return <td key={field}>{value}</td>;
                      } else {
                        return null; // Exclude 'id' field
                      }
                    })}
                    <td>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleEditClick(listing)}
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
      <CreateCustomerModal
        show={createModalShow}
        onHide={() => setCreateModalShow(false)}
        fields={fieldsConfig}
        updateListing={updateListing}
        moduletype={moduleName}
      />
      <CreateCustomerModal
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        fields={fieldsConfig}
        updateListing={updateListing}
        moduletype={moduleName}
        isEdit={true}
        initialData={selectedRowData}
      />
    </div>
  );
}

export default DynamicTable;
