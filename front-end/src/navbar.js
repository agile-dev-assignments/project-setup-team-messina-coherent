import { slide as Menu } from "react-burger-menu";
import './navbar.css';
import Sidebar from './sidebar.js';


function NavBar(){
    return (
        <div id="navbar">
              <Sidebar />
              <ul id="nav">
                <li><a class="logo" href="#"><img src="/logo.png"/></a></li>
              </ul>
        </div>
    );
}

export default NavBar;