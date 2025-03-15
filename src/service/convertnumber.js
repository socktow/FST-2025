// Hàm kiểm tra và chuyển đổi số về "ALIVE" hoặc số nguyên
export function convertTimer(number) {
    if (number < 1) {
        return "ALIVE";
    }
    return number >= 60 ? convertToMinutesAndSeconds(number) : Math.floor(number);
}

// Hàm chuyển đổi số lớn hơn 60 thành phút:giây
export function convertToMinutesAndSeconds(number) {
    const minutes = Math.floor(number / 60);
    const seconds = number % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
