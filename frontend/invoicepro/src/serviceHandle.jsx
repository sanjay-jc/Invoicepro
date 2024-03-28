import axios from "axios";

export const API_BASE_URL = "http://127.0.0.1:8000/";
const LOGIN_URL = "account/v1/login";
const LOGOUT_URL = "api/token/blacklist/";
const CUSTOMER_LIST = "invoice/v1/list-customer-invoice/customers";
const INVOICE_LIST = "invoice/v1/list-customer-invoice/invoices";
const CUSTOMER_LIST_UPDATE = "invoice/v1/list-customers";
const CREATE_INVOICE_CUSTOMER = "invoice/v1/create-customer-invoice";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const loginRequest = (data) => {
  return axiosInstance
    .post(LOGIN_URL, data)
    .then((response) => {
      return response.data; // Returning response data for further processing if needed
    })
    .catch((error) => {
      throw error;
    });
};

export const logoutRequest = (data) => {
  let refreshToken = localStorage.getItem("refresh_token");
  return axiosInstance
    .post(LOGOUT_URL, { refresh: refreshToken })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while logout:", error);
      throw error;
    });
};

export const getCustomerlist = () => {
  const token = localStorage.getItem("access_token");
  return axiosInstance
    .get(CUSTOMER_LIST, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const getInvoiceList = () => {
  const token = localStorage.getItem("access_token");
  return axiosInstance
    .get(INVOICE_LIST, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const updateInvoice = (invoiceId, updatedData) => {
  const token = localStorage.getItem("access_token");
  const url = `invoice/v1/update-invoice/${invoiceId}`; // Assuming customerId is the UUID of the customer to be updated

  return axiosInstance
    .patch(url, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while updating customer:", error);
      throw error;
    });
};

export const getCustomerlisting = () => {
  const token = localStorage.getItem("access_token");
  return axiosInstance
    .get(CUSTOMER_LIST_UPDATE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const createInvoice = (data) => {
  const token = localStorage.getItem("access_token");
  console.log(data, "<<<<<<<<<<<<");
  return axiosInstance
    .post(CREATE_INVOICE_CUSTOMER, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while updating customer:", error);
      throw error;
    });
};

export const updateCustomer = (customerId, updatedData) => {
  const token = localStorage.getItem("access_token");
  const url = `invoice/v1/update-customer/${customerId}`; // Assuming customerId is the UUID of the customer to be updated

  return axiosInstance
    .patch(url, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while updating customer:", error);
      throw error;
    });
};
