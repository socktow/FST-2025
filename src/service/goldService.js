import { convertToK } from './convertnumber';

/**
 * Tính toán chênh lệch vàng giữa hai team
 * @param {Array} blueTeam - Danh sách player của Blue Team
 * @param {Array} redTeam - Danh sách player của Red Team
 * @param {Array} playersdata - Dữ liệu chi tiết của tất cả players
 * @returns {Object} - Kết quả chênh lệch vàng của team và từng player
 */
export const calculateGoldDiff = (blueTeam, redTeam, playersdata) => {
    // Tính tổng vàng cho mỗi đội
    const blueTotalGold = blueTeam.reduce((sum, player) => {
        const playerData = playersdata.find(p => p.champion === player.champion);
        return sum + (playerData?.totalGold || 0);
    }, 0);
    
    const redTotalGold = redTeam.reduce((sum, player) => {
        const playerData = playersdata.find(p => p.champion === player.champion);
        return sum + (playerData?.totalGold || 0);
    }, 0);
    
    // Tính chênh lệch vàng giữa các cặp player đối xứng
    const playerDiffs = blueTeam.map((bluePlayer, index) => {
        const redPlayer = redTeam[index];
        const bluePlayerData = playersdata.find(p => p.champion === bluePlayer.champion);
        const redPlayerData = playersdata.find(p => p.champion === redPlayer.champion);
        
        const blueGold = bluePlayerData?.totalGold || 0;
        const redGold = redPlayerData?.totalGold || 0;
        
        return {
            blueChampion: bluePlayer.champion,
            redChampion: redPlayer.champion,
            diff: redGold - blueGold // Red - Blue để có dấu trừ khi Blue dẫn
        };
    });
    
    return {
        teamDiff: redTotalGold - blueTotalGold, // Red - Blue để có dấu trừ khi Blue dẫn
        playerDiffs
    };
};

/**
 * Lấy màu sắc cho hiển thị chênh lệch
 * @param {number} diff - Giá trị chênh lệch
 * @returns {string} - Màu sắc tương ứng
 */
export const getDiffColor = (diff) => {
    return 'text-white'; // Luôn trả về màu trắng
};

/**
 * Lấy màu sắc cho đường kẻ ngang
 * @param {number} diff - Giá trị chênh lệch
 * @returns {string} - Màu sắc tương ứng
 */
export const getLineColor = (diff) => {
    if (diff > 0) return 'bg-red-500'; // Red team dẫn
    if (diff < 0) return 'bg-blue-500'; // Blue team dẫn
    return 'bg-gray-500'; // Bằng nhau
};

/**
 * Format số chênh lệch để hiển thị
 * @param {number} diff - Giá trị chênl lệch
 * @returns {string} - Chuỗi đã được format
 */
export const formatDiff = (diff) => {
    const absDiff = Math.abs(diff);
    const formattedDiff = absDiff >= 1000 ? convertToK(absDiff) : absDiff.toLocaleString();
    
    // Chỉ hiển thị mũi tên khi chênh lệch > 50
    if (absDiff <= 1) {
        return formattedDiff;
    }

    const redArrow = '<span class="text-red-500 absolute right-2 text-xl mx-2 my-[-2]">&#9656;</span>';
    const blueArrow = '<span class="text-blue-500 absolute left-2 text-xl mx-2 my-[-2]">&#9666;</span>';
    return diff > 0 ? `${formattedDiff} ${redArrow}` : `${blueArrow} ${formattedDiff}`;
}; 