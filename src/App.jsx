import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import AuthContext from "./context/AuthContext";

function App() {
  return (
    <AuthContext>
      <div className="App">
        <Header></Header>
        <Outlet></Outlet>
      </div>
    </AuthContext>
  );
}

export default App;
