import { useEffect } from 'react'
import './App.css'
import { useSelector } from 'react-redux'
import { StatesType } from './assets/types'
import AddCategory from './components/AddCategory'
import Category from './components/Category'
import ManageWidgets from './components/ManageWidgets'
import SearchWidgets from './components/SearchWidgets'

function App() {
  const { categories, manageWidgetsVisibility } = useSelector((states: StatesType) => states)

  useEffect(() => {
    const mainDashboardContainer = document.getElementById('main-dashboard-container') as HTMLDivElement;
    if (manageWidgetsVisibility) {
      mainDashboardContainer.style.opacity = '0.2';
    } else {
      mainDashboardContainer.style.opacity = '1';
    }
  }, [manageWidgetsVisibility])

  return (
    <div className='mb-4'>
      <div id='main-dashboard-container' className='container d-flex flex-column align-items-center justify-content-center'>
        <div className='mt-3 container d-flex justify-content-between align-items-center'>
          <h1>Dashboard</h1>
          <div className='d-flex justify-content-center align-items-center'>
            <SearchWidgets />
            <AddCategory />
          </div>
        </div>
        <div className='container d-flex flex-column align-items-center justify-content-center'>
          {categories.map(category => {
            return <Category category={category} />
          })}
        </div>
      </div>
      {manageWidgetsVisibility ? <ManageWidgets /> : <></>}
    </div>
  )
}

export default App
