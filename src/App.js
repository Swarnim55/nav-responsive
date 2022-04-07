// import MiniNav from "./Mini-nav";
import { ReactComponent as MenuIcon } from './images/menu_icon.svg';
import { ReactComponent as Male } from './images/male.svg';
import { ReactComponent as Female } from './images/female.svg';
import { ReactComponent as ArrowLeft } from './images/arrow-left.svg';


import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
function App() {
  return (
   
      <Navbar>
        <NavItem icon={<MenuIcon />}>
          {/* DropDown Goes Here */}
          <DropdownMenu></DropdownMenu>
        </NavItem>
      </Navbar>
 
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        {props.children}
      </ul>
    </nav>
  );
}

function NavItem(props) {

  const [open, setOpen] = useState(false);



  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}

    </li>
  );
}


function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
      setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    }, [])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);

  }


  function DropdownItem(props) {
    return (
      <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button"> {props.leftIcon} </span>
        {props.children}
        <span className="icon-right"> {props.rightIcon} </span>
      </a>
    )
  }
  return (
    <div className="dropdown" style={{ height: menuHeight }}  ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === 'main'}
         timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >

        <div className="menu">
          <DropdownItem
            leftIcon={<Male />}
            goToMenu="male"
          > Men

          </DropdownItem>
          <DropdownItem leftIcon={<Female />} goToMenu="female">Women</DropdownItem>
          <DropdownItem  goToMenu="kids">Kids</DropdownItem>
        </div>

      </CSSTransition>

      <CSSTransition 
      in={activeMenu === 'male'}  
      timeout={500} 
      classNames="menu-secondary" 
      unmountOnExit 
      onEnter={calcHeight}>

        <div className="menu">
          <DropdownItem
          goToMenu="main"
            leftIcon={<ArrowLeft />}> Men </DropdownItem>

          <DropdownItem>T-shirts</DropdownItem>
          <DropdownItem>Jackets</DropdownItem>
          <DropdownItem>Jeans</DropdownItem>
          <DropdownItem>Sweaters</DropdownItem>
   
        </div>

      </CSSTransition>

      <CSSTransition 
      in={activeMenu === 'female'}  
      timeout={500} 
      classNames="menu-secondary" 
      unmountOnExit 
      onEnter={calcHeight}>

        <div className="menu">
          <DropdownItem
          goToMenu="main"
            leftIcon={<ArrowLeft />}> Women </DropdownItem>

          <DropdownItem>T-shirts</DropdownItem>
          <DropdownItem>Tops</DropdownItem>
          <DropdownItem>Dresses</DropdownItem>
          <DropdownItem>Jeans</DropdownItem>
          
        </div>

      </CSSTransition>
      <CSSTransition 
      in={activeMenu === 'kids'}  
      timeout={500} 
      classNames="menu-secondary" 
      unmountOnExit 
      onEnter={calcHeight}>

        <div className="menu">
          <DropdownItem
          goToMenu="main"
            leftIcon={<ArrowLeft />}> Kids </DropdownItem>

          <DropdownItem>T-shirts</DropdownItem>
          <DropdownItem>Shorts</DropdownItem>
          <DropdownItem>Dresses</DropdownItem>
          <DropdownItem>Jeans</DropdownItem>
          
        </div>

      </CSSTransition>


    </div>
  )
}







export default App;
