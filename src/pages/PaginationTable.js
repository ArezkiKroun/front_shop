import * as React from 'react';
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { TableHead } from '@mui/material';
import image from './../image/boutique.png';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData('Cupcake', 305, 3.7),
  createData('Donut', 452, 25.0),
  createData('Eclair', 262, 16.0),
  createData('Frozen yoghurt', 159, 6.0),
  createData('Gingerbread', 356, 16.0),
  createData('Honeycomb', 408, 3.2),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Jelly Bean', 375, 0.0),
  createData('KitKat', 518, 26.0),
  createData('Lollipop', 392, 0.2),
  createData('Marshmallow', 318, 0),
  createData('Nougat', 360, 19.0),
  createData('Oreo', 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));


export default function PaginationTable({ data }) {
  console.log("data", data)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //récupérer la liste des boutiques
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

  //Supprimer la boutique séléctionner
  const deleteShop = async (id) => {
    await axios.delete(`http://localhost:8888/shops/${id}`);
    alert("✔️ La boutique a été supprimé avec succès!");
    loadShops();
  };

  //Filtre de rechrche
  const [searchField, setsearchField] = useState('');

  const filtreedshop = shopss.filter(local => (
    local.nom.toLowerCase().includes(searchField.toLowerCase())
    ||
    local.createdAt.toLowerCase().includes(searchField.toLowerCase())
    ||
    local.articleCount.toString().includes(searchField.toString())
    ||
    local.statut.toLowerCase().includes(searchField.toLowerCase())

  ));

  var nbr = 77
  var y = nbr.toString();

  console.log(shopss.id)

  //fonction qui calcul le numero de la semaine courrante
  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  const days = Math.floor((currentDate - startDate) /
    (24 * 60 * 60 * 1000));
  const weekNumber = Math.ceil(days / 7);
  // Display the calculated result	
  console.log(weekNumber)


  return (

    <div className="container">
      <TableContainer component={Paper}>
        <div className="ui search">
          <br></br>
          <div style={{ marginRight: '20%', display: 'flex', justifyContent: 'space-between' }}>
            <h2 className="text-center m-4" style={{ width: '90%' }}>Liste des boutiques </h2>
            <img src={image} width={150} height={150} alt='logo' ></img>
          </div>
          <br></br>
          <div className="ui icon input" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <br></br>
            <input
              style={{ width: '30%' }}
              type="text"
              className="form-control"
              placeholder="Chercher une boutique"
              onChange={(e) => setsearchField(e.target.value)}
            />
            <button style={{ borderRadius: '5px', border: '2px', height: '40px', width: '5%' }}>
              <Link to="/addshop">
                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
              </Link>
            </button>
            <i className="search icon"></i>
          </div>
        </div>
        <br></br>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableCell component="th" scope="col">
              <b>S.N</b>
            </TableCell>
            <TableCell component="th" scope="col">
              <b>Nom</b>
            </TableCell>
            <TableCell component="th" scope="row">
              <b>Date de creation</b>
            </TableCell>
            <TableCell component="th" scope="col">
              <b> Nombre d'articles</b>
            </TableCell>
            <TableCell component="th" scope="col">
              <b> Statut</b>
            </TableCell>
            <TableCell component="th" scope="col">
              <b>Détails</b>
            </TableCell>
            <TableCell component="th" scope="col">
              <b> Modifer</b>
            </TableCell>
            <TableCell component="th" scope="col">
              <b>Supprimer</b>
            </TableCell>

          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filtreedshop.sort((a, b) => a.nom > b.nom && a.createdAt > b.createdAt && a.articleCount < b.articleCount? 1 : -1).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((row, index) => (
              <TableRow key={index}>
                <TableCell scope="row" key={index}>
                  {index + 1}
                </TableCell>        
                <TableCell component="th" scope="row">
                  {row.nom}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.createdAt}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.articleCount}
                </TableCell>

                {row.statut=="Vacation" ? (
                <TableCell component="th" scope="row">
                <p style={{color:'red'}}>{row.statut}</p>
              </TableCell>
              ) : (
                <TableCell component="th" scope="row">
                <p style={{color:'green'}}>{row.statut}</p>
              </TableCell>
              ) }
      
                <TableCell component="th" scope="row">
                  <Link className="btn btn-primary mx-2"
                    to={`/shops/${row.id}`}>
                    Détails
                  </Link>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Link className="btn btn-outline-primary mx-2"
                    to={`/editshop/${row.id}`}>
                    Modifier
                  </Link>
                </TableCell>
                <TableCell component="th" scope="row">
                  <button className="btn btn-danger mx-2"
                    onClick={() => deleteShop(row.id)}
                  >
                    Supprimer
                  </button>
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'nombre de boutique par page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}