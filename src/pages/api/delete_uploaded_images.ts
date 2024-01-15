import { NextRequest, NextResponse } from "next/server";
import { utapi } from "~/server/uploadthing";


export default async function POST(req: NextRequest, res: NextResponse) {

	const files = req.body;
	try {
		//@ts-expect-error
		await utapi.deleteFiles(files.map(file => file.key))
		//@ts-expect-error
		return res.status(200).json({success:true, message: "Image delete successful"})

	} catch (error) {
		//@ts-expect-error
		return res.status(500).json({
			success: false,
			message: "Image delete failed",
			error
		})
	}

}