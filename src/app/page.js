import Link from 'next/link';
import WebSocketComponent from "../components/WebSocketComponent";

export default function Home() {
  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url('https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt5656c1d77b420239/65545239a5f70b771337422f/LOL_Splash_Banner_1920x1080_01.jpg')` }}>
      <div className="absolute inset-0 bg-black opacity-60"></div> {/* Overlay tối màu */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Dino League of Legends</h1>
          <p className="text-lg mb-8">Power by Dino ChuChu</p>
        </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          {/* <WebSocketComponent /> */}
            <Link href="/ingame" className="bg-blue-600 hover:bg-blue-700 py-3 px-6 rounded-full font-semibold transition-colors">
              In Game
            </Link>
            <Link href="/dashboard" className="bg-gray-800 hover:bg-gray-700 py-3 px-6 rounded-full font-semibold transition-colors">
              Dashboard
            </Link>
          </div>
      </div>
    </div>
  );
}