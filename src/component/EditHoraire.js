import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

export default function EditArticle() {

  let navigate = useNavigate();

  const { id } = useParams();
 
  //Modifier les informations de l'heure sélectionner
  const [horaire, setHoraire] = useState({
    beginTime: "",
    date: "",
    day: "",
    endTime: "",
    weekNum: "",
    year: "",
  });

  const { beginTime, date, day, endTime, weekNum, year } = horaire;

  const onInputChange = (e) => {
    setHoraire({ ...horaire, [e.target.name]: e.target.value });
  };
  console.log(horaire.beginTime)
  console.log(horaire.id)

  useEffect(() => {
    loadHoraire();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8888/horaires/${id}`, horaire);
    alert("✔️ L'horaire a été modifier avec succès!");
  };

  //Récupérer les infos de l'heure sélectionner
  const loadHoraire = async () => {
    const result = await axios.get(`http://localhost:8888/horaires/${id}`);
    setHoraire(result.data);
  };

  const retour = () =>{
    navigate(-1)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Modifer une horaire</h2>

          <form onSubmit={(e) => onSubmit(e)}>
           
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                heure de début
              </label>
              <input
                type={"time"}
                className="form-control"
                placeholder="saisir l'heure de début"
                name="beginTime"
                value={beginTime}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                heure fin
              </label>
              <input
                type={"time"}
                className="form-control"
                placeholder="saisir l'heure de fin"
                name="endTime"
                value={endTime}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Enregistrer
            </button>
            <Link
            to='/'
            className="btn btn-outline-danger mx-2" >
              Annuler
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}