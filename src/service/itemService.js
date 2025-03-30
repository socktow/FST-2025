/**
 * Sắp xếp items theo cost và xử lý thứ tự hiển thị cho từng team
 * @param {Array} items - Danh sách items của player
 * @param {boolean} isBlueTeam - Có phải là Blue Team không
 * @returns {Array} - Danh sách items đã được sắp xếp
 */
export const sortPlayerItems = (items = [], isBlueTeam) => {
    if (!items || items.length === 0) return [];
    
    // Tách item cuối cùng (trang bị phụ)
    const lastItem = items[items.length - 1];
    const mainItems = items.slice(0, -1);
    
    // Sắp xếp 6 item đầu theo cost (giá trị cao nhất lên đầu)
    const sortedMainItems = [...mainItems].sort((a, b) => b.cost - a.cost);
    
    // Đảo ngược thứ tự nếu là Blue Team
    const finalMainItems = isBlueTeam ? [...sortedMainItems].slice() : sortedMainItems;
    
    // Thêm item cuối cùng vào cuối danh sách
    return [...finalMainItems, lastItem];
};

/**
 * Kiểm tra và trả về số stacks cần hiển thị
 * @param {number} stacks - Số stacks của item
 * @param {boolean} isLastItem - Có phải là item cuối cùng không
 * @returns {number|null} - Số stacks cần hiển thị hoặc null nếu không cần hiển thị
 */
export const getItemStacks = (stacks, isLastItem) => {
    if (!stacks || stacks <= 1 || isLastItem) return null;
    return stacks;
};

/**
 * Tính toán phần trăm cooldown của item
 * @param {number} cooldown - Thời gian cooldown hiện tại
 * @param {number} maxCooldown - Thời gian cooldown tối đa
 * @param {boolean} isLastItem - Có phải là item cuối cùng không
 * @param {boolean} isBlueTeam - Có phải là Blue Team không
 * @returns {number} - Phần trăm cooldown (0-100)
 */
export const getCooldownPercentage = (cooldown, maxCooldown, isLastItem, isBlueTeam) => {
    if (!cooldown || !maxCooldown || maxCooldown === 0) return 0;
    const percentage = (cooldown / maxCooldown) * 100;
    // Nếu là last item của Blue Team, đảo ngược phần trăm
    return isLastItem && isBlueTeam ? 100 - percentage : percentage;
};