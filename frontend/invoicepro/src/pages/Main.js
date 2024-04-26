import { Routes, Route } from "react-router-dom";
// import CommonTable from "../components/CommonTable";
import SideBar from "../components/common/Sidebar";
import Topnav from "../components/common/Topnav";
import DynamicTable from "../components/DynamicTable";

function Main(params) {
  return (
    <div className="page">
      <Topnav />
      <SideBar />
      <div className="page-wrapper">
        <Routes>
          <Route
            path="/customer"
            element={<DynamicTable moduleName={"customer"} />}
          />
          <Route
            path="/invoice"
            element={<DynamicTable moduleName={"invoice"} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default Main;
