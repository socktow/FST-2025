export default function Gold({ value = "0", isBlueTeam = false }) {
    return (
        <div className={`flex items-center justify-center gap-2 ${isBlueTeam ? 'text-blue-400' : 'text-yellow-400'} font-bold`}>
            <span>{value}</span>
        </div>
    )
}
