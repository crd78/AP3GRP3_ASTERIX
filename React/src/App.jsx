// import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './Pages/Navbar/Navbar';

function App() {

  return (
    <div className="App">
      <Navbar />
      <ToastContainer
        position="top-center"
        autoClose={8000}
        transition={Flip}
      />
    </div>
  )
}

export default App
