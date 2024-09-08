var messages = [
  {
    _id: 2,
    text: 'Hello developer',
    createdAt: new Date(Date.UTC(2016, 5, 12, 17, 20, 0)),
    user: {
      _id: 2,
      name: 'Amanda Diaz',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  {
    _id: 3,
    text: 'Hi! I work from home today!',
    createdAt: new Date(Date.UTC(2016, 5, 13, 17, 20, 0)),
    user: {
      _id: 1,
      name: 'Amanda Diaz',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  {
    _id: 4,
    text: 'This is a quick reply. Do you love Gifted Chat? (radio) KEEP IT',
    createdAt: new Date(Date.UTC(2016, 5, 14, 17, 20, 0)),
    user: {
      _id: 2,
      name: 'Amanda Diaz',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  {
    _id: 5,
    text: 'This is a quick reply. Do you love Gifted Chat? (checkbox)',
    createdAt: new Date(Date.UTC(2016, 5, 15, 17, 20, 0)),
    user: {
      _id: 2,
      name: 'Amanda Diaz',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  {
    _id: 6,
    text: 'Come on!',
    createdAt: new Date(Date.UTC(2016, 5, 15, 18, 20, 0)),
    user: {
      _id: 2,
      name: 'Amanda Diaz',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  {
    _id: 7,
    text: 'Come on asdfsdfas sadfsasdfsdfas sadfsasdfsdfas sadfsasdfsdfas sadfs dfe sfdfsdf!',
    createdAt: new Date(Date.UTC(2016, 5, 15, 18, 20, 0)),
    user: {
      _id: 1,
      name: 'Amanda Diaz',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  {
    _id: 8,
    text: 'Come on asdfsdfas sasdfsdfas sadfsasdfsdfas sadfsadfs dfe sfdfsdf!',
    createdAt: new Date(Date.UTC(2016, 5, 15, 18, 20, 0)),
    user: {
      _id: 2,
      name: 'Amanda Diaz',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  {
    _id: 9,
    text: `Hello this is an example of the ParsedText.`,
    createdAt: new Date(Date.UTC(2016, 5, 13, 17, 20, 0)),
    user: {
      _id: 1,
      name: 'Amanda Diaz',
      avatar: 'https://placeimg.com/140/140/any',
    },
    reply: {
      _id: 8,
      text: 'Come on asdfsdfas sasdfsdfas sadfsasdfsdfas sadfsadfs dfe sfdfsdf!',
      createdAt: new Date(Date.UTC(2016, 5, 15, 18, 20, 0)),
      user: {
        _id: 2,
        name: 'Amanda Diaz',
        avatar: 'https://placeimg.com/140/140/any',
      },
    }
  },
  {
    _id: 10,
    text: `Hello this is an example of the ParsedText.`,
    createdAt: new Date(Date.UTC(2016, 5, 13, 17, 20, 0)),
    user: {
      _id: 1,
      name: 'Amanda Diaz',
      avatar: 'https://placeimg.com/140/140/any',
    },
    images: ['https://placeimg.com/140/140/any'],
  },
  {
    _id: 11,
    text: `Hello this is an example of the ParsedText.`,
    createdAt: new Date(Date.UTC(2016, 5, 13, 17, 20, 0)),
    user: {
      _id: 1,
      name: 'Amanda Diaz',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  {
    _id: 12,
    createdAt: new Date(Date.UTC(2020, 7, 13, 17, 20, 0)),
    user: {
      _id: 1,
      name: 'Amanda Diaz',
      avatar: 'https://placeimg.com/140/140/any',
    },
    images: ['https://placeimg.com/135/135/any',
      'https://placeimg.com/140/140/any',
      'https://placeimg.com/145/145/any',
      'https://placeimg.com/150/150/any',
      'https://placeimg.com/155/155/any',
      'https://placeimg.com/160/160/any',
    ],
  },
];

messages = messages.reverse()
export default messages;