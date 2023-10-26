import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProjectDetails = () => {
  const param = useParams();
  const id = param.id;
  const [project, setProject] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/projects/${id}`)
      .then((resp) => {
        setProject(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const deleteProject = () => {
    axios
      .delete(`http://localhost:3000/projects/${id}`)
      .then((resp) => {
        console.log(resp.status);
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/");
  };
  return (
    <div className="bg-dark container text-white rounded mt-5">
      <h1>{project.title}</h1>
      <hr />
      <div>
        <span>Nom du projet :</span>
        <span className="fw-medium"> {project.title}</span>
        <br />
        <span>Description :</span>
        <span className="fw-medium"> {project.description}</span>
        <br />
        <span>Date de début :</span>
        <span className="fw-medium"> {project.startDate}</span>
        <br />
        <span>Date de fin :</span>
        <span className="fw-medium"> {project.endDate}</span>
        <br />
        <span>Statut :</span>
        <span className="fw-medium"> {project.state}</span>
        <br />
      </div>
      <hr />
      <div className="pb-3">
        <span
          className="btn btn-warning   p-1 ms-3"
          onClick={() => navigate(`/project/form?mode=edit&id=${id}`)}
        >
          <i className="bi bi-pencil-square"></i>
          Modifier
        </span>
        <span
          className="btn btn-danger  text-dark p-1 ms-3"
          onClick={() => deleteProject(id)}
        >
          <i className="bi bi-trash"></i>
          Supprimer
        </span>
      </div>
    </div>
  );
};

export default ProjectDetails;
