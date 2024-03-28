import { logoutRequest } from "../serviceHandle";
import { useNavigate } from "react-router";
function Topnav() {
  const navigate = useNavigate();
  const clearLocalStorage = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };
  return (
    <header class="navbar navbar-expand-md d-print-none">
      <div class="container-xl">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-menu"
          aria-controls="navbar-menu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <h1 class="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
          Invoice Pro
        </h1>
        <div class="navbar-nav flex-row order-md-last">
          <button
            className="nav-link"
            onClick={async () => {
              const logoutData = await logoutRequest();
              if (logoutData) {
                clearLocalStorage();
                navigate(`/`);
              } else {
                console.log("logout failed");
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-bar-to-right"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 12l-10 0" />
              <path d="M14 12l-4 4" />
              <path d="M14 12l-4 -4" />
              <path d="M20 4l0 16" />
            </svg>
            <span className="nav-link-title">&nbsp; Sign Out </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Topnav;
