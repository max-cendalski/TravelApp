import React from 'react';
import { format } from 'date-fns';

const Time = ({ date }) => {
  const dateToReneder = format(new Date(Number(date)), 'PP');
  return (
    <article>
      <p className="date-paragraph">Created: {dateToReneder}</p>
    </article>
  );
};

export default Time;
