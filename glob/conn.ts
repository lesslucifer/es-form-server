import { ENV_CONFIG } from './env';
import { Sequelize } from 'sequelize-typescript'
import hera from '../utils/hera';

// ************ CONFIGS ************
export class AppConnections {
    private seq: Sequelize

    get SEQ(): Sequelize {
        return this.seq
    }

    constructor() {

    }

    async configureConnections(config: ENV_CONFIG) {
        const sqlURL = new URL(config.SQL)
        this.seq = new Sequelize({
            host: sqlURL.hostname,
            port: hera.parseInt(sqlURL.port, 10, 3306),
            database: sqlURL.pathname.substring(1),
            dialect: <any> sqlURL.protocol.substring(0, sqlURL.protocol.length - 1),
            username: sqlURL.username,
            password: sqlURL.password,
            models: [__dirname + '/../models'] // or [Player, Team],
        })
    }
}

const CONN = new AppConnections();
export default CONN;
