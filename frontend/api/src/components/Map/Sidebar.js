import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const routes = [
  { path: '/map',
    exact: true,
  },
  { path: '/car',    
  },
]

const Sidebar = () => (
  <Router>
    <div style={{ display: 'flex' }}>
      <div style={{
        width: '1200px',
        height: '50px',
        margin: '0px 100px 0px 100px',
        background: '#f0f0f0',
        
      }}>
      
         <ul>
         <il style={{
           textAlign: 'center',
           flex: 1,
           listStyleType: 'none',
           padding: '30px'
         }}><Link to="/map">MAP </Link></il>
         <il style={{
           textAlign: 'center',
           flex: 1,
           listStyleType: 'none',
           padding: '30px'
         }}><Link to="/car">CARS</Link></il>
       </ul>

       
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.sidebar}
          />
        ))}
      </div>

      <div style={{ flex: 1, padding: '10px' }}>
        {routes.map((route, index) => (
          // Render more <Route>s with the same paths as
          // above, but different components this time.
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        ))}
      </div>
    </div>
  </Router>
)

export default Sidebar


