import { NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';
import fs from 'fs';

const teamConfigPath = path.join(process.cwd(), 'public', 'config', 'teamConfig.json');

// Tạo thư mục và file nếu chưa tồn tại
async function initializeTeamConfig() {
  try {
    if (!fs.existsSync(path.dirname(teamConfigPath))) {
      fs.mkdirSync(path.dirname(teamConfigPath), { recursive: true });
    }

    if (!fs.existsSync(teamConfigPath)) {
      const defaultConfig = {
        blue: { name: "Blue Team", tag: "BLU", logo: "" },
        red: { name: "Red Team", tag: "RED", logo: "" }
      };
      await writeFile(teamConfigPath, JSON.stringify(defaultConfig, null, 2));
      return defaultConfig;
    }

    const data = await readFile(teamConfigPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error initializing team config:', error);
    return {
      blue: { name: "Blue Team", tag: "BLU", logo: "" },
      red: { name: "Red Team", tag: "RED", logo: "" }
    };
  }
}

export async function GET() {
  try {
    const teamConfig = await initializeTeamConfig();
    return NextResponse.json(teamConfig);
  } catch (error) {
    console.error('Failed to read team config:', error);
    return NextResponse.json({ error: 'Failed to read team config' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const teamData = await req.json();
    await writeFile(teamConfigPath, JSON.stringify(teamData, null, 2));
    return NextResponse.json(teamData);
  } catch (error) {
    console.error('Failed to update team config:', error);
    return NextResponse.json({ error: 'Failed to update team config' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const defaultConfig = {
      blue: { name: "Blue Team", tag: "BLU", logo: "" },
      red: { name: "Red Team", tag: "RED", logo: "" }
    };
    await writeFile(teamConfigPath, JSON.stringify(defaultConfig, null, 2));
    return NextResponse.json({ message: "All team configurations have been reset." });
  } catch (error) {
    console.error('Failed to reset team config:', error);
    return NextResponse.json({ error: 'Failed to reset team config' }, { status: 500 });
  }
}
