import express from 'express';

const router = express.Router();

router.put('/auth/signup', (req: express.Request, res: express.Response) => {
  // const { username, email, password } = req.body;
  res.status(201).json(req.body).end();
});

router.post('/auth/signin', (req: express.Request, res: express.Response) => {
  res.status(200).json(req.body).end();
});

router.get('/auth/signedin', (req: express.Request, res: express.Response) => {
  res.status(200).json(req.cookies);
});

router.put('/auth/signout',(req: express.Request, res: express.Response) => {
  res.status(200).json(req.cookies);
} )

export default router;
