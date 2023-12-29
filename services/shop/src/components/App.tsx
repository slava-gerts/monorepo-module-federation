import { Link, Outlet } from 'react-router-dom'

export const App = () => {
  return (
    <div data-testid="App">
      <h1>SHOP MODULE</h1>
      <div>123</div>
      <Outlet />
    </div>
  )
}