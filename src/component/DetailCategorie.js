import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
export default function ViewUser() {
  let navigate = useNavigate();

  //Récuperer les détails de la catégorie sélectionner
  const [categorie, setCategorie] = useState({
    title: "",
    tva: "",
    articles: ({
    }, []),
  });

  const { id } = useParams();

  useEffect(() => {
    loadCategorie();
  }, []);

  const loadCategorie = async () => {
    const result = await axios.get(`http://localhost:8888/categories/${id}`);
    setCategorie(result.data);
    console.log(result)
  };


  //récupérer la liste des articles de cette catégorie
  const [article, setArticle] = useState([]
  );

  useEffect(() => {
    loadArticle()
  }, []);

  const loadArticle = async () => {
    const result = await axios.get("http://localhost:8888/articles");
    setArticle(result.data);
    console.log(result.data)
  };
  console.log(article.id)

  //Ajouter de nouveaux articles a cette catégorie
  const [catarticle, setCatarticle] = useState({
    article_id: "",
  });

  const { article_id } = catarticle;

  const onInputChange = (e) => {
    setCatarticle({ ...catarticle, [e.target.name]: e.target.value });
    console.log(e.target.name)
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:8888/articles/${catarticle.article_id}/categories`, categorie);
    alert("✔️ l'Article a été assignée a la Catégorie avec succès!");
    navigate(`/category/${id}`);
    window.location.reload();
  };
  console.log(catarticle.article_id)
  console.log(article)

  /*
    const deleteArticle = async (id) => {
      await axios.delete(`http://localhost:8888/articles/${id}`);
      alert("✔️ L'Article a été supprimé avec succès!");
      window.location.reload();
  
    };
  */
 //Filtre de rechrche
 const [searchField, setsearchField] = useState('');

 const filtreedarticle= categorie.articles.filter(local=>(
   local.designation.toLowerCase().includes(searchField.toLowerCase())
));
   
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Détails de la categorie</h2>

          <div className="card">
            <div className="card-header">
              Détails de la categorie : {categorie.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Nom: </b>
                  {categorie.title}
                </li>
                
                <li className="list-group-item">
                  <b>TVA: </b>
                  {categorie.tva}
                </li>
                <li className="list-group-item">
                  <br></br>
                  <div style={{ display: 'flex', textalign: 'center', marginLeft: '3%', justifyContent: 'space-between' }}>
                    <h3>List des articles de la categorie: {categorie.nom}</h3>
                    <form onSubmit={(e) => onSubmit(e)} style={{ width: '60%' }}>
                      <div className="mb-3" style={{ width: '80%' }}>
                        <label htmlFor="Name" className="form-label">
                          Ajouter un autre article
                        </label>
                        <div style={{ display: 'flex', width: '120%' }}>
                          <select name="article_id" style={{ marginRight: '10%', width: '150%' }}
                             onChange={(e) => onInputChange(e)}>
                            <option value="">--Choisissez un article...</option>
                            {article.map((articl, index) => (
                              <option value={articl.id}>
                                {articl.designation}
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
                  <div className="ui icon input" style={{display:'flex',justifyContent:'space-between'}}>
          <br></br>
          <input
          style={{width:'30%',marginRight:'35%'}}
            type="text"
            className="form-control"
            placeholder="Chercher un article"
          onChange={(e)=>setsearchField(e.target.value)}
          />
          </div>
          <br></br>
                  <center>
                    
                  <div style={{overflowY:'scroll',height:'260px'}}>
                    <table style={{ textAlign: 'center' }} className="table border shadow">
                      <thead>
                        <tr>
                          <th scope="col">S.N</th>
                          <th scope="col">Nom Produit</th>
                          <th scope="col">Prix</th>
                            <th scope="col">Marque</th>
                            <th scope="col">Detail</th>  
                        </tr>
                      </thead>
                      <tbody>
                        {filtreedarticle.sort((a, b) => a.designation > b.designation ? 1 : -1).map((articles, index) => (
                          <tr>
                            <th scope="row" key={index}>
                              {index + 1}
                            </th>
                            <td>{articles.designation}</td>
                            <td>{articles.prixUnit}</td>
                              <td>{articles.marque}</td>
                            <td>
                              <Link
                                className="btn btn-primary mx-2"
                                to={`/articles/${articles.id}`}>
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
            to='/homecategory'>
            Retour a l'acceuil
          </Link>
        </div>
      </div>
    </div>
  );
}