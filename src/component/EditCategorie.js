import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditCategorie() {

  let navigate = useNavigate();

  const { id } = useParams();

  //Modifier les infos de la catégorie sélectionner
  const [categorie, setCategorie] = useState({
    title: "",
    tva: "",
  });

  const { title, tva } = categorie;

  const onInputChange = (e) => {
    setCategorie({ ...categorie, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadCategorie();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8888/categories/${id}`, categorie);
    alert("✔️ La categorie a été modifier avec succès!");
    navigate("/homecategory");
  };

  //récuperer les données de la catégorie sélectionner
  const loadCategorie = async () => {
    const result = await axios.get(`http://localhost:8888/categories/${id}`);
    setCategorie(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Modifer Le nom de la boutique</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Titre
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="saisir le titre"
                name="title"
                value={title}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                TVA
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="saisir la tva"
                name="tva"
                value={tva}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Enregistrer
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/homecategory">
              Annuler
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}