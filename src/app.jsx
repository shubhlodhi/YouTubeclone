import { useState } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import viteLogo from '/vite.svg'
import './app.css'
import Header from '../components/header'
import Desktop from '../components/feed/feed'
import Category from '../components/category_filter/filter'
import { Outlet } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Children } from 'react'
import Form from '../components/form/froms'
import Home from '../components/home/home'
import { createContext, useContext } from 'react'
import { usercontext } from '../components/form/contextform'
// import Singlepage from '../components/singlepage/singelpage'
import Vediodata from '../components/vedios/vedio'
import Signupform from '../components/signupform/singup'
import Loginform from '../components/loginform/login'
import Search from '../components/search/search'
import Categorypage from '../components/category/category'
import Vedioplayer from '../components/vediosplaye/vediosplayer'
import Chanelpage from '../components/chanlepage/chanelpage'
import Registerchanle from '../components/chanlepage/registerchanel'
import Vediopl from '../components/vediosplaye/vedioplay'
// import 'react-toastify/dist/ReactToastify.css';
import { newusercontext } from '../components/form/contextform'


export function App() {
  const [info, setinfo] = useState(true) // Initialize state 'info' with default value true

  const [news, setnew] = useState(false)

  const [count, setCount] = useState(false) // Initialize state 'count' with default value false
  // Function to toggle the value of 'count' state

  function ontoggle(newvalue) {
    setCount(newvalue)  // Update the 'count' state with the new value passed to the function

  }




  return (
    <>
      {/* Providing 'newusercontext' and 'usercontext' to components in the component tree */}

      <newusercontext.Provider value={{ new: news, setnew }}>
        <usercontext.Provider value={{ update: info, setinfo }}>
          {/* Setting up the router for different routes */}


          <BrowserRouter>
            {/* Header component, passing 'count' state and 'ontoggle' function as props */}

            <Header ismini={count} Ontoggle={ontoggle} />
            {/* Define different routes and their respective components */}

            <Routes>
              <Route path="/" element={<Home counts={count} />} />

              <Route path="/form" element={<Form />} />
              {/* <Route path='/Singlepage' element={<Singlepage/>}></Route> */}
              <Route path="/vediopage" element={<Vediodata />}></Route>
              <Route path="/signupform" element={< Signupform />} />
              <Route path='/loginform' element={<Loginform />} />
              <Route path="/search" element={<Search value={count} />}></Route>
              <Route path='/categorypage/:id' element={<Categorypage value={count} />} />
              <Route path="/vedioplayer/:id" element={<Vediopl counts={count} />} />
              <Route path='/chanelpage' element={<Chanelpage />} />
              <Route path="/registerchanel/:id" element={<Registerchanle ismini={count} />} />
            </Routes>
          </BrowserRouter>

        </usercontext.Provider>
      </newusercontext.Provider>

    </>
  )
}
