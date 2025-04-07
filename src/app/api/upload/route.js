import { NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), 'public', 'uploads');
const imageDataPath = path.join(process.cwd(), 'public', 'uploads', 'imageData.json');

// Tạo thư mục nếu chưa có
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Khởi tạo file JSON nếu chưa có hoặc bị lỗi
async function initializeImageData() {
  try {
    if (!fs.existsSync(imageDataPath)) {
      await writeFile(imageDataPath, JSON.stringify({ images: [] }));
      return { images: [] };
    }

    const data = await readFile(imageDataPath, 'utf8');
    const parsedData = JSON.parse(data);
    if (!parsedData.images || !Array.isArray(parsedData.images)) {
      throw new Error('Invalid JSON structure');
    }
    return parsedData;
  } catch (error) {
    console.error('Error initializing image data:', error);
    await writeFile(imageDataPath, JSON.stringify({ images: [] }));
    return { images: [] };
  }
}

export async function GET() {
  try {
    const imageData = await initializeImageData();
    return NextResponse.json(imageData);
  } catch (error) {
    console.error('Failed to read image data:', error);
    return NextResponse.json({ images: [] });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('image');
    const name = formData.get('name') || 'Untitled';
    const tag = formData.get('tag') || '';

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert to WebP
    const webpBuffer = await sharp(buffer)
      .webp({ quality: 80 })
      .toBuffer();

    const timestamp = Date.now();
    const baseName = path.parse(file.name).name;
    const fileName = `${timestamp}-${baseName}.webp`;
    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, webpBuffer);

    const url = `/uploads/${fileName}`;

    // Đọc và cập nhật JSON
    const imageData = await initializeImageData();
    imageData.images.push({
      name: name,
      tag: tag,
      url: url,
    });
    await writeFile(imageDataPath, JSON.stringify(imageData, null, 2));

    return NextResponse.json({ fileName, url, name, tag });
  } catch (error) {
    console.error('Upload failed:', error);
    return NextResponse.json({ message: 'Upload failed' }, { status: 500 });
  }
}
