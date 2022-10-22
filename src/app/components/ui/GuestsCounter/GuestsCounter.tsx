import React from 'react';
import Counter from '../../common/Counter';


export const getGuestsLabel = (adults: number, children: number, babies: number) => {
  const guests = [Number(adults), Number(children), Number(babies)];
  const countGuests = guests.reduce((acc, cur) => acc + cur, 0);
  const countBabies = Number(babies);

  const guestsStr = `${countGuests} نفر`;
  const babiesStr = `${countBabies} نوزاد`;

  if (countGuests > 0 && countBabies > 0) {
    return `${guestsStr}\u00A0\u00A0${babiesStr}`;
  }

  return countGuests > 0 ? guestsStr : 'چند تا مهمان';
};

type GuestsCounterProps = {
  data: { adults: number; children: number; babies: number };
  onChange: ({ target }: any) => void;
};

const GuestsCounter: React.FC<GuestsCounterProps> = ({ data, onChange }) => {
  const { adults, children, babies } = data;

  return (
    <>
      <p className='guests-label'>{getGuestsLabel(adults, children, babies)}</p>
      <Counter name='adults' label='بزرگسال' min={1} max={10} onChange={onChange} value={+adults} />
      <Counter name='children' label='کودک' min={0} max={10} onChange={onChange} value={+children} />
      <Counter name='babies' label='نوزاد' min={0} max={10} onChange={onChange} value={+babies} />
    </>
  );
};

export default React.memo(GuestsCounter);
