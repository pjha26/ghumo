import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { currentUser } from '@clerk/nextjs/server';

// Configure Cloudinary
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
    console.error('Missing Cloudinary credentials:', {
        cloudName: !!cloudName,
        apiKey: !!apiKey,
        apiSecret: !!apiSecret
    });
}

export async function POST(request) {
    if (!cloudName || !apiKey || !apiSecret) {
        return NextResponse.json({ error: "Server configuration error: Missing Cloudinary credentials" }, { status: 500 });
    }

    cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret
    });

    try {
        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    folder: 'airbnb-clone-profiles',
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(buffer);
        });

        return NextResponse.json({ url: result.secure_url });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 });
    }
}
