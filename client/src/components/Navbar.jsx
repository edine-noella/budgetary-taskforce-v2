import {  Link, useLocation  } from 'react-router-dom'

function Navbar() {
    const { pathname } = useLocation()
    if (pathname === '/landingPage') return null
  return (    
    
<nav className="bg-white border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">       
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <div className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <Link to= "/expenses" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:p-0 dark:text-white" aria-current="page">
          Expenses
        </Link>
        <Link to="/income" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:p-0 dark:text-white" aria-current="page">
         Income
        </Link>
        <Link to="/categories" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:p-0 dark:text-white" aria-current="page">
          Categories
        </Link>
        <Link to="/subcategories" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:p-0 dark:text-white" aria-current="page">
          SubCategories
        </Link>
        <Link to="/landingPage" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:p-0 dark:text-white" aria-current="page">
          Back to Landing Page
        </Link>
      </div>
    </div>
  </div>
</nav>


  )
}

export default Navbar