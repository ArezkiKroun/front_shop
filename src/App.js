import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import AddShop from "./component/AddShop"
import ViewProductShop from "./component/ViewProductShop"
import EditShop from "./component/EditShop"
import EditArticle from "./component/EditArticle";
import DetailArticle from "./component/DetailArticle";
import AddArticle from "./component/AddArticle";
import EditHoraire from "./component/EditHoraire";
import HomeCategory from "./component/HomeCategory";
import DetailCategorie from "./component/DetailCategorie";
import AddCategorie from "./component/AddCategorie";
import EditCategorie from "./component/EditCategorie";
import HomeArticle from "./component/HomeArticle"
import AddHoraire from "./component/AddHoraire"

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addshop" element={<AddShop />} />
          <Route exact path="/shops/:id" element={<ViewProductShop />} />
          <Route exact path="/editshop/:id" element={<EditShop />} />

          <Route exact path="/homecategory" element={<HomeCategory/>} />
          <Route exact path="/category/:id" element={<DetailCategorie/>} />
          <Route exact path="/addcategorie" element={<AddCategorie />} />
          <Route exact path="/editcategorie/:id" element={<EditCategorie />} />

          <Route exact path="/addarticle" element={< AddArticle/>} />
          <Route exact path="/editarticle/:id" element={<EditArticle />} />
          <Route exact path="/articles/:id" element={<DetailArticle />} />
          <Route exact path="/homearticle" element={<HomeArticle />} />

          <Route exact path="/edithoraire/:id" element={<EditHoraire />} />

          <Route exact path="addhoraire/:id" element={<AddHoraire />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
