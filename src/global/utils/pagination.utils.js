module.exports = {
    calcOffset({ page, limit }) {
        return Math.max((page - 1), 0) * limit;
    }
}
