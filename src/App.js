import {BrowserRouter as Router ,Routes, Route,} from 'react-router-dom'
import Header from './component/Header';
import Home from './component/Home';
import Exchange from './component/Exchange'
import CoinDetail from './component/CoinDetail'
import Coin from'./component/Coin'
import Footer from './component/Footer';




function App() {
  return (
   <Router>
    <Header />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/exchange' element={<Exchange />}/>
      <Route path='/coin' element={<Coin />}/>
      <Route path='/Coin/:id' element={<CoinDetail />}/>
    </Routes>
    <Footer />
   </Router>
  );
}

export default App;
