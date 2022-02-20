import { Body, ExpressRouter, GET, POST, ResponseHandler } from "express-router-ts";
import * as _ from "lodash";
import moment from "moment";
import CONN from "../glob/conn";
import { ValidBody } from "../utils/decors";
import * as fs from 'fs-extra'
import * as path from 'path'

class FormRouter extends ExpressRouter {
    document = {
        'tags': ['Ultilities']
    }
    
    @ResponseHandler((data, req, resp) => {
        resp.writeHead(200, {"Content-Type": "text/html"})
        resp.write(data)
        resp.end()
    })
    @GET({path: "/test"})
    async testForm() {
        const data = await fs.readFile(path.resolve(process.cwd(), 'forms/test.html'))
        return data
    }
    
    @ValidBody({
        '+@index': 'string'
    })
    @POST({path: "/"})
    async addForm(@Body() body: any) {
        console.log(`New form received: ${JSON.stringify(body)}`)
        const time = moment()
        const doc = await CONN.Elastic.index({
            index: `${body.index}-${time.format('YYYY.MM.DD')}`,
            body: {
                ..._.omit(body, 'index'),
                '@timestamp': time.format()
            }
        })
        return doc.body
    }
}

export default new FormRouter()
