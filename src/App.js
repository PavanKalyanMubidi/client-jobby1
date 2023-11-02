import {Routes,Route} from 'react-router-dom';
import './App.css';

import Home from '../src/Components/Home/Home';
import Auth from '../src/Components/Auth/Auth';
import Jobs from '../src/Components/Jobs/Jobs'
import JobItemDetails from './Components/JobItemDetails';
import Assessment from './Assignment';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/auth" element={<Auth />}/>
        <Route exact path="/" element={<Home />}/>
        <Route exact path='/jobs' element={<Jobs />}/>
        <Route exact path='/jobs/:id' element={<JobItemDetails/>} />
        <Route exact path='/assign' element={<Assessment/>} />
      </Routes>
    </div>
  );
}

export default App;
