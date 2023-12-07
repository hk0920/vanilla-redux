import React from 'react';
import {Routes, Route, HashRouter} from 'react-router-dom';
import { Detail } from './routes/Detail';
import Home from './routes/Home';


function App() {
  return (
    <HashRouter>
			<div id="wrap">
				<Routes>
					<Route index path="/" element={<Home />}></Route>
					<Route index path="/:id" element={<Detail />}></Route>
				</Routes>
			</div>
		</HashRouter>
  )
  
}

export default App;
