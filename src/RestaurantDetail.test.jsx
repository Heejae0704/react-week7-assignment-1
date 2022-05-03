import { render } from '@testing-library/react';

import RestaurantDetail from './RestaurantDetail';

import reviews from '../fixtures/reviews';

describe('RestaurantDetail', () => {
  const restaurant = {
    id: 1,
    name: '마법사주방',
    address: '서울시 강남구',
  };

  it('renders name and address and reviews', () => {
    const { container } = render(
      <RestaurantDetail restaurant={restaurant} reviews={reviews} />,
    );

    expect(container).toHaveTextContent('마법사주방');
    expect(container).toHaveTextContent('서울시');
    expect(container).toHaveTextContent('user1');
    expect(container).toHaveTextContent('4');
    expect(container).toHaveTextContent('짱맛있어요');
  });
});
