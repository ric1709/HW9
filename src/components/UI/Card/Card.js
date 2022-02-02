import React from 'react';

import classes from './Card.module.css';

const Card = (props) => {
  return (
    <div className={`${classes.card} ${props.className}`}>{props.children}</div>
    /*props.children менен биз компонентке произвольный дочерний элементерди кошулсун деп жатабыз*/
  );
};

export default Card;
