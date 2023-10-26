import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import Project from "../components/Project";

const Home = () => {
  const [projects, setProjects] = useState([""]);
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const urlFilter = searchParam.get("filter");
  let filter;
  switch (urlFilter) {
    case "attente":
      filter = "En attente";
      break;
    case "nondebut":
      filter = "Non débuté";
      break;
    case "cours":
      filter = "En cours";
      break;
    case "termine":
      filter = "Terminé";
      break;
    default:
      filter = "";
  }

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/projects")
      .then((resp) => {
        setProjects(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteProject = (id) => {
    axios
      .delete(`http://localhost:3000/projects/${id}`)
      .then(() => {
        setProjects(projects.filter((project) => id !== project.id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (projects.length <= 0) {
    return (
      <>
        <h1 className="mt-5">Aucun Projet</h1>
      </>
    );
  }
  return (
    <div className="mt-1">
      <div className="mb-3">
        <h5>Filtre</h5>
        <span
          className="btn btn-primary ms-1"
          onClick={() => navigate("/?filter=attente")}
        >
          En attente
        </span>
        <span
          className="btn btn-primary ms-1"
          onClick={() => navigate("/?filter=termine")}
        >
          Terminé
        </span>
        <span
          className="btn btn-primary ms-1"
          onClick={() => navigate("/?filter=nondebut")}
        >
          Non débuté
        </span>
        <span
          className="btn btn-primary ms-1"
          onClick={() => navigate("/?filter=cours")}
        >
          En cours
        </span>
        <span className="btn btn-primary ms-1" onClick={() => navigate("/")}>
          Aucun filtre
        </span>
      </div>
      <ul className="list-group list-group-flush border">
        {projects.map((project, index) => (
          <Project
            project={project}
            filter={filter}
            remove={deleteProject}
            key={index}
          />
        ))}
      </ul>
    </div>
  );
};

export default Home;
