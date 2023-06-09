import express, { Router } from 'express';
import ContactController from '../controllers/contactController';

const router: Router = express.Router();

router.post('/', ContactController.updateAndGetContact);

export default router;
