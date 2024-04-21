import mongoose from 'mongoose';
import { describe, test } from 'bun:test';
import { getUsers, getUserByEmail, createUser, getUserById, updateUserById, getUserBySessionId, deleteUserById } from './user';

try {
  await mongoose.connect(process.env.MONGODB_URL as string);
  console.log('🚀 Connected to database successfully.');
} catch (error) {
  throw error;
}

describe('Database handler', () => {
  // test('create a user', async () => {
  //   const user = await createUser({
  //     username: 'devinjohw',
  //     email: 'devin.johw@gmail.com',
  //     authentication: {
  //       password: '12345678',
  //       salt: '12345',
  //       sessionId: '1234',
  //     },
  //   });
  //   console.log(user);
  // });

  // test('get all users', async () => {
  //   const users = await getUsers();
  //   console.log(users)
  // })

  // test('get user by id', async () => {
  //   const user = await getUserById('662499b363fcfee485459048');
  //   console.log(user);
  // })


  // test('get user by email', async () => {
  //   const user = await getUserByEmail('devin.johw@gmail.com');
  //   console.log(user);
  // })

  // test('update user by id', async () => {
  //   const user = await updateUserById('66249b2a7f10d972c3669911', {
  //     username: 'rickyjohw',
  //     email: 'ricky.johw@gmail.com',
  //     authentication: {
  //       sessionId: '7890987'
  //     }
  //   });
  //   console.log(user);
  // })

  // test('get user by sessionId', async () => {
  //   const user = await getUserBySessionId("7890987");
  //   console.log(user);
  // })

  // test('delete user bu userId', async () => {
  //   const user = await deleteUserById('66249b2a7f10d972c3669911');
  //   console.log(user);
  // })
});
