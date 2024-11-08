
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Login from './login/login';
import Home from './home/Home';
import Register from './register/register';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route index element={<Home />} >
      </Route>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Login/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
