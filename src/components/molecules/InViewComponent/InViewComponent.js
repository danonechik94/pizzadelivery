import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer'

const InViewComponent = ({ onInView, options, children }) => {
  const [ref, inView] = useInView(options);
  useEffect(() => {
    if (inView && onInView) {
      onInView();
    }
  }, [inView])
 
  return (
    <div ref={ref}>
      {children}
    </div>
  )
};

export default InViewComponent;