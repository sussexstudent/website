import flatStreamToLevels from '../flatStreamToLevels';

const levelMap = {
  heading: 0,
  content: 1,
  image: 1,
};

it('works with 1 level', () => {
  const data = [
    {
      type: 'heading',
      value: 'Animals',
    },
    {
      type: 'content',
      body: '1st under my Animals',
    },
    {
      type: 'content',
      body: '2nd under Animals',
    },
    {
      type: 'heading',
      value: 'Boats',
    },
    {
      type: 'heading',
      value: 'Cars',
    },
    {
      type: 'image',
      resource: 'url.to/car-picture',
    },
    {
      type: 'content',
      body: '2nd thing under cars',
    },
  ];

  const result = flatStreamToLevels((item) => levelMap[item.type], data);

  expect(result).toEqual([
    {
      type: 'heading',
      value: 'Animals',
      _children: [
        { _children: [], type: 'content', body: '1st under my Animals' },
        { _children: [], type: 'content', body: '2nd under Animals' },
      ],
    },
    { type: 'heading', value: 'Boats', _children: [] },
    {
      type: 'heading',
      value: 'Cars',
      _children: [
        {
          _children: [],
          type: 'image',
          resource: 'url.to/car-picture',
        },
        {
          type: 'content',
          body: '2nd thing under cars',
          _children: [],
        },
      ],
    },
  ]);
});

it('accepts missing levels', () => {
  const data = [
    {
      type: 'content',
      body: '1st under my Animals',
    },
    {
      type: 'heading',
      value: 'Boats',
    },
    {
      type: 'content',
      body: '2nd thing under cars',
    },
  ];

  const result = flatStreamToLevels((item) => levelMap[item.type], data);

  expect(result).toEqual([
    {
      _missingLevel: true,
      _children: [
        { _children: [], type: 'content', body: '1st under my Animals' },
      ],
    },
    {
      type: 'heading',
      value: 'Boats',
      _children: [
        {
          type: 'content',
          body: '2nd thing under cars',
          _children: [],
        },
      ],
    },
  ]);
});
