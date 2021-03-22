import React, { Fragment, useRef } from 'react';
import PropTypes from 'prop-types';

import Accordion from './Accordion.js';

const Accordions = ({ duration, data, closeOthers, opened}) => {
  const accEl = useRef([]);

  const clickHandler = (index, ref, close) => {
    if(closeOthers) {
      ref.current.forEach((el, idx) => {
        if(index !== idx) {
          close(el);
        }
      });
    }
  }

  return(
    <Fragment>
      { data.map((accordion, index) => (
        <Accordion 
          key={index}
          question={accordion.question}
          answer={accordion.answer}
          isOpened={opened === index}
          index={index}
          duration={duration}
          onClick={clickHandler}
          ref={accEl}
        />
      )) }
    </Fragment>
  );
}

Accordions.propTypes = {
  duration: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  closeOthers: PropTypes.bool,
  opened: PropTypes.number
}

export default Accordions;