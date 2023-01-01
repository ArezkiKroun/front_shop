import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddUser() {

  let navigate = useNavigate();

  //Ajouter uneboutique
  const [shop, setShop] = useState({
    nom: "",
    isVacation: "",
  });

  const { nom, isVacation } = shop;

  const onInputChange = (e) => {
    setShop({ ...shop, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8888/shops", shop);
    alert("✔️ La boutique a été ajouté avec succès!");
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Ajouter une nouvelle Boutique</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Nom
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="saisir le nom"
                required
                pattern='[a-zA-Z0-9]*'
                title="veuiilez renseigner que des lettres majiscule et/ou miniscule et/ou des chiffres"
                name="nom"
                value={nom}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3" style={{ width: '100%' }}>
              <label htmlFor="Name" className="form-label">
                Ouvert / Congee
              </label>
              <div style={{ display: 'flex', width: '110%' }}>
                <select required name="isVacation" style={{ marginRight: '10%', width: '100%', height: '30%' }}
                  onChange={(e) => onInputChange(e)}>
                  <option value="">--Choisissez un Statut...</option>
                  <option value={false}>Work</option>
                  <option value={true}>Vacation</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Enregistrer
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Annuler
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}