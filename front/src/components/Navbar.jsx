import { useNavigate, Outlet } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <main>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark text-white">
        <div className="container-fluid bg-dark">
          <span className="navbar-brand text-white">ProjetTrackerPro</span>
          <div className="collapse navbar-collapse">
            <ul
              className="navbar-nav me-auto mb-2 mb-lg-0"
              style={{ cursor: "pointer" }}
            >
              <li className="nav-item" onClick={() => navigate("/")}>
                Accueil
              </li>

              <li
                className="nav-item ms-4"
                onClick={() => navigate("/project/form?mode=add")}
              >
                Ajouter Projet
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </main>
  );
};

export default Navbar;
