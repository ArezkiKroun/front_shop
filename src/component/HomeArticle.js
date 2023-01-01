import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import PaginationArt from "./PaginationArt";
export default function HomeArticle() {

  //récupérer la liste des articles
  const [articless, setArticless] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadArticle()
  }, []);

  const loadArticle = async () => {
    const result = await axios.get("http://localhost:8888/articles");
    setArticless(result.data);

  };
  //supprimer l'article séléctionnée
  const deleteArticle = async (id) => {
    await axios.delete(`http://localhost:8888/articles/${id}`);
    alert("✔️ L'article a été supprimé avec succès!");
    loadArticle();
  };

  //Filtre de recherche
  const [searchField, setsearchField] = useState('');

  const filtreedarticle = articless.filter(local => (
    local.designation.toLowerCase().includes(searchField.toLowerCase())

  ));

  return (
    /*
    <div className="container">
    <div className="ui search">
      <br></br>
      <h2 className="text-center m-4" style={{width:'90%'}}>Liste des Catégories </h2>
        <div className="ui icon input" style={{display:'flex',justifyContent:'space-between'}}>
          <br></br>
          <input
          style={{width:'30%'}}
            type="text"
            className="form-control"
            placeholder="Chercher une boutique"
          onChange={(e)=>setsearchField(e.target.value)}
          />
          <button style={{borderRadius:'5px',border:'2px',height:'40px',width:'5%'}}>
            <Link to="/addcategorie">
                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
             </Link>
            </button>
          <i className="search icon"></i>
        </div>
      </div>

      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">id categorie</th>
              <th scope="col">nom</th>
             
              <th scope="col">Détails</th>
              <th scope="col">Modifier</th>
              <th scope="col">Supprimer</th>
              
            </tr>
          </thead>
          <tbody>
            {filtreedcategorie.sort((a, b) => a.title > b.title ? 1 : -1).map((categories, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{categories.id}</td>
                <td>{categories.title}</td>
                
                <td>
                  <Link className="btn btn-primary mx-2"
                  to={`/category/${categories.id}`}
                >
                 
                    Détails
                  </Link>
                  </td> <td>
                  <Link className="btn btn-outline-primary mx-2"
                 to={`/editcategorie/${categories.id}`}
              >
                    Modifier
                  </Link>
                  </td><td>
                  <button className="btn btn-danger mx-2"
                  onClick={() => deleteCategorie(categories.id)} 
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
        ))
         }
          </tbody>
        </table>
      </div>
      
    </div>
    */
    <div>
      <PaginationArt data={articless}>
      </PaginationArt>

    </div>
  );
}