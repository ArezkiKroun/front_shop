import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function AddCategorie() {

    const { id } = useParams();
    let navigate = useNavigate();

    console.log(`${id}`)
    //Ajouter unenouvelle horaire
    const [horaire, setHoraire] = useState({
        shop_id: "",
        weekNum: "",
        day: "",
        date: "",
        beginTime: "",
        endTime: "",
    });

    const { shop_id, weekNum, day, date, beginTime, endTime } = horaire;

    const onInputChange = (e) => {
        setHoraire({ ...horaire, [e.target.name]: e.target.value });
        console.log(e.target.name)
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:8888/horaires/shops/${id}`, horaire);
        alert("✔️ l'horaire a été ajoutée a l'article avec succès!");
        navigate(`/addhoraire/${id}`);
        window.location.reload();
    };

    //fonction qui calcul le numéro de la semaine courrante
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor((currentDate - startDate) /
        (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil(days / 7);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Ajouter un horaire</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Numéro du weekend
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="saisir le numéro du weekend"
                                name="weekNum"
                                value={weekNum}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3" style={{  width: '100%' }}>
                            <label htmlFor="Name" className="form-label">
                                Jour
                            </label>
                            <div style={{ display: 'flex', width: '110%' }}>
                            <select name="day" style={{ marginRight: '10%' ,width: '100%'}}
                                 onChange={(e) => onInputChange(e)}>
                                <option value="">--Choisissez un jour...</option>
                                <option value="Lundi">Lundi</option>
                                <option value="Mardi">Mardi</option>
                                <option value="Mercredi">Mercredi</option>
                                <option value="Jeudi">Jeudi</option>
                                <option value="Vendredi">Vendredi</option>
                                <option value="Samedi">Samedi</option>
                                <option value="Dimanche">Dimanche</option>

                            </select>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Date
                            </label>
                            <input
                                type={"date"}
                                className="form-control"
                                placeholder="saisir la date"
                                name="date"
                                value={date}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Heure début
                            </label>
                            <input
                                type={"time"}
                                className="form-control"
                                placeholder="saisir l'heure de début"
                                name="beginTime"
                                value={beginTime}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Heure fin
                            </label>
                            <input
                                type={"time"}
                                className="form-control"
                                placeholder="saisir l'heure de fin"
                                name="endTime"
                                value={endTime}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-primary">
                            Enregistrer
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to={`/shops/${id}`}>
                            Annuler
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}