import React from 'react'
import { Logo, LogoutBtn, Container } from '../index'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    { name: 'Home', slug: "/", active: true }, 
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ]

  return (
    <header className='py-4 shadow-md bg-gray-800'>
      <Container>
        <nav className='flex items-center'>
          <div className='mr-8'>
            <Link to='/'>
              <Logo width='60px' />
            </Link>
          </div>
          <ul className='flex ml-auto space-x-6'>
            {navItems.map((item) => (
              item.active ? (
                <li key={item.slug}>
                  <Link
                    to={item.slug}
                    className='px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition duration-300'
                  >
                    {item.name}
                  </Link>
                </li>
              ) : null
            ))}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header;

