import { NextResponse } from "next/server";

// In-memory storage
let playerConfig = Array.from({ length: 10 }, (_, index) => ({
  id: index,
  CustomName: "",
}));

export async function GET() {
  return NextResponse.json({ PlayerNameConfig: playerConfig });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const customNames = body.customNames || []; 
    if (!Array.isArray(customNames)) {
      return NextResponse.json(
        { error: "Invalid data format. Expecting an array of { id, CustomName }." },
        { status: 400 }
      );
    }
    customNames.forEach(({ id, CustomName }) => {
      if (id >= 0 && id < 10) {
        playerConfig[id].CustomName = CustomName || "";
      }
    });
    return NextResponse.json({ PlayerNameConfig: playerConfig });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update player config" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    playerConfig = playerConfig.map(player => ({ ...player, CustomName: "" }));
    return NextResponse.json({ message: "All player names have been reset." });
  } catch (error) {
    return NextResponse.json({ error: "Failed to reset player config" }, { status: 500 });
  }
}
