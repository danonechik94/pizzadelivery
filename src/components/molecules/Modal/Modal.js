import React from 'react';

import cls from 'classnames';
import styles from  './Modal.scss';

import { Transition, CSSTransition } from 'react-transition-group';
import { Portal } from 'react-portal';
import CrossIcon from 'icons/Cross';


const overlayAnimationClassNames = {
  appear: styles.overlayIsHidden,
  appearActive: styles.overlayIsShowing,
  appearDone: styles.overlayIsShowed,
  enter: styles.overlayIsHidden,
  enterActive: styles.overlayIsShowing,
  enterDone: styles.overlayIsShowed,
  exit: styles.overlayIsShowed,
  exitActive: styles.overlayIsHiding,
  exitDone: styles.overlayIsHidden,
};

const bodyAnimationClassNames = {
  appear: styles.bodyIsHidden,
  appearActive: styles.bodyIsShowing,
  appearDone: styles.bodyIsShowed,
  enter: styles.bodyIsHidden,
  enterActive: styles.bodyIsShowing,
  enterDone: styles.bodyIsShowed,
  exit: styles.bodyIsShowed,
  exitActive: styles.bodyIsHiding,
  exitDone: styles.bodyIsHidden,
};


const Modal = ({ 
  open, 
  fullScreen,
  closeModal, 
  children,
  scrollable
}) => {

  let _inBody = false;
  let _inOutside = false;

  const handleMouseDown = (event) => {
    _inBody = true;
    event.stopPropagation();
  };

  const handleMouseUp = (event) => {
    event.stopPropagation();
    if (_inOutside) {
      _inBody = true;
      _inOutside = false;
    } else {
      _inBody = false;
    }
  };

  const handleMouseDownOutside = (event) => {
    event.stopPropagation();
    _inOutside = true;
  };

  const handleMouseUpOutside = (event) => {
    _inOutside = false;
    event.stopPropagation();
  };

  const _preventBubble = (event) => {
    event.stopPropagation();
  }

  const handleOutsideClick = (event) => {
    if (_inBody) {
      // catches mousedown started from body and ended on wrapper
      // (we normally could select text like this)
      _inBody = false;
      return;
    }

    if (closeModal) {
      closeModal();
    }
  }

  const handleCloserClick = (event) => {
    if (closeModal) {
      closeModal();
    }
  };
  
  return (
    <Transition
        in={open}
        appear={open}
        timeout={300}
        mountOnEnter={true}
        unmountOnExit={true}
      >
        <Portal>
          <div>
            <div className={cls(styles.layout, { [styles.fullscreen]: fullScreen })}>
              {!fullScreen && (
                <CSSTransition
                  in={open}
                  appear={true}
                  timeout={300}
                  className={styles.bodyAnimation}
                  classNames={overlayAnimationClassNames}
                >
                  <div>
                    <div className={styles.overlay} />
                  </div>
                </CSSTransition>
              )}

              <div
                className={styles.container}
                onClick={handleOutsideClick}
                onMouseDown={handleMouseDownOutside}
                onMouseUp={handleMouseUpOutside}
              >
                <div className={styles.helper} />
                <div className={styles.wrapper}>
                  <div
                    className={styles.body}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onClick={_preventBubble}
                  >
                    <CSSTransition
                      in={open}
                      appear={true}
                      timeout={300}
                      classNames={bodyAnimationClassNames}
                    >
                      <div className={styles.bodyInner}>
                        <div className={cls(styles.content, { [styles.scrollable]: scrollable })}>
                          <div className={styles.inner}>
                            <div className={styles.header}>
                              <div>&nbsp;</div>
                              <div
                                className={styles.closer}
                                onClick={handleCloserClick}
                              >
                                <CrossIcon className={styles.closerIcon} />
                              </div>
                            </div>
                          </div>
                          <div className={styles.main}>
                            <div className={styles.body}>
                              <div className={styles['body-inner']}>
                                {children}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CSSTransition>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </Portal>
      </Transition>
  );
};

export default Modal;

