import { GQLQuery } from "gql-ts";
import hera from "../utils/hera";
import HC from "../glob/hc";
import _ from 'lodash';
import { OrderItem } from "sequelize/types";

export class PaginationHelper {

    static getOptions(query: GQLQuery) {
        let limit = Math.min(hera.parseInt(query.pagination.limit, undefined, 100), 1000);
        const offset = hera.parseInt(query.pagination.offset);
        const order: OrderItem[] = query.sort.fields.map(f => [f.field, f.order]);

        return { limit, offset, order };
    }

    static getOptionsForSearch(query: GQLQuery, alias: string, sortDefault: string = 'id') {
        const order = !_.isEmpty(query.sort.fields) ? query.sort.fields.map(f => `${alias}.${f.field} ${f.order}`) : [`${alias}.${sortDefault} asc`];
        const limit = Math.min(hera.parseInt(query.pagination.limit, undefined, 100), 1000);
        const offset = hera.parseInt(query.pagination.offset, undefined, 0);
        const selectFields = query.QueryFields.map(f => `${alias}.${f}`).join(', ');

        return { order, limit, offset, selectFields }
    }

}

export default PaginationHelper;