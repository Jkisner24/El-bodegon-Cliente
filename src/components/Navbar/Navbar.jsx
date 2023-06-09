import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAuth0User, getAllDishes, getAuth0User, setSavedCarrito, saveCarrito} from "../../redux/actions/actions";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
// import Badge from '@mui/material/Badge';
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
// import MailIcon from '@mui/icons-material/Mail';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from "@mui/icons-material/MoreVert";
// import SearchBar from './SearchBar'
import logoMini from "../../assets/logomini.png";
import LoginButton from "../LoginComponents/LoginButton/LoginButton";
import LogoutButton from "../LoginComponents/LogoutButton/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useFetcher, useLocation } from "react-router-dom";
import style from "./Navbar.module.css";
import SearchBar from "./SearchBar";
import {AiOutlineUser, AiOutlineShoppingCart} from "react-icons/ai"
import { useState } from "react";
import El_Bodegon_de_Tony from "../images/El_Bodegon_de_Tony.png"




export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const { isAuthenticated, user, isLoading } = useAuth0();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const dispatch = useDispatch()
  const usuarioActual = useSelector(state => state.user)
  const userLogged = useSelector(state => state.user)
  const cart = useSelector(state => state.cart)
  const [aux, setAux]=useState(0)
  const location =useLocation()


  useEffect(()=>{
    handleSaveCarrito(cart)
    console.log("pasoxuseeffect");
  },[cart])
  
  const handleSaveCarrito = (cart) => {
          if(userLogged){
            setAux(aux + 1)
            console.log(userLogged.sub)
            console.log(cart)
            dispatch(saveCarrito({cart, id: userLogged.sub}))
          } else {
            alert("login")
          }
        }
  useEffect(()=>{
    if(user){
      dispatch(createAuth0User(user))
      dispatch(getAuth0User(user.sub))
    }
  }, [user]);

  useEffect(() => {
    if (Object.entries(usuarioActual).length && user) {
      console.log(usuarioActual.cart);
      dispatch(setSavedCarrito(usuarioActual.cart));
    }
  }, [usuarioActual]);
  
  // useEffect(() => {
  //   if(Object.entries(usuarioActual).length){
  //     console.log(usuarioActual.cart);
  //     dispatch(setSavedCarrito(usuarioActual.cart))
  //   }
  // }, []);


  useEffect(() => {
    dispatch(getAllDishes());
    
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  //
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
      <MenuItem onClick={handleMenuClose}>Mis Pedidos</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Mensajes</p>
      </MenuItem> */}

      {/* <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notificaciones</p>
      </MenuItem> */}

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Perfil</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className={style.Navbar}>
          {/* Menu hamburguesa */}
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, border: '4px solid blue' }}
            
          >
            <MenuIcon />
          </IconButton> */}

          {/* Nombre y logo del site */}
          <Box
            sx={{
              width: "20%",
              display: "flex",
              alignItems: "center",
              height: "140px",
              margin: "30px",
              padding: "10px"
            }}
          >
            <Link to="/"><button className={style.buttonLogo}><img src={El_Bodegon_de_Tony} alt="Logo" className={style.logo}/></button></Link>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
            </Typography>
          </Box>
          <h2 className={style.titleNav}>El Bodegón de Tony</h2>
          {location.pathname === "/menu" && <SearchBar />}
          <Link to="/create">
            <button className={style.create}>Create</button>
          </Link>
          <Link to="/dashboard">
            <button className={style.create}>Dashboard</button>
          </Link>
          {/* Box para ocupar espacio */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Menu derecha */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {/* icono mensaje */}
            {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton> */}

            {/* icono notificacion */}
            {/* <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}


      {!isAuthenticated ? <Link to='/account/login'><AiOutlineUser className={style.login}/></Link> : <><p>Bienvenido {user.nickname}!</p> <LogoutButton/></> }

            {/* icono usuario */}
            {!isAuthenticated? "" :
            <Link to='account'><img className={style.userPicture} src={user.picture} alt={user.name}/></Link>
            }
            <Link to='cart'><AiOutlineShoppingCart className={style.cart}/></Link>
          </Box>

          {/* Menu responsive */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            {/* <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton> */}
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}

    </Box>
  );
}
