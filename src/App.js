import { useState, createContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './App.css';
import shoe from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './pages/Detail.js';
import Cart from './pages/cart.js';
import axios from 'axios';

export const Context1 = createContext();

function App() {
  const [shoes, setShoes] = useState(shoe);
  const [stock] = useState([10, 11, 12]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  const urls = [
    'https://codingapple1.github.io/shop/data2.json',
    'https://codingapple1.github.io/shop/data3.json',
  ];
  return (
    <div className='App'>
      {/* <Link to='/'>홈</Link> */}
      {/* <Link to='detail'>상세페이지</Link> */}

      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand onClick={() => navigate('/react-shop')}>
            Jayful
          </Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link
              onClick={() => {
                navigate('/react-shop');
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate('/about');
              }}
            >
              About
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate('/detail');
              }}
            >
              Detail
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate('/cart');
              }}
            >
              Cart
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path='/react-shop'
          element={
            <>
              <div className='main-bg'>
                <Button shoes={shoes} setShoes={setShoes} />
              </div>
              <div className='container'>
                <div className='row'>
                  {loading ? (
                    <div>loading</div>
                  ) : (
                    <Items navigate={navigate} shoes={shoes} />
                  )}
                </div>
              </div>
              <button
                onClick={() => {
                  if (offset == urls.length) {
                    alert('もうないです');
                    return;
                  }
                  if (offset < urls.length) {
                    setLoading(true);
                    axios
                      .get(urls[offset])
                      .then(data => {
                        setShoes([...shoes, ...data.data]);
                        setOffset(prev => prev + 1);
                      })
                      .catch(() => console.log)
                      .finally(() => setLoading(false));
                  }
                }}
              >
                button
              </button>
            </>
          }
        />
        <Route path='/about' element={<About />}>
          <Route path='member' element={<div>member</div>} />
        </Route>
        <Route
          path='/detail/:id'
          element={
            <Context1.Provider value={{ stock, shoes }}>
              <Detail shoes={shoes} />
            </Context1.Provider>
          }
        />
        <Route path='/cart' element={<Cart />} />
        <Route path='event' element={<EventPage />}>
          <Route path='one' element={<p>初めてのお客様にプレゼント</p>} />
          <Route path='two' element={<p>誕生日プレゼントをもらう</p>} />
        </Route>
        <Route path='*' element={<div>404</div>} />
      </Routes>
    </div>
  );
}

function Button(props) {
  // const [a, setA] = useState;
  return (
    <button
      onClick={() => {
        const sort = [...props.shoes].sort((a, b) =>
          a.title - b.title ? 1 : -1
        );
        props.setShoes(sort);
      }}
    >
      정렬
    </button>
  );
}
function EventPage() {
  return (
    <div>
      <h2>今日のイベント</h2>
      <Outlet></Outlet>
    </div>
  );
}
function About() {
  return (
    <div>
      <h2>About</h2>
      <Outlet></Outlet>
    </div>
  );
}
function Items(props) {
  return props.shoes.map(item => {
    return (
      <div
        key={item.id}
        className='col-md-4'
        onClick={() => {
          props.navigate(`/detail/${item.id}`);
        }}
      >
        <img src={item.img} width='80%' />
        <h4>{item.title}</h4>
        <p>{item.content}</p>
        <p>{item.price}</p>
      </div>
    );
  });
}

export default App;
