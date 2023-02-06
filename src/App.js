import {BrowserRouter,Route,Routes} from "react-router-dom"
import Dashboard from "./Dashboard";
import Home from "./Home";
import Topic from "./Topic";
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/dashboard/:id" element={<Dashboard/>}/>
        <Route path="/topic/:id" element={<Topic/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
