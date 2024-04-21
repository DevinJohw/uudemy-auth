import express from 'express';
import { signIn, signOut, signUp, signedIn } from '../controller/authentication';

const router = express.Router();

router.put('/auth/signup', signUp);
router.post('/auth/signin', signIn);
router.get('/auth/signedin', signedIn);
router.put('/auth/signout', signOut);

export default router;
