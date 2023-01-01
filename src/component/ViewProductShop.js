import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft, faChevronLeft, faChevronRight, faLeftLong, faPlus, faRefresh } from '@fortawesome/free-solid-svg-icons'
import { margin } from "@mui/system";
export default function ViewUser() {
  let navigate = useNavigate();
  const [shop, setShop] = useState({
    nom: "",
    articleCount:"",
    articles: ({
    }, []),
    horaires: ({
    }, []),
  });

  const { id } = useParams();

  useEffect(() => {
    loadShop();
  }, []);

  const loadShop = async () => {
    const result = await axios.get(`http://localhost:8888/shops/${id}`);
    setShop(result.data);
  //  console.log(result)
  console.log(`${id}`)
  };

  //recuperer la liste des articles
  const [article, setArticle] = useState([]
  );

  useEffect(() => {
    loadArticle()
  }, []);

  const loadArticle = async () => {
    const result = await axios.get("http://localhost:8888/articles");
    setArticle(result.data);
  //  console.log(result.data)
  };
 // console.log(article.id)

  //Recuperer l'id de l'article
  const [catarticle, setCatarticle] = useState({
    article_id: "",
  });

  const { article_id } = catarticle;

  const onInputChange = (e) => {
    setCatarticle({ ...catarticle, [e.target.name]: e.target.value });
  //  console.log(e.target.name)
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:8888/articles/${catarticle.article_id}/shops`, shop);
    alert("✔️ l'Article a été assignée a la boutique avec succès!");
    navigate(`/shops/${id}`);
   
  
  };
  /*
  console.log(catarticle.article_id)
  console.log(article)


  console.log(shop.articles.designation);
  */
/*
  const deleteArticle = async (id) => {
    await axios.delete(`http://localhost:8888/articles/${id}`);
    alert("✔️ L'Article a été supprimé avec succès!");
    window.location.reload();

  };
  */
//fonction qui calcul le numero de la semaine courrante
const currentDate = new Date();
const startDate = new Date(currentDate.getFullYear(), 0, 1);
const days = Math.floor((currentDate - startDate) /
  (24 * 60 * 60 * 1000));	
var weekNumber = Math.ceil(days / 7);
// Display the calculated result	

const [horaire, setHoraire] = useState([]);

useEffect(() => {
  loadHoraires()
}, []);


const loadHoraires = async () => {
  const result = await axios.get(`http://localhost:8888/horaires/shops/${id}/${x}`);
  setHoraire(result.data);
  navigate(`/shops/${id}`);
 
console.log(result.data.articleCount)
};

 

var x= localStorage.getItem("FakeToken")
console.log(x);

const decrementer = async() => {
  weekNumber=weekNumber-1
  localStorage.setItem('FakeToken', weekNumber)
 }

 const incrementer = async() => {
  weekNumber=weekNumber+1
  localStorage.setItem('FakeToken', weekNumber)
 }

const deletehoraire = async (id) => {
  await axios.delete(`http://localhost:8888/horaires/${id}`);
  alert("✔️ L'horaire a été supprimé avec succès!");
  loadHoraires();
};

//filtre de rechrche
 //Filtre de rechrche
 const [searchField, setsearchField] = useState('');

 const filtreedarticle=shop.articles.filter(local=>(
   local.designation.toLowerCase().includes(searchField.toLowerCase())
));


  return (
    <div className="container" style={{width: '90%',  marginLeft: '-7%',border:'none' }}>
      <div className="row" style={{ width: '110%', marginLeft: '-10%' }}>
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow" style={{ marginLeft: '21%',width: '90%' }}>
          <h2 className="text-center m-4" style={{ width: '90%' }}>
            Details de la boutique : {shop.nom} </h2>

          <div className="card" style={{marginLeft: '5%', width: '90%' }}>
            <div className="card-header" style={{ width: '100%', }}>
              <h3>Details</h3>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Nom: </b>
                  {shop.nom}
                </li>
                
                
                  <br></br>
                  <li className="list-group-item">
                    <br></br>
                    <div style={{ display: 'flex', textalign: 'center', marginLeft: '3%', justifyContent: 'space-between' }}>
                      <h3>List des produits de la boutique : {shop.nom}</h3>
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
                      <table style={{ textAlign: 'center'}} className="table border shadow">
                      
                        <thead style={{overflowY:'none'}}>
                          <tr>
                            <th scope="col">S.N</th>
                            <th scope="col">Nom article</th>
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
               

                <br></br>
                <li className="list-group-item">
                  <br></br>
                  <div style={{ display: 'flex', width: '120%', justifyContent:'space-between' }}>
                  <h3  style={{ marginLeft: '10%'}}>Horaires de la boutique: {shop.nom} </h3>
                 <br></br>     
                  <button style={{ marginRight: '30%', borderRadius: '5px', border: '0px', height: '40px', width: '5%' }}>
                    <Link to={`/addhoraire/${shop.id}`}>
                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                    </Link>
                  </button>
                 </div>
                 <br></br>
                 <h4 style={{color:'gray'}}>Semaine: <b>{x}</b></h4>
                
                 <center>
                  <div style={{display:'flex', justifyContent:'space-between', width:'20%'}}>
                  <FontAwesomeIcon style={{cursor:'pointer'}} icon={faChevronLeft} onClick={() =>{decrementer()}}></FontAwesomeIcon>
                  <FontAwesomeIcon style={{cursor:'pointer'}}icon={faRefresh} onClick={() => window.location.reload()}></FontAwesomeIcon>
                  <FontAwesomeIcon style={{cursor:'pointer'}}icon={faChevronRight} onClick={() => {incrementer()}}></FontAwesomeIcon>
                  
                  </div>
                  </center>
                  <br></br>
                  <div>
                  <table style={{marginLeft: '-2%',width: '50px',}}>
                    <th> <td>&nbsp;</td>
                    
                      {horaire.map((hor, index) => (
                        <th>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>{hor.day}
                            <td style={{ color: 'gray' }}>{hor.date}
                              <td style={{ color: 'green' }}>{hor.beginTime}
                                <td>{hor.endTime}
                                  <td>
                                    <Link
                                      className="btn btn-outline-primary mx-2"
                                      to={`/edithoraire/${hor.id}`}>
                                      Modifier
                                    </Link>
                                    <td>
                                  <button className="btn btn-danger mx-2"
                                      onClick={() => deletehoraire(hor.id)} 
                                      >
                                        Supprimer
                                      </button>
                                  </td>
                                  </td>
                                </td>      
                              </td>
                            </td>
                          </td>
                        </th>
                      ))
                      }
                    </th>
                  </table>
                  </div>
                  
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/"}>
            Retour a l'acceuil
          </Link>
        </div>
      </div>
    </div>

  );
}