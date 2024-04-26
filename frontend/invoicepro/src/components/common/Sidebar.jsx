function SideBar() {
  return (
    <aside
      className="navbar navbar-vertical navbar-expand-lg"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <h1 className="navbar-brand navbar-brand-autodark">
          <h4>Invoice Pro</h4>
        </h1>

        <div className="collapse navbar-collapse" id="sidebar-menu">
          <ul className="navbar-nav pt-lg-3 " style={{ gap: "30px" }}>
            <li className="nav-item">
              <a className="nav-link" href="/customer">
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
                  class="icon icon-tabler icons-tabler-outline icon-tabler-user"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                </svg>
                <span className="nav-link-title">&nbsp; Customer </span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/invoice">
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
                  class="icon icon-tabler icons-tabler-outline icon-tabler-file-text"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                  <path d="M9 9l1 0" />
                  <path d="M9 13l6 0" />
                  <path d="M9 17l6 0" />
                </svg>
                <span className="nav-link-title">&nbsp; Invoice </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
