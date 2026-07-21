import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
	return (
		<header>
			<Link to="/">Home</Link>
			<Link to="/About">About</Link>
			<Link to="/Posts">Posts</Link>
			<Link to="/Photos">Photos</Link>
			<Link to="/Profile">Profile</Link>
			<Link to="/Contact">Contact</Link>
		</header>
	)
}

export default Header