import {
  getCustomerInvoiceList,
  getCustomerlisting,
  createCustomerInvoice,
  updateCustomerInvoice,
} from "../serviceHandle";

const fetchCustomerListing = async () => {
  try {
    const customerListing = await getCustomerlisting();
    return customerListing;
  } catch (error) {
    console.error("Error fetching customer listing:", error);
    throw error;
  }
};

let customerListingResult;

try {
  customerListingResult = await fetchCustomerListing();
  // Handle the successful response here
  console.log(
    "Customer listing retrieved successfully:",
    customerListingResult
  );
  // Proceed with further processing
} catch (error) {
  // Handle errors here
  console.error("Error fetching customer listing:", error);
  // Optionally, show an error message to the user or take other actions
}

const FieldConfig = {
  customer: {
    header: "Customers",
    fields: ["id", "name", "customer_id", "email", "phone", "address"],
    labels: ["Name", "Customer Id", "Email", "Phone", "Address"],
    fetchFunction: getCustomerInvoiceList,
    createFields: [
      { name: "Name", required: true, type: "text" },
      { email: "Email", required: false, type: "email" },
      { phone: "Phone", required: false, type: "text" },
      { address: "Address", required: false, type: "text" },
    ],
    createFunction: createCustomerInvoice,
    updateFunction: updateCustomerInvoice,
  },
  invoice: {
    header: "Invoices",
    fields: ["id", "invoice_id", "customer.name", "amount", "date", "status"],
    labels: ["Invoice Id", "Customer", "Amount", "Date", "Status"],
    fetchFunction: getCustomerInvoiceList,
    createFields: [
      {
        customer: "Customer",
        required: true,
        type: "select",
        statusFields: customerListingResult
          ? customerListingResult.results
          : [],
      },
      { amount: "Amount", required: false, type: "email" },
      { date: "Date", required: false, type: "date" },
      {
        status: "Status",
        required: false,
        type: "select",
        statusFields: [
          { id: "Unpaid", name: "Unpaid" },
          { id: "Paid", name: "Paid" },
          { id: "Cancelled", name: "Cancelled" },
        ],
      },
    ],
    createFunction: createCustomerInvoice,
    updateFunction: updateCustomerInvoice,
  },
};

export default FieldConfig;

export const getFieldConfig = (moduleName) => {
  // Check if the field exists in FieldConfig
  if (FieldConfig[moduleName]) {
    return FieldConfig[moduleName];
  } else {
    // If the field doesn't exist, return null or handle accordingly
    return null;
  }
};
