import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
export default function DetailArticle() {
  let navigate = useNavigate();

  //Recuperer les donnees de la categorie selectionner
  const [article, setArticle] = useState({
    designation: "",
    marque: "",
    prixUnit: "",
    qStock: "",
    categoryList: ({
    }, []),
  });

  const { id } = useParams();

  useEffect(() => {
    loadArticle();
  }, []);

  const loadArticle = async () => {
    const result = await axios.get(`http://localhost:8888/articles/${id}`);
    setArticle(result.data);
    console.log(result.data)
  };

  //récupérer la liste des categories
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
  console.log(categorys.category_id)

  //Recuperer l'id de la categorie
  const [catarticle, setCatarticle] = useState({
    category_id: "",
  });

  const { category_id } = catarticle;

  const onInputChange = (e) => {
    setCatarticle({ ...catarticle, [e.target.name]: e.target.value });
    console.log(e.target.name)
  };

  //Ajouter une catégorie a un article
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:8888/categories/${catarticle.category_id}/articles`, article);
    alert("✔️ la Catégorie a été assignée a l'Article avec succès!");
    navigate(`/articles/${id}`);
    window.location.reload();
  };
  console.log(catarticle.category_id)
  console.log(article)

  //Filtre de rechrche
  const [searchField, setsearchField] = useState('');

  const filtreedcategorie = article.categoryList.filter(local => (
    local.title.toLowerCase().includes(searchField.toLowerCase())
  ));

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Détails produits</h2>

          <div className="card">
            <div className="card-header">
              Details du produit : {article.id}
              <ul className="list-group list-group-flush">

                <li className="list-group-item">
                  <b>Désignation: </b>
                  {article.designation}
                </li>
                <li className="list-group-item">
                  <b>Marque: </b>
                  {article.marque}
                </li>
                <li className="list-group-item">
                  <b>Prix: </b>
                  {article.prixUnit}
                </li>
                <li className="list-group-item">
                  <b>Quantité: </b>
                  {article.qStock}
                </li>

                <li className="list-group-item">
                  <br></br>
                  <div style={{ display: 'flex', textalign: 'center', marginLeft: '3%', justifyContent: 'space-between' }}>
                    <h3>List des catégories de l'aricle: {article.designation}</h3>
                    <form onSubmit={(e) => onSubmit(e)} style={{ width: '60%' }}>
                      <div className="mb-3" style={{ width: '80%' }}>
                        <label htmlFor="Name" className="form-label">
                          Ajouter une autre catégorie
                        </label>
                        <div style={{ display: 'flex', width: '120%' }}>
                          <select name="category_id" style={{ marginRight: '10%', width: '150%' }}
                            onChange={(e) => onInputChange(e)}>
                            <option value="">--Choisissez une categorie...</option>
                            {categorys.map((categories, index) => (
                              <option value={categories.id}>
                                {categories.title}
                              </option>
                            ))
                            }
                          </select>

                          <button type="submit" style={{ marginRight: '10%', borderRadius: '5px', border: '0px', height: '40px', width: '30%' }}>
                            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                          </button>
                        </div>
                      </div>
                    </form>

                  </div>
                  <br></br>
                  <div className="ui icon input" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <br></br>
                    <input
                      style={{ width: '30%', marginRight: '35%' }}
                      type="text"
                      className="form-control"
                      placeholder="Chercher une categorie"
                      onChange={(e) => setsearchField(e.target.value)}
                    />
                  </div>
                  <br></br>
                  <center>
                  <div style={{overflowY:'scroll',height:'260px'}}>
                    <table style={{ textAlign: 'center' }} className="table border shadow">
                      <thead>
                        <tr>
                          <th scope="col">S.N</th>
                          <th scope="col">Catégorie</th>
                          <th scope="col">Détail</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                        {filtreedcategorie.sort((a, b) => a.designation > b.designation ? 1 : -1).map((categorie, index) => (
                          <tr>
                            <th scope="row" key={index}>
                              {index + 1}
                            </th>
                            <td>{categorie.title}</td>
                            <td>
                              <Link
                                className="btn btn-primary mx-2"
                                to={`/category/${categorie.id}`}>
                                Détails
                              </Link>
                            </td>
                          </tr>
                        ))
                        }
                      </tbody>
                    </table>
                    </div>
                  </center>
                </li>
              </ul>
            </div>
          </div>

          <Link className="btn btn-primary my-2"// to={`/shops/${article.shop.id}`}
            to='/homearticle'>
            Retour a l'acceuil
          </Link>

        </div>
      </div>
    </div>
  );
}