import { NextResponse } from "next/server";

let matchData = null; // Lưu dữ liệu trận đấu

// 📌 Hàm POST: Thêm hoặc cập nhật dữ liệu trận đấu
export async function POST(req) {
    try {
        const body = await req.json();
        const { team1, team2, logo1, logo2, players } = body;

        if (!matchData) {
            matchData = {
                team1: { name: team1 || "Chưa có tên", logo: logo1 || "" },
                team2: { name: team2 || "Chưa có tên", logo: logo2 || "" },
                players: {
                    red: players ? players.slice(0, 5) : [],
                    blue: players ? players.slice(5, 10) : [],
                },
                createdAt: new Date(),
            };
        } else {
            if (team1) matchData.team1.name = team1;
            if (team2) matchData.team2.name = team2;
            if (logo1) matchData.team1.logo = logo1;
            if (logo2) matchData.team2.logo = logo2;
            if (players) {
                matchData.players.red = players.slice(0, 5);
                matchData.players.blue = players.slice(5, 10);
            }
        }

        return NextResponse.json({ message: "Cập nhật thành công!", matchData }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Lỗi xử lý yêu cầu!", error: error.message }, { status: 500 });
    }
}

// 📌 Hàm PATCH: Chỉ cập nhật các phần được gửi lên
export async function PATCH(req) {
    try {
        if (!matchData) {
            return NextResponse.json({ message: "Không có dữ liệu để cập nhật!" }, { status: 404 });
        }

        const body = await req.json();
        const { team1, team2, logo1, logo2, players } = body;

        if (team1 !== undefined) matchData.team1.name = team1;
        if (team2 !== undefined) matchData.team2.name = team2;
        if (logo1 !== undefined) matchData.team1.logo = logo1;
        if (logo2 !== undefined) matchData.team2.logo = logo2;
        if (players !== undefined) {
            matchData.players.red = players.slice(0, 5);
            matchData.players.blue = players.slice(5, 10);
        }

        return NextResponse.json({ message: "Cập nhật thành công!", matchData }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Lỗi xử lý yêu cầu!", error: error.message }, { status: 500 });
    }
}

// 📌 Hàm GET: Luôn trả về dữ liệu mặc định nếu chưa có trận đấu
export async function GET() {
    if (!matchData) {
        matchData = {
            team1: { name: "GAM", logo: "" },
            team2: { name: "TS", logo: "" },
            players: { red: [], blue: [] },
            createdAt: new Date(),
        };
    }
    return NextResponse.json({ matchData }, { status: 200 });
}
