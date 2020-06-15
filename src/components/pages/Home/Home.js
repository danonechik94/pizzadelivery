import React from 'react';
import { connect } from 'react-redux';

import cls from 'classnames';
import styles from './Home.scss';

import getItems from '_redux/modules/items/actions';
import { 
  itemsSelector,
  itemsStateSelector,
} from '_redux/modules/items/selectors';

import _range from 'lodash/range';

import { ScrollElement } from 'react-scroll';

import PizzaSlice from 'icons/PizzaSlice';
import ItemsGrid from 'organisms/ItemsGrid';
import ItemsNav from 'organisms/ItemsNav';
import Gallery from 'organisms/Gallery';
import InViewComponent from 'molecules/InViewComponent';
import StickyComponent from 'molecules/StickyComponent';
import Logo from 'icons/Logo';

import { CATEGORY_NAMES } from 'constants/names';

const ScrollSection = ScrollElement(({children, parentBindings, ...restProps}) => (
  <section {...restProps}>
    {children}
  </section>
))

@connect(store => ({
  itemsState: itemsStateSelector(store),
  itemsData: itemsSelector(store),
}))
class Home extends React.PureComponent {
  state = {
    visibleItem: null,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getItems());
  }

  handleInView = (group) => () => {
    this.setState({ visibleItem: group });
  };

  renderSliderItems = () => {
    return _range(6).map(_ => (
      <div className={styles.slideContent}>
        <h2 className={styles.slideTitle}>New Combo <br/>for just 15&nbsp;&euro;</h2>
        <Logo className={styles.slideIcon} width={150} height={150} />
      </div>
    ));
  };

  renderContent = () => {
    const { itemsData } = this.props;
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
                  <ItemsGrid data={groupItems} />
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
    const loadingData = itemsState.loading || itemsState.initial || itemsState.error;

    return (
      <div>
        <Gallery 
          items={this.renderSliderItems()} 
          childrenClassNames={{
            slideClassName: styles.featured
          }} 
        />
        {/* <div className={styles['featured-wrapper']}>
            <ul className={styles['featured-slider']}>
                
            </ul>
        </div> */}
        {loadingData ? (
          <div className={styles.loaderContainer}>
            <PizzaSlice className={styles.loaderIcon} />
          </div>
        ) : this.renderContent()} 
      </div>
    );
  }
}

export default Home;
