import React, { useEffect, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState(''); //email жазыш учун
  const [emailIsValid, setEmailIsValid] = useState(false); //email ди валидныйбы текшерет
  const [enteredPassword, setEnteredPassword] = useState('');//пароль жазыш учун
  const [passwordIsValid, setPasswordIsValid] = useState(false); //пароль ду валидныйбы текшерет
  const [formIsValid, setFormIsValid] = useState(false); //форманы валидныйбы текшерет эгер форма пустой болуп калса false болуп тура берет
 
  //useEffect используя этот хук вы говорите React сделать что-то после рендера React запомнит функцию 
  useEffect(() => {
    //debouncing - это когда пользователь часто печатает и useEffect не на что не реагирует только когда пользователь закочит печатать через несколько времени useEffect сработает и это называется debouncing
    const identiFier =  setTimeout(() => { 
      console.log('valid'); //
      setFormIsValid(enteredEmail.includes('@') && enteredPassword.trim().length > 6) //биз бул жерде биринчиси true болсо анан ээкинчи инпутту иштет деп атабыз
      
    },2000)

    //clean up function
    return () => { //бул таймерибизди тазалап турат
      console.log('clean up'); //сколько раз setФункция чакырылса столько раз и clean up cработает
      clearTimeout(identiFier)//он здесь  подчищает логику useEffect до того как последний таймер не сработает и через 2 секунды выходит valid
    }

    },[setFormIsValid ,enteredEmail,enteredPassword]) //enteredEmail и enteredPassword озгорсо  useEffect и тогда он и сработает ,а setFormIsValid он не на что не повлияет

  const emailChangeHandler = (event) => { //биз бул с помощью onChange emailChangeHandler ди Input ка сактап жатабыз и ещё алардын valueсин алып туруп enteredEmail ке сактап жатабыз
    setEnteredEmail(event.target.value);

  };

  const passwordChangeHandler = (event) => { //биз бул с помощью onChange passwordChangeHandler  ди Input ка сактап жатабыз и ещё алардын valueсин алып туруп enteredPassword ка сактап жатабыз
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));//бул жерде enteredEmail дин если собачкасы бар болсо emailIsValid бизге true кайтарып коёот
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6); //бул жерде enteredPasswordты trim кылып узундугун проверка кылып если выше 6 ти болсо  passwordIsValid true кайтарып коёот
  };

  const submitHandler = (event) => {
    event.preventDefault(); //preventDefault чтобы отключить действие form по умолчанию
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${//бул жерде classes control деген класс алып жатат
            emailIsValid === false ? classes.invalid : ''  //бирок биз условиядагы берип жатабыз если emailIsValid false болуп калса бизге classes.invalid берип кой деп
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail} //бул жерде двух строчная привязка болду
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler} //бул событие бул true или false алат
          />
        </div>
        <div
          className={`${classes.control} ${ //бул жерде classes control деген класс алып жатат
            passwordIsValid === false ? classes.invalid : '' //бирок биз условиядагы берип жатабыз если passwordIsValid false болуп калса бизге classes.invalid берип кой 
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword} //бул жерде двух строчная привязка болду
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler} //бул событие бул true или false алат
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>   {/*disabled будет true только тогда когда весь formIsValid true болгондо disabled бул buttonдун функциясы*/}        
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
