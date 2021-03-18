import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './sidebar.css';

function Sidebar(){
  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>
      <a className="menu-item" href="/myTaste">
        My Taste
      </a>
      <a className="menu-item" href="/byWeather">
        Playlists +
      </a>
    </Menu>
  );
};
export default Sidebar;