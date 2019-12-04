import React from 'react';

const types = [
  {
    name: 'canon',
    title: 'Canon',
  },
  {
    name: 'trafalgar',
    title: 'Trafalgar',
  },
  {
    name: 'double-pica',
    title: 'Double Pica',
  },
  {
    name: 'great-primer',
    title: 'Great Primer',
  },
  {
    name: 'pica',
    title: 'Pica',
  },
  {
    name: 'long-primer',
    title: 'Long Primer',
  },
  {
    name: 'brevier',
    title: 'Brevier',
  },
  {
    name: 'minion',
    title: 'Minion',
  },
  {
    name: 'body-copy',
    title: 'Body Copy',
  },
];

export default { title: 'Typography|Scale' };
export const Standard: React.FC = () => (
  <div className="LokiContainer">
    <h1>Primary typeface: Larsseit Bold</h1>
    <div className="type-primary" style={{ fontWeight: 600 }}>
      {types.map((t) => (
        <div
          key={t.name}
          style={{
            display: 'flex',
            borderBottom: '1px solid grey',
            marginBottom: '1rem',
            paddingBottom: '1rem',
          }}
        >
          <div style={{ width: '200px' }}>
            {t.title} <pre>{t.name}</pre>
          </div>
          <div style={{ flex: '1 1 0' }} className={`type-${t.name}`}>
            Earlier this month, we celebrated student success and awarded
            volunteers, campaigners and societies for making Sussex such a great
            place to be at the Student Awards.
          </div>
        </div>
      ))}
    </div>
    <h1>Secondary typeface: Helvetica Neue, Helvetica, Arial</h1>
    <div>
      {types.map((t) => (
        <div
          key={t.name}
          style={{
            display: 'flex',
            borderBottom: '1px solid grey',
            marginBottom: '1rem',
            paddingBottom: '1rem',
          }}
        >
          <div style={{ width: '200px' }}>
            {t.title} <pre>{t.name}</pre>
          </div>
          <div style={{ flex: '1 1 0' }} className={`type-${t.name}`}>
            Earlier this month, we celebrated student success and awarded
            volunteers, campaigners and societies for making Sussex such a great
            place to be at the Student Awards.
          </div>
        </div>
      ))}
    </div>
  </div>
);
