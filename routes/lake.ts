import { Body, ExpressRouter, POST } from "express-router-ts";
import _ from "lodash";
import moment from "moment";
import LakeObject from "../models/LakeObject";
import { ValidBody } from "../utils/decors";
import * as shortid from 'shortid'
import LakeData from "../models/LakeData";

class LakeRouter extends ExpressRouter {
    @ValidBody({
        '@id': 'string',
        '@type': 'string',
        '@name': 'string',
        '@code': 'string',
        '@tpar1': 'string',
        '@tpar2': 'string',
        '@tpar3': 'string',
        '@ipar1': 'integer',
        '@ipar2': 'integer',
        '@ipar3': 'integer',
        '@bipar': 'integer',
        '@tspar': 'integer'
    })
    
    @POST({path: "/object"})
    async addObject(@Body() body: any) {
        const now = moment()

        if (!_.get(body, 'id')) {
            _.set(body, 'id', shortid.generate())
            _.set(body, 'created_at', now.unix())
        }

        _.set(body, 'updated_at', now.unix())
        const res = await LakeObject.upsert(body, {
            returning: true
        })
        return res
    }
    @ValidBody({
        '@id': 'string',
        '@type': 'string',
        '@name': 'string',
        '@code': 'string',
        '@tpar1': 'string',
        '@tpar2': 'string',
        '@tpar3': 'string',
        '@tpar4': 'string',
        '@tpar5': 'string',
        '@ipar1': 'integer',
        '@ipar2': 'integer',
        '@ipar3': 'integer',
        '@ipar4': 'integer',
        '@ipar5': 'integer',
        '@bipar1': 'integer',
        '@bipar2': 'integer',
        '@tspar1': 'integer',
        '@tspar2': 'integer',
        '@tspar3': 'integer'
    })
    @POST({path: "/data"})
    async addData(@Body() body: any) {
        const now = moment()

        if (!_.get(body, 'id')) {
            _.set(body, 'id', shortid.generate())
            _.set(body, 'created_at', now.unix())
        }

        _.set(body, 'updated_at', now.unix())
        const res = await LakeData.upsert(body, {
            returning: true
        })

        return res
    }
}

export default new LakeRouter()
