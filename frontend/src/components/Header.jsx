import React from 'react'
import Logo from '../assets/logo.png'

function Header() {
  return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand d-flex align-items-center " href="#">
                <img src={Logo} width="50" height="50" class="d-inline-block align-top" alt=""/>
            </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
            <li class="nav-item active">
                <a class="nav-link" href="#">Home </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Posts</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Recipies</a>
            </li>
            <li class="nav-item">
                <a class="nav-link " href="#">Skillshare</a>
            </li>
            </ul>
        </div>
        </nav>
    </div>
  )
}

export default Header


