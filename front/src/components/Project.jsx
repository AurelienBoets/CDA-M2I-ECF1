import { useNavigate } from "react-router-dom";

const Project = (props) => {
  const { project, filter, remove } = props;
  const navigate = useNavigate;

  const deleteProject = (id) => {
    remove(id);
  };
  if (filter === project.state || filter === "") {
    return (
      <>
        <li className="list-group-item">
          <span className="h5 ms-3 me-5">{project.title}</span>
          <span className="position-absolute top-50 start-50 translate-middle fw-medium">
            Statut: {project.state}
          </span>
          <span
            className="btn btn-danger me-5 text-dark p-1 float-end"
            onClick={() => deleteProject(project.id)}
          >
            <i className="bi bi-trash"></i>
            Supprimer
          </span>
          <span
            className="btn btn-warning  me-3 p-1 float-end"
            onClick={() => navigate(`/project/form?mode=edit&id=${project.id}`)}
          >
            <i className="bi bi-pencil-square"></i>
            Modifier
          </span>
          <span
            className="btn btn-info p-1 me-3 float-end"
            onClick={() => {
              navigate(`/project/${project.id}`);
            }}
          >
            <i className="bi bi-eye"></i> Détails
          </span>
        </li>
      </>
    );
  }
  return <></>;
};

export default Project;
