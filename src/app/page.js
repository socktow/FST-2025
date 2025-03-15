import Link from 'next/link';
import WebSocketComponent from "../components/WebSocketComponent";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <WebSocketComponent />
      <Link href="/ingame" className="mt-4 p-2 bg-blue-500 text-white rounded">
        Go to In-Game
      </Link>
    </div>
  );
}
