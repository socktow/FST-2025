/**
 * Chuyển đổi số giây thành định dạng mm:ss
 * @param {number} time - Thời gian (có thể là số thập phân)
 * @returns {string} Thời gian định dạng "mm:ss"
 */
export const convertTime = (time) => {
  // Làm tròn số giây và chuyển thành số nguyên
  const totalSeconds = Math.floor(Number(time));
  
  // Tính số phút và số giây
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Format với padding 0 nếu cần
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * Chuyển đổi số thành định dạng có đơn vị k (nghìn)
 * @param {number} number - Số cần chuyển đổi
 * @returns {string} Số đã được chuyển đổi (vd: "1.5k")
 */
export const convertToK = (number) => {
  return `${(number / 1000).toFixed(1)}k`;
};

/**
 * Làm tròn số về số nguyên
 * @param {number} number - Số cần làm tròn
 * @returns {number} Số nguyên đã làm tròn
 */
export const convertToInt = (number) => {
  return Math.floor(Number(number));
};
