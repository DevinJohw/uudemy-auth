import express from 'express';
import { createUser, getUserByEmail, getUserBySessionId } from '../db/user';
import { authentication, random } from '../helpers';
import errors from '../errors';

export const signUp = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email) {
      return res.status(400).json(errors[1]);
    }

    if (!password) {
      return res.status(400).json(errors[2]);
    }

    if (!username) {
      return res.status(400).json(errors[3]);
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json(errors[4]);
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json(errors[0]);
  }
};

export const signIn = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json(errors[1]);
    }
    if (!password) {
      return res.status(400).json(errors[2]);
    }
    const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

    if (!user) {
      return res.status(400).json(errors[5]);
    }

    if (!user.authentication) {
      return res.status(400).json(errors[10]);
    }

    if (!user.authentication.salt) {
      return res.status(400).json(errors[6]);
    }

    const expectedHash = authentication(user.authentication.salt as string, password);

    if (user.authentication.password !== expectedHash) {
      return res.status(403).json(errors[7]);
    }

    const salt = random();
    user.authentication.sessionId = authentication(salt, user._id.toString());

    await user.save();

    res.cookie('DEVIN-AUTH', user.authentication.sessionId, { domain: `${req.hostname}`, path: '/' });
    console.log(req.hostname);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json(errors[0]);
  }
};

export const signOut = async (req: express.Request, res: express.Response) => {
  try {
    const sessionId = req.cookies['DEVIN-AUTH'];
    if (!sessionId) {
      return res.status(400).json(errors[9]);
    }
    const signedInUser = await getUserBySessionId(sessionId).select('+authentication.sessionId');
    if (!signedInUser) {
      return res.status(400).json(errors[9]);
    }
    if (!signedInUser.authentication) {
      return res.status(400).json(errors[10]);
    }
    signedInUser.authentication.sessionId = undefined;

    await signedInUser.save();

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(400).json(errors[0]);
  }
};

export const signedIn = async (req: express.Request, res: express.Response) => {
  try {
    const sessionId = req.cookies['DEVIN-AUTH'];
    if (!sessionId) {
      return res.status(400).json(errors[8]);
    }
    const existingUser = await getUserBySessionId(sessionId);

    if (!existingUser) {
      return res.status(400).json(errors[9]);
    }

    return res.status(200).json(existingUser);
  } catch (error) {
    console.log(error);
    return res.status(400).json(errors[0]);
  }
};
