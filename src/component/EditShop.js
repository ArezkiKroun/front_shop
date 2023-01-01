import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
export default function EditUser() {

  let navigate = useNavigate();

  const { id } = useParams();

  //Modifier de la boutique sélectionner
  const [shop, setShop] = useState({
    nom: "",
    isVacation:"",
  });

  const { nom,isVacation} = shop;

  const onInputChange = (e) => {
    setShop({ ...shop, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadShop();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8888/shops/${id}`, shop);
    alert("✔️ La boutique a été modifier avec succès!");
    navigate("/");
  };

  //récupérer les données de la boutique séléctionner
  const loadShop = async () => {
    const result = await axios.get(`http://localhost:8888/shops/${id}`);
    setShop(result.data);
  };

  /*
    const [inputFields, setInputFields] = useState([
      { name: '', salary: '' }
    ])
    const addFields = () => {
      let newField = { name: '', salary: '' }
      setInputFields([...inputFields, newField])
  };
  const removeFields = (index) => {
      let data = [...inputFields];
      data.splice(index, 8)
      setInputFields(data)
  }
  const submit = (e) => {
    e.preventDefault();
    console.log(inputFields)
  }
              <form onSubmit={submit}>
              <div>
                <div>
                    {inputFields.map((input, index) => {
                  return (
                    <div key={index}>
                      <input
                        name='name'
                        placeholder='Name'
                      />
                      <input
                        name='salary'
                        placeholder='Salary'
                      />  
                      <button onClick={() => removeFields(index)}>Remove</button>         
                    </div>
                  )
                })}
              </div>
              <button onClick={addFields}>Ajouter plus</button>
            </div>          
             </form>
  */

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Modifer Le nom de la boutique</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Nom
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="saisir le nom"
                name="nom"
                value={nom}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3" style={{  width: '100%' }}>
                            <label htmlFor="Name" className="form-label">
                                Ouvert / Congee
                            </label>
                            <div style={{ display: 'flex', width: '110%' }}>
                            <select name="isVacation" style={{ marginRight: '10%' ,width: '100%',height:'30%'}}
                                 value={isVacation} onChange={(e) => onInputChange(e)}>
                               
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