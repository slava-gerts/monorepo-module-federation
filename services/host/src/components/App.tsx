import { Link, Outlet } from 'react-router-dom'

export const App = () => {
  return (
    <div data-testid="App">
      <Link to="/shop/main">Shop</Link>
      <br/>
      <Link to="/about">About</Link>
      <Outlet />
    </div>
  )
}