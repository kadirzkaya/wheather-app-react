import { useContext, useEffect } from 'react';
import './App.css';
import Cities from './components/Cities';
import WhetherContext from './context/context';

function App() {
  const {fetchCities}=useContext(WhetherContext);

  useEffect(()=>{
    fetchCities();
  },[])

  return (
    
    <div className="App">
      <Cities />
    </div>
  );
}

export default App;
