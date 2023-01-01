import React from 'react'
import { Link } from 'react-router-dom'
import image from '.././image/1.png';
export default function Navbar() {
  return (
    <div style={{backgroundColor:'red'}}>
     <nav style={{backgroundColor:'red'}}className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid" style={{marginRight:'5%', display:'flex',justifyContent:'space-between'}}>
       { /*<img src={image} width={50} height={34}alt='logo' ></img>*/} 
          <Link className="navbar-brand" to="/">
            Mes Boutiques
          </Link>
        <Link style={{marginLeft:'60%'}}className="btn btn-outline-light" to="/homearticle">
            Gerer les Articles
          </Link>
          <Link className="btn btn-outline-light" to="/homecategory">
            Gerer les Categories
          </Link>
        
          
        </div>
      </nav>
    </div>
  )
}