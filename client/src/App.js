import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import User from './components/GetUser/User';
import Add from './components/AddUser/Add';
import Edit from './components/UpdateUser/Edit';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<User />} />
          <Route path='/add' element={<Add />} />
          <Route path='/edit/:id' element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
