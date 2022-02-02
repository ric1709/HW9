import React, { useEffect, useState } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); //бул состояния логин кылганббы деген состояния

  useEffect(() => {
    const storedUserLoggedInfo = localStorage.getItem('isLoggedIn') //storedUserLoggedInfo ключ менен isLoggedIn алып атабыз
    if (storedUserLoggedInfo === '1') { //биякта если регистрация 1 ге барабар болуп калса storedUserLoggedInfo true бойдон кылып коё беребиз
      setIsLoggedIn(true)
    }
  },[])

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn','1') //setItem иштейт только тогда когда loginHandler onSubmit менен чакырылса
    setIsLoggedIn(true); //loginHandler setIsLoggedIn ди true кылып коёот и ошондо Home render болот
  };

  const logoutHandler = () => {
    setIsLoggedIn(false); //а биякта false кылып коёт
    localStorage.removeItem('isLoggedIn') //а биякта если logout басылса localStorage тазаланат
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {/* setIsLoggedIn false болуп калса пустой болуп тура берет*/}
        {isLoggedIn && <Home onLogout={logoutHandler} />} 
        {/* setIsLoggedIn true болуп калса Home render болот */}
      </main>
    </React.Fragment>
  );
}

export default App;
