import { ENV_CONFIG } from './env';
import * as elastic from '@elastic/elasticsearch'

// ************ CONFIGS ************
export class AppConnections {
    private elastic: elastic.Client

    get Elastic(): elastic.Client {
        return this.elastic
    }

    constructor() {

    }

    async configureConnections(config: ENV_CONFIG) {
        this.elastic = new elastic.Client({
            node: config.ELASTIC
        })
    }
}

const CONN = new AppConnections();
export default CONN;
