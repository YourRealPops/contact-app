import './App.css';
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/Navbar';
import Home from './containers/Home'
import Contact from './containers/Contact';

function App() {
  return (
    <>
      <div className='App'>
        {/* NavBar */}
        <NavBar />
        {/* pages contents */}
        <div className='App__pageContents'>
          <Routes>
            <Route index path='/' element={<Home />} />
            <Route path='/contact' element={<Contact />}/>

          </Routes>
        </div>

      </div>
    </>
  );
}

export default App;
