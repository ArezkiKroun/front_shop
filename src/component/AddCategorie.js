import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddCategorie() {

  let navigate = useNavigate();

  //Ajouter une catégorie
  const [categorie, setCategorie] = useState({
    title: "",
    tva: "",
  });

  const { title, tva } = categorie;

  const onInputChange = (e) => {
    setCategorie({ ...categorie, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8888/categories", categorie);
    alert("✔️ La categorie a été ajouté avec succès!");
    navigate("/homecategory");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Ajouter une nouvelle categorie</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Nom
              </label>
              <input
              required
              pattern='[a-zA-Z0-9]*'
              title="veuiilez renseigner que des lettres majiscule et/ou miniscule et/ou des chiffres"
                type={"text"}
                className="form-control"
                placeholder="saisir le nom"
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
              required
                type={"text"}
                className="form-control"
                placeholder="saisir la TVA"
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