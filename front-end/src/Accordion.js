
import React, { useRef, forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IoIosArrowForward } from 'react-icons/io';

const Accordion = forwardRef(({ question, answer, index, isOpened, duration = 300, onClick }, ref) => {
  const accBody = useRef();
  const arrow = useRef();

  useEffect(() => {
    if(isOpened) {
      ref.current[index].classList.add('opened');
      accBody.current.style.transitionDuration = duration + 'ms';
      arrow.current.style.transitionDuration = duration + 'ms';
      accBody.current.style.display = 'block';
      arrow.current.style.transform = 'rotate(90deg)';
    }
  }, [isOpened, index, ref, duration]);

  const openAccordionHandler = () => {
    ref.current[index].classList.add('opened', 'disable-click');
    onClick(index, ref, closeAccordionHandler);
    
    const content = accBody.current;
    content.style.transitionDuration = duration + 'ms';
    arrow.current.style.transitionDuration = duration + 'ms';
    content.style.display = 'block';
    const height = content.offsetHeight;
    content.style.height = 0;

    setTimeout(() => {
      arrow.current.style.transform = 'rotate(90deg)';
      content.style.height = height + 'px';
    }, 20);

    setTimeout(() => {
      content.style.height = 'auto';
      ref.current[index].classList.remove('disable-click');
    }, duration + 20);
  }

  const closeAccordionHandler = (el = null) => {
    let accEl = ref.current[index];
    let content = accBody.current;
    let arrowEl = arrow.current;

    if(el) {
      accEl = el;
      content = accEl.querySelector('.accordion__body');
      arrowEl = accEl.querySelector('.accordion__head span');
    }

    arrowEl.style.transform = 'rotate(0deg)';
    content.style.height = content.offsetHeight + 'px';
    accEl.classList.remove('opened');
    accEl.classList.add('disable-click');

    setTimeout(() => {
      content.style.height = 0;
    }, 20);

    setTimeout(() => {
      content.style.display = 'none';
      content.style.height = null;
      accEl.classList.remove('disable-click');
    }, duration + 20);
  }

  const accordionClickHandler = () => {
    if(ref.current[index].classList.contains('opened')) {
      closeAccordionHandler();
    }else {
      openAccordionHandler();
    }
  }

  return(
    <div className="accordion" ref={el => ref.current[index] = el}>
      <div className="accordion__head">
        <p onClick={accordionClickHandler}>{question}
        <span ref={arrow}><IoIosArrowForward /></span></p>
      </div>
      <div className="accordion__body" ref={accBody}>
        <div className="accordion__body_inner">
          {answer}
        </div>
      </div>
    </div>
  );
});

Accordion.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isOpened: PropTypes.bool,
  duration: PropTypes.number,
  onClick: PropTypes.func
}

export default Accordion;