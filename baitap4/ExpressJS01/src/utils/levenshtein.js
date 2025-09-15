// Hàm tính Levenshtein Distance
function levenshteinDistance(a, b) {
    const matrix = [];

    // khởi tạo
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    // tính toán
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // thay thế
                    matrix[i][j - 1] + 1,     // chèn
                    matrix[i - 1][j] + 1      // xóa
                );
            }
        }
    }

    return matrix[b.length][a.length];
}

function similarity(a, b) {
    const distance = levenshteinDistance(a.toLowerCase(), b.toLowerCase());
    const maxLen = Math.max(a.length, b.length);
    return 1 - distance / maxLen;
}

module.exports = { similarity };
