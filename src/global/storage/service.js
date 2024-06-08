const fs = require('fs');
const { join } = require('path');

const uploadDir = 'uploads'

module.exports = {
    init() {
        const fileDir = this.filePath('');
        if (!fs.existsSync(fileDir)) {
            fs.mkdirSync(fileDir, { recursive: true });
        }
    },
    filePath(filename) {
        return join(__dirname, '..', '..', '..', uploadDir, filename);
    },
    async save(data, filename) {
        try {
            console.log('File saving started');

            const filePath = this.filePath(filename);
            await fs.promises.writeFile(filePath, data);

            console.log('File saving finished');
        } catch (err) {
            throw err;
        }
    },
    async get(filename) {
        try {
            const filePath = this.filePath(filename);
            const readStream = fs.createReadStream(filePath);

            return readStream;
        } catch (err) {
            throw err;
        }
    },
    async delete(filename) {
        try {
            const filePath = this.filePath(filename);
            await fs.promises.unlink(filePath);

            console.log(`File ${filename} deleted successfully`);
        } catch (err) {
            throw err;
        }
    }
}
