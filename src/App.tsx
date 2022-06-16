import routes from './config/routes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App bg-slate-700 min-h-screen">
      <BrowserRouter>
        <Routes>
            {routes.map((route, index) => {
                return (
                    <Route 
                    key={index}
                    path={route.path}
                    element={<route.component/>}
                    />
                    );
                })}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
