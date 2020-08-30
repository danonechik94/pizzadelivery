import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import cls from 'classnames';
import styles from './Tooltip.scss';

import { Portal } from 'react-portal';

const initialTooltipState = {
    visible: false,
    type: 'bottom-center',
    x: 0,
    y: 0,
};

const DEFAULT_DISAPPEAR_TIMEOUT = 2000;

class Tooltip extends React.PureComponent {
    state = initialTooltipState;
    disappearTimeout = undefined;

    componentWillUnmount() {
        document.removeEventListener('click', this.handleOutsideClick);
    }

    isOutsideTooltip = (target) => {
        console.log(target);
        const tooltipDomNode = ReactDOM.findDOMNode(this);
        // Fix unmounted comp
        return !tooltipDomNode.contains(target) && tooltipDomNode !== target;
    };

    handleOutsideClick = (evt) => {
        if (this.isOutsideTooltip(evt.target)) {
            this.hide();
        }
    };

    show(tooltipElementRect, withTimeout = true) {
        this.setState({
            visible: true,
        }, () => {
            document.addEventListener('click', this.handleOutsideClick);
            this.setPosition(tooltipElementRect);
            if (withTimeout) {
                this.setDisappearTimeout();
            }
        });
    }

    setDisappearTimeout() {
        clearTimeout(this.disappearTimeout);
        this.disappearTimeout = setTimeout(() => {
            this.hide();
        }, DEFAULT_DISAPPEAR_TIMEOUT);
    }

    resetDisappear() {
        this.setDisappearTimeout();
    }

    setPosition(tooltipElementRect) {
        // position the tooltip after showing it
        let tooltipNode = ReactDOM.findDOMNode(this);

        if(tooltipNode != null) {
            let x = 0, y = 0;
            const { type } = this.props;

            let lx = tooltipElementRect.x, // most left x
                by = tooltipElementRect.y + tooltipElementRect.height; // most bottom y

            // tooltip rectange
            let tooltipRect = tooltipNode.getBoundingClientRect();

            let newState = {};

            switch(type) {
                case 'bottom-right':
                    // Display tooltip at the right corner
                    y = by + 4; // 4 is a top padding
                    x = lx + tooltipElementRect.width - tooltipRect.width;
                    if(x < 0) {
                        x = lx;
                    }
                    break;

                case 'bottom-center':
                default:
                    // Display tooltip at the bottom center
                    y = by + 4; // 4 is a top padding
                    x = lx + ((tooltipElementRect.width / 2) - (tooltipRect.width / 2));
                    if(x < 0) {
                        x = lx;
                    }
                    break;
            }

            this.setState({
                ...newState, 
                x, 
                y
            });
        }
    }

    hide() {
        document.removeEventListener('click', this.handleOutsideClick);
        this.setState(initialTooltipState);
        clearTimeout(this.disappearTimeout);
    }

    getTooltipStyle() {
        let { x, y } = this.state;
        return {
            left: ((x + window.scrollX) + 'px'),
            top: ((y + window.scrollY) + 'px')
        };
    }
    
    render() {
        const { visible } = this.state;
        const { children } = this.props;
    
        // SSR protection
        if (typeof window === 'undefined') {
            return null;
        }

        return (
            <Portal>
                <div 
                    className={cls(styles.tooltip, { [styles.tooltipVisible]: visible })} 
                    style={this.getTooltipStyle()}
                >
                    <div className={styles.tooltipInner}>{children}</div>
                </div>
            </Portal>
        );
    }
}

export default Tooltip;
