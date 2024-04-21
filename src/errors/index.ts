interface ErrorMessage {
  id: number;
  msg: string;
}

const errors: Array<ErrorMessage> = [
  {
    id: 0,
    msg: 'unknown error',
  },
  {
    id: 1,
    msg: 'email is required',
  },
  {
    id: 2,
    msg: 'password is required',
  },
  {
    id: 3,
    msg: 'username is required',
  },
  {
    id: 4,
    msg: 'user existing',
  },
  {
    id: 5,
    msg: 'user not existing',
  },
  {
    id: 6,
    msg: 'salt not existing',
  },
  {
    id: 7,
    msg: 'password does not match',
  },
  {
    id: 8,
    msg: 'sessionId is required',
  },
  {
    id: 9,
    msg: 'user is not signed in',
  },
  {
    id: 10,
    msg: 'authentication not existing'
  }
];

export default errors;
