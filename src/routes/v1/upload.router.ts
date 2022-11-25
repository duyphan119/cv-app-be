import { Request, Response, Router } from "express";
import * as fs from "fs";
import * as https from "https";
import { upload } from "../../middlewares/upload.middleware";
import { BASE_ASSETS_IMAGES } from "../../constants";
import { generateFolder } from "../../utils";

const router = Router();

router.post(
	"/single",
	upload.single("image"),
	(req: Request, res: Response) => {
		if (req.file) {
			res.status(201).json({ path: req.file.path });
		} else {
			res.status(500).json({ message: `Something's wrong` });
		}
	}
);

router.post(
	"/multiple",
	upload.array("images"),
	(req: Request, res: Response) => {
		if (req.files) {
			const result = [];
			for (const file of req.files as Express.Multer.File[]) {
				result.push({ path: file.path });
			}
			res.status(201).json(result);
		} else {
			res.status(500).json({ message: `Something's wrong` });
		}
	}
);

router.post("/url", (req: Request, res: Response) => {
	const folderName = generateFolder(new Date());
	fs.mkdirSync(`./${BASE_ASSETS_IMAGES}${folderName}`, { recursive: true });
	const filename = new Date().getTime() * Math.random();
	const file = fs.createWriteStream(
		`${BASE_ASSETS_IMAGES}${folderName}${filename}.jpg`
	);

	https.get(req.body.image, function (response) {
		response.pipe(file);

		file.on("finish", () => {
			file.close();
			res.status(200).json({
				path: `${BASE_ASSETS_IMAGES}${folderName}${filename}.jpg`,
			});
		});
	});
});

export default router;
