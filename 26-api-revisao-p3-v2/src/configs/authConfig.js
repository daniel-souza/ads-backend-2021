export default {
    API_SECRET: process.env.API_SECRET || "ads-backend", // preferencialmente gerado com hash
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d" // 1 dia - (outros: 1s - seg, 1m - min, 1h - horas, 1y - anos)
}