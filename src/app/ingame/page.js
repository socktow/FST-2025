import Header from "../../components/header/header";

export default function InGame() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-800 text-white">
      <Header /> {/* Thêm Header ở đây */}
      <h1 className="text-3xl font-bold mt-4">Trang Ingame</h1>
      <p className="mt-4">Chào mừng bạn đến với trò chơi!</p>
      <p className="mt-2">Hãy chuẩn bị cho những trận đấu hấp dẫn!</p>
    </div>
  );
}
