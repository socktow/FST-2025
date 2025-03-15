// Cấu hình base URL cho các loại hình ảnh
const CONFIG = {
    // URL cơ sở cho các hình ảnh trong game
    BASE_URL: "http://localhost:58869/cache",
    // Các đường dẫn phụ cho từng loại đối tượng
    PATHS: {
        DRAGON: "style/ingame/objectives/dragonpit",
        BARON: "style/ingame/objectives/baronpit",
        ITEMS: "style/ingame/items"
    }
};

/**
 * Chuyển đổi đường dẫn hình ảnh từ subType thành URL đầy đủ
 * @param {string} subType - Đường dẫn con của hình ảnh (ví dụ: "style/ingame/objectives/baronpit/baron.png")
 * @returns {string} URL đầy đủ của hình ảnh
 */
export function convertImagePath(subType) {
    if (!subType) return null;
    return `${CONFIG.BASE_URL}/${subType}`;
}

/**
 * Kiểm tra và phân loại đường dẫn hình ảnh
 * @param {string} path - Đường dẫn hình ảnh cần kiểm tra
 * @returns {string} Loại của đối tượng (DRAGON, BARON, ITEMS)
 */
export function getImageType(path) {
    if (!path) return 'UNKNOWN';
    
    if (path.includes(CONFIG.PATHS.DRAGON)) return 'DRAGON';
    if (path.includes(CONFIG.PATHS.BARON)) return 'BARON';
    if (path.includes(CONFIG.PATHS.ITEMS)) return 'ITEMS';
    
    return 'UNKNOWN';
}

/**
 * Lấy tên file từ đường dẫn đầy đủ
 * @param {string} path - Đường dẫn đầy đủ của hình ảnh
 * @returns {string} Tên file (không có đuôi .png)
 */
export function getImageName(path) {
    if (!path) return '';
    // Lấy phần cuối của đường dẫn và bỏ đuôi .png
    return path.split('/').pop()?.replace('.png', '') || '';
}

/**
 * Tạo đường dẫn hình ảnh mới dựa trên loại và tên
 * @param {string} type - Loại đối tượng (DRAGON, BARON, ITEMS)
 * @param {string} name - Tên của đối tượng
 * @returns {string} Đường dẫn đầy đủ của hình ảnh
 */
export function createImagePath(type, name) {
    const basePath = CONFIG.PATHS[type];
    if (!basePath) return null;
    
    return `${CONFIG.BASE_URL}/${basePath}/${name}.png`;
}

// Ví dụ sử dụng:
// const dragonPath = "style/ingame/objectives/dragonpit/earth.png";
// const fullUrl = convertImagePath(dragonPath);
// const type = getImageType(dragonPath); // Returns: 'DRAGON'
// const name = getImageName(dragonPath); // Returns: 'earth'
// const newPath = createImagePath('DRAGON', 'earth');
