import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function AddArticle() {
  let navigate = useNavigate();

  const { id } = useParams();

  //Ajouterun article
  const [article, setArticle] = useState({
    designation: "",
    marque: "",
    prixUnit: "",
    qStock: "",
    category_id:"",
  });
  const { designation, marque, prixUnit, qStock, category_id, shop_id } = article;

  const onInputChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
    console.log(e.target.name)
  };
  console.log(article.designation)

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:8888/articles`, article);
    alert("✔️ L'Article a été ajouté avec succès!");
    navigate(`/homearticle`);
  };

  //récupérer la liste des catégories
  const [categorys, setCategorys] = useState([]
  );
  useEffect(() => {
    loadCategory()
  }, []);

  const loadCategory = async () => {
    const result = await axios.get("http://localhost:8888/categories");
    setCategorys(result.data);
    console.log(result.data)
  };

  return (
    <div className="container">
      <div className="row">
        <h2 className="text-center m-4">Ajouter un nouveau article</h2>
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Choisir la categorie de l'article
              </label>
              <select name="category_id"
                className="form-control" onChange={(e) => onInputChange(e)}>
                {categorys.map((categories, index) => (
                  <option value={categories.id}>
                    {categories.title}
                  </option>
                ))
                }
              </select>

              <label htmlFor="Name" className="form-label">
                Designation de l'article
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="saisir la désignation"
                name="designation"
                required
                value={designation}
                onChange={(e) => onInputChange(e)}
              />

              <label htmlFor="Name" className="form-label">
                Marque
              </label>
              <input
              required
                type={"text"}
                className="form-control"
                placeholder="saisir la marque"
                name="marque"
                value={marque}
                onChange={(e) => onInputChange(e)}
              />
              <label htmlFor="Name" className="form-label">
                Prix
              </label>
              <input
              required
              pattern='[0-9][0-9][0-9]*[.][0-9][0-9][0-9]*'
              title="veuiilez renseigner un format valide du montant xx.xx "
                type={"text"}
                className="form-control"
                placeholder="xx.xx"
                name="prixUnit"
                value={prixUnit}
                onChange={(e) => onInputChange(e)}
              />
              <label htmlFor="Name" className="form-label">
                Quantité
              </label>
              <input
              required
              pattern='[0-9]*'
              title="veuiilez renseigner que des chiffres"
                type={"text"}
                className="form-control"
                placeholder="xx......."
                name="qStock"
                value={qStock}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Enregistrer
            </button>
            <Link className="btn btn-outline-danger mx-2" to={`/homearticle`}>
              Annuler
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}