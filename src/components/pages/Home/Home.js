import React, { createRef } from 'react';
import { connect } from 'react-redux';

import cls from 'classnames';
import styles from './Home.scss';

import { 
  itemsSelector,
  itemsStateSelector,
} from '_redux/modules/items/selectors';
import { cartDataSelector } from '_redux/modules/cart/selectors';

import { 
  addToCart,
  deleteFromCart, 
} from '_redux/modules/cart/actions';
import getItems from '_redux/modules/items/actions';


import _range from 'lodash/range';

import { ScrollElement } from 'react-scroll';

import PizzaSlice from 'icons/PizzaSlice';
import ItemsGrid from 'organisms/ItemsGrid';
import ItemsNav from 'organisms/ItemsNav';
import Gallery from 'organisms/Gallery';
import InViewComponent from 'molecules/InViewComponent';
import StickyComponent from 'molecules/StickyComponent';
import Tooltip from 'atoms/Tooltip';
import OfferItem from './blocks/OfferItem';
import OfferModal from './blocks/OfferModal';

import { CATEGORY_NAMES } from 'constants/names';

const ScrollSection = ScrollElement(({children, parentBindings, ...restProps}) => (
  <section {...restProps}>
    {children}
  </section>
))

@connect(store => ({
  itemsState: itemsStateSelector(store),
  itemsData: itemsSelector(store),
  cartData: cartDataSelector(store),
}))
class Home extends React.PureComponent {
  state = {
    visibleItem: null,
    isOfferModalVisible: false,
    offerData: undefined,
  };

  tooltipRef = createRef(null);

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getItems());
  }

  componentDidUpdate() {
    if (this.currentItem) {
      const { cartData: { items } } = this.props;
      const selectedItem = items.find((item) => item.id === this.currentItem.id);
      if (!selectedItem || selectedItem.count === 0) {
        this.currentItem = null;
        this.tooltipRef.current.hide();
      }
    }
  }

  handleInView = (group) => () => {
    this.setState({ visibleItem: group });
  };

  handleOfferClick = (offerData) => {
    this.setState({
      isOfferModalVisible: true,
      offerData,
    });
  };

  handleOfferChoose = (offerData) => {
    this.props.dispatch(addToCart(offerData));
  };

  handleGridItemChoose = (itemData, clickElementBoundingRect) => {
    this.currentItem = itemData;
    this.handleItemChoose(itemData);
    this.tooltipRef.current.show(clickElementBoundingRect);
  };

  handleItemChoose = () => {
    if (this.currentItem) {
      this.tooltipRef.current.resetDisappear();
      this.props.dispatch(addToCart(this.currentItem));
    }
  };

  handleItemDelete = () => {
    if (this.currentItem) {
      this.tooltipRef.current.resetDisappear();
      this.props.dispatch(deleteFromCart(this.currentItem));
    }
  };

  handleOfferModalClose = () => {
    this.currentItem = null;
    this.setState({
      isOfferModalVisible: false,
      offerData: undefined,
    });
  };

  getSelectedItemCount = () => {
    if (!this.currentItem) {
      return 0;
    }

    const { cartData: { items } } = this.props;
    const selectedItem = items.find((item) => item.id === this.currentItem.id) || { count: 0 };
    return selectedItem.count;
  };

  renderSliderItems = () => {
    // TODO implement offers as separate items and entity in DB
    return _range(6).map(_ => 
      <OfferItem 
        data={{
          description: 'New Combo <br/>for just 15&nbsp;&euro;',
          name: 'New Combo',
          price: { base: 15 }
        }}
        onOfferClick={this.handleOfferClick} 
      />
    );
  };

  renderContent = () => {
    const { itemsData, cartData } = this.props;
    const { visibleItem } = this.state;
    const groups = itemsData.reduce((groups, item) => {
      if (!groups.some(group => group.id === item.type)) {
        groups.push({
          id: item.type,
          href: `/?type=${item.type}`,
          title: CATEGORY_NAMES[item.type],
        });
      }
      return groups;
    }, []);

    return (
      <React.Fragment>
        <StickyComponent>
          {sticky => (
            <ItemsNav 
              visibleItem={visibleItem} 
              items={groups} 
              className={cls({ [styles.sickyNavContent]: sticky })}
              showLogo={sticky} 
            />
          )}
          
        </StickyComponent>
        <div>
          {groups.map(group => {
            const groupItems = itemsData.filter(item => item.type === group.id);
            return (
              <ScrollSection 
                className={styles.productCategory} 
                key={`${group.id}_section`}
                name={`category-${group.id}`}
              >
                <InViewComponent onInView={this.handleInView(group)} options={{threshold: 0.15}}>
                  <h2 className={styles.categoryTitle}>{group.title}</h2>
                  <Tooltip ref={this.tooltipRef}>
                    <span className={cls(styles.countControl, styles.itemMinus)} onClick={this.handleItemDelete}>-</span>
                    <span className={styles.itemCount}>{this.getSelectedItemCount()}</span>
                    <span className={cls(styles.countControl, styles.itemPlus)} onClick={this.handleItemChoose}>+</span>
                  </Tooltip>
                  <ItemsGrid 
                    data={groupItems} 
                    cartData={cartData}
                    onChooseItem={this.handleGridItemChoose} 
                  />
                </InViewComponent>
              </ScrollSection>
            );
          })}
        </div>
      </React.Fragment>
    );
  };

  render() {
    const { itemsState } = this.props;
    const { isOfferModalVisible, offerData } = this.state;
    const loadingData = itemsState.loading || itemsState.initial || itemsState.error;

    return (
      <div>
        <Gallery 
          items={this.renderSliderItems()} 
          childrenClassNames={{
            slideClassName: styles.featured
          }} 
        />
        {loadingData ? (
          <div className={styles.loaderContainer}>
            <PizzaSlice className={styles.loaderIcon} />
          </div>
        ) : this.renderContent()} 

        <OfferModal 
          isOpen={isOfferModalVisible} 
          data={offerData} 
          onOfferChoose={this.handleOfferChoose}
          onOfferModalClose={this.handleOfferModalClose} 
        />
      </div>
    );
  }
}

export default Home;
