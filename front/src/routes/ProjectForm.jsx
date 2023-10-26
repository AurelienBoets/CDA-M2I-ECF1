import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ProjectForm = () => {
  const [searchParam] = useSearchParams();
  const navigate = useNavigate();
  let title = useRef();
  let description = useRef();
  let endDate = useRef();
  let state = useRef();
  let startDate = useRef();
  const [project, setProject] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    state: "",
  });
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (searchParam.get("mode") === "edit" && searchParam.get("id") !== "") {
      axios
        .get(`http://localhost:3000/projects/${searchParam.get("id")}`)
        .then((resp) => {
          setProject(resp.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLoading(false);
    }
  }, [searchParam]);

  const add = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3000/projects`, {
        title: title.current.value,
        description: description.current.value,
        startDate: startDate.current.value,
        endDate: endDate.current.value,
        state: state.current.value,
      })
      .then((resp) => {
        console.log(resp.status);
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/");
  };

  const edit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/projects/${searchParam.get("id")}`, {
      title: title.current.value,
      description: description.current.value,
      startDate: startDate.current.value,
      endDate: endDate.current.value,
      state: state.current.value,
      id: project.id,
    });
    navigate("/");
  };
  if (isLoading === true) {
    return <></>;
  }
  return (
    <>
      <h1>
        {searchParam.get("mode") === "edit"
          ? `Modifier le project ${project.title}`
          : "Ajouter un projet"}
      </h1>
      <form onSubmit={searchParam.get("mode") === "edit" ? edit : add}>
        <div className="ms-1 mb-3 w-50">
          <label htmlFor="name" className="form-label">
            Titre
          </label>
          <input
            type="text"
            name="title"
            ref={title}
            className="form-control"
            defaultValue={project.title}
          />
        </div>
        <div className="ms-1 mb-3 w-50">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            name="description"
            ref={description}
            className="form-control"
            defaultValue={project.description}
          />
        </div>
        <div className="ms-1 mb-3 w-50">
          <label htmlFor="endDate" className="form-label">
            Date de début
          </label>
          <input
            type="date"
            name="startDate"
            className="form-control"
            defaultValue={project.startDate}
            ref={startDate}
          />
        </div>
        <div className="ms-1 mb-3 w-50">
          <label htmlFor="endDate" className="form-label">
            Date de fin
          </label>
          <input
            type="date"
            name="endDate"
            className="form-control"
            defaultValue={project.endDate}
            ref={endDate}
          />
        </div>
        <div className="ms-1 mb-3 w-50">
          <label htmlFor="state" className="floatingSelcet">
            Statut
          </label>
          <select
            name="state"
            className="form-select"
            ref={state}
            defaultValue={project.state}
          >
            <option value="Non débuté">Non débuté</option>
            <option value="En cours">En cours</option>
            <option value="En attente">En attente</option>
            <option value="Terminé">Terminé</option>
          </select>
        </div>
        <button className="btn btn-primary ms-1 mt-3" type="submit">
          Valider
        </button>
        <button
          className="btn btn-danger ms-2 mt-3"
          type="button"
          onClick={() => navigate("/")}
        >
          Retour
        </button>
      </form>
    </>
  );
};

export default ProjectForm;
