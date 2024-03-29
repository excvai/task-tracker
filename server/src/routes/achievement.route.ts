import { Response, Router } from 'express';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { IAchievement } from '../shared/interfaces';

export const achievementRouter = Router();

achievementRouter.get('/', (_, res: Response) => {
	try {
		const path = resolve(__dirname, '../data/achievements.json');
		const achievements: IAchievement[] = JSON.parse(
			readFileSync(path).toString()
		);

		res.json(achievements);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: err });
	}
});
