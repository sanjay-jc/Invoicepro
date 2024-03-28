import { Routes, Route } from "react-router-dom";
import CommonTable from "../components/CommonTable";
import SideBar from "../components/Sidebar";
import Topnav from "../components/Topnav";
import InvoiceTable from "../components/InvoiceTable";

function Main(params) {
  return (
    <div className="page">
      <Topnav />
      <SideBar />
      <div className="page-wrapper">
        <Routes>
          <Route path="/customer" element={<CommonTable />} />
          <Route path="/invoice" element={<InvoiceTable />} />
        </Routes>
      </div>
    </div>
  );
}

export default Main;
