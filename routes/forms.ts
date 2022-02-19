import { Body, ExpressRouter, POST } from "express-router-ts";
import * as _ from "lodash";
import moment from "moment";
import CONN from "../glob/conn";
import { ValidBody } from "../utils/decors";

class FormRouter extends ExpressRouter {
    document = {
        'tags': ['Ultilities']
    }
    
    @ValidBody({
        '+@index': 'string'
    })
    @POST({path: "/"})
    async addForm(@Body() body: any) {
        const time = moment()
        const doc = await CONN.Elastic.index({
            index: `${body.index}-${time.format('YYYY.MM.DD')}`,
            body: {
                ..._.omit(body, 'index'),
                '@timestamp': time.valueOf()
            }
        })
        return doc.body
    }
}

export default new FormRouter()
