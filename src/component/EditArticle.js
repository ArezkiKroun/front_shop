import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditArticle() {

  let navigate = useNavigate();

  const { id } = useParams();

  //Modifier les informations de l'article
  const [article, setArticle] = useState({
    designation: "",
    marque: "",
    prixUnit: "",
    qStock: "",
  });

  const { designation, marque, prixUnit, qStock } = article;

  const onInputChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadArticle();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8888/articles/${id}`, article);
    alert("✔️ L'Article a été modifier avec succès!");
    navigate("/homearticle");
  };

  //Récupérer les infos de l'article seléctionner
  const loadArticle = async () => {
    const result = await axios.get(`http://localhost:8888/articles/${id}`);
    setArticle(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Modifer Le produit</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Designation
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="saisir le designation"
                name="designation"
                value={designation}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Marque
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="saisir la marque"
                name="marque"
                value={marque}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Prix
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="saisir le prix"
                name="prixUnit"
                value={prixUnit}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Quantité en stock
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="saisir la quantité"
                name="qStock"
                value={qStock}
                onChange={(e) => onInputChange(e)}
              />
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