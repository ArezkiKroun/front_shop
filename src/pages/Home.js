import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import PaginationTable from "./PaginationTable";
import Pag from "./Pag";
export default function Home() {

  //Afficher la listes des boutiques
  const [shopss, setShopss] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadShops()
  }, []);

  const loadShops = async () => {
    const result = await axios.get("http://localhost:8888/shops");
    setShopss(result.data);
    console.log(result.data)
  };

  //Supprimer la boutique séléctionnée
  const deleteShop = async (id) => {
    await axios.delete(`http://localhost:8888/shops/${id}`);
    alert("✔️ La boutique a été supprimé avec succès!");
    loadShops();
  };

  //Filtre de Recherche
  const [searchField, setsearchField] = useState('');

  const filtreedshop = shopss.filter(local => (
    local.nom.toLowerCase().includes(searchField.toLowerCase())
    ||
    local.createdAt.toLowerCase().includes(searchField.toLowerCase())

  ));
console.log(shopss.statut)
  return (
    /*
    <div className="container">
      
      <div className="ui search">
      <br></br>
      <h2 className="text-center m-4" style={{width:'90%'}}>Liste des boutiques </h2>
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
            <Link to="/addshop">
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
              <th scope="col">id boutique</th>
              <th scope="col">nom</th>
              
              <th scope="col">Detail</th>
              <th scope="col">Modifier</th>
              <th scope="col">Supprimer</th>
            </tr>
          </thead>
          <tbody>
            {filtreedshop.sort((a, b) => a.nom > b.nom  && a.createdAt  > b.createdAt && a.articles? 1 : -1).map((shops, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{shops.id}</td>
                <td>{shops.nom}</td>
               
                
                <td>
                  <Link className="btn btn-primary mx-2"
                  to={`/shops/${shops.id}`}>
                    Détails
                  </Link>
</td><td>
                  <Link className="btn btn-outline-primary mx-2"
                  to={`/editshop/${shops.id}`}>
                    Modifier
                  </Link>
                  </td>
<td>
                  <button className="btn btn-danger mx-2"
                   onClick={() => deleteShop(shops.id)} >
                    Supprimer
                  </button>
                </td>
              </tr>
        ))
         }
          </tbody>
        </table>
        
      </div>
      */
    <div>
      <PaginationTable data={shopss}>

      </PaginationTable>


    </div>
  );
}