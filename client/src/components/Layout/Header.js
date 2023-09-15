import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import  toast  from 'react-hot-toast'
import SearchForm from '../Form/SearchForm'
import useCategory from '../../hooks/useCategory'
import { useCart } from '../../context/Cart'
import {Badge} from 'antd'
import "../../styles/Headers.css"
function Header() {
  const categories=useCategory();
  const [cart]=useCart();
  const [auth,setAuth]=useAuth()
  const handlelogout=()=>{
    setAuth({
      ...auth,
      user:null,
      token:"",
    })
    localStorage.removeItem('auth');
    toast.success("Logout Successful");
}
  return (
    <> 
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <Link to="/" className="navbar-brand">
       <img src='./favicon.ico'></img> Ecommerce app
      </Link>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <SearchForm/> 
        <li className="nav-item">
          <NavLink to="/" className="nav-link ">Home</NavLink>
        </li>

        <li className="nav-item dropdown">
        <Link 
        className="nav-link dropdown-toggle"  
        data-bs-toggle="dropdown"
        >
          Categories
      </Link>
  <ul className="dropdown-menu">
  <li>
      <Link to={`/categories`} className="dropdown-item" href="#">
      All Categories
      </Link>
    </li>
  {categories?.map(c=>(
     
     <li key={c._id}>
      <Link  to={`/category/${c.slug}`} className="dropdown-item" >
      {c.name}
      </Link>
    </li>
     
  ))}
  </ul>
        </li>

        <li className="nav-item">
        </li>
        {
          !auth.user ? (<>
          <li className="nav-item">
          <NavLink to="/register" className="nav-link">
            Register
          </NavLink>
          </li> 
          <li className="nav-item">
          <NavLink  to="/login" className="nav-link" >
            Login
          </NavLink>
          </li>
          </>) : (<>
           <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           {auth?.user.name}
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <NavLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user' }`} className="dropdown-item" href="#">
                  Dashboard
                </NavLink>
              </li>
              <li>
                  <NavLink onClick={handlelogout}  to="/login" className="dropdown-item" >
                        Logout 
                    </NavLink>
              </li> 
        </ul>
          </li>


           </>)
        }
        <li className="nav-item">
        <Badge count={cart.length}>
        <NavLink to="/cart" className="nav-link">
          Cart
        </NavLink>
        </Badge>
        </li>
      </ul>
    </div>
  </div>
</nav>

    </>
  )
}

export default Header