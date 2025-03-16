"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [matchData, setMatchData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        team1: "",
        team2: "",
        logo1: "",
        logo2: "",
        players: Array(10).fill(""),
    });

    const handleChange = (e, index = null) => {
        if (index !== null) {
            const newPlayers = [...formData.players];
            newPlayers[index] = e.target.value;
            setFormData({ ...formData, players: newPlayers });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    // ✅ Di chuyển fetchMatchData ra ngoài useEffect
    const fetchMatchData = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/dashboard", { method: "GET" });
            if (!response.ok) throw new Error("Lỗi khi lấy dữ liệu!");
            const data = await response.json();
            setMatchData(data.matchData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/dashboard", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Lỗi cập nhật dữ liệu");

            setMatchData(data.matchData); // ✅ Cập nhật ngay lập tức
            fetchMatchData(); // ✅ Gọi lại GET để cập nhật dữ liệu mới
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchMatchData(); // ✅ Gọi API khi component được mount
    }, []);

    return (
        <div style={{ textAlign: "center", padding: "20px", display: "flex", gap: "20px" }}>
            <div style={{ flex: 1, padding: "20px", border: "1px solid gray", borderRadius: "10px", backgroundColor: "#f8f8f8" }}>
                <h2>Nhập thông tin trận đấu</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="team1" placeholder="Tên đội 1" value={formData.team1} onChange={handleChange} required />
                    <input type="text" name="team2" placeholder="Tên đội 2" value={formData.team2} onChange={handleChange} required />
                    <input type="text" name="logo1" placeholder="URL Logo đội 1" value={formData.logo1} onChange={handleChange} />
                    <input type="text" name="logo2" placeholder="URL Logo đội 2" value={formData.logo2} onChange={handleChange} />

                    <h3>Nhập danh sách cầu thủ:</h3>
                    {formData.players.map((player, index) => (
                        <input key={index} type="text" placeholder={`Cầu thủ ${index + 1}`} value={player} onChange={(e) => handleChange(e, index)} />
                    ))}

                    <button type="submit">Lưu trận đấu</button>
                </form>
            </div>

            <div style={{ flex: 1, padding: "20px", border: "1px solid gray", borderRadius: "10px", backgroundColor: "#f8f8f8" }}>
                <h2>Trận đấu</h2>
                {loading ? <p>Đang tải dữ liệu...</p> : error ? <p style={{ color: "red" }}>{error}</p> : matchData ? (
                    <div>
                        <h2>{matchData.team1.name} 🆚 {matchData.team2.name}</h2>
                        <div>
                            <img src={matchData.team1.logo} alt="Logo Đội 1" width={100} />
                            <img src={matchData.team2.logo} alt="Logo Đội 2" width={100} />
                        </div>
                        <h3>Đội Đỏ:</h3>
                        <ul>
                            {matchData.players.red.map((player, index) => (
                                <li key={index}>{player}</li>
                            ))}
                        </ul>
                        <h3>Đội Xanh:</h3>
                        <ul>
                            {matchData.players.blue.map((player, index) => (
                                <li key={index}>{player}</li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>Chưa có dữ liệu trận đấu.</p>
                )}
            </div>
        </div>
    );
}
