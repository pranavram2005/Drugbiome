import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Subject from './Subject';
import Microbes from './Microbes';
import Home from './Home';
import Aboutus from './Aboutus';
import Analytics from './Analytics';
import Layout from './Layout';
function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path="aboutus" element={<Aboutus/>} />
          <Route path="analytics" element={<Analytics/>} />
          <Route path='subject' element={<Subject/>}/>
          <Route path='microbes' element={<Microbes/>}/>
        </Route>
      </Routes>
    </BrowserRouter>      
    </div>
  );
}

export default App;
