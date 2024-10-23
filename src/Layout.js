import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/aboutus">Aboutus</Link>
          </li>
          <li>
            <Link to="/analytics">Analytics</Link>
          </li>
          <li>
            <Link to="/subject">Subject</Link>
          </li>
          <li>
            <Link to="/microbes">Microbes</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;