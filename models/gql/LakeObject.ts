import { GQLModel, GQLObject, GQLField, GQLResolver, GQLU, GQLQuery, GQLMapper, GQLMetaResolver, GQLFieldRevMapping } from 'gql-ts';
import _ from 'lodash';
import PaginationHelper from '../../utils/pagination';
import LakeData from '../LakeData';
import LakeObject from '../LakeObject';

@GQLObject('data')
export class GQLLakeObject extends GQLModel<LakeData, GQLLakeObject> {
    @GQLField()
    id: string

    @GQLField()
    type: string

    @GQLField()
    name: string

    @GQLField()
    code: string

    @GQLField()
    tpar1: string

    @GQLField()
    tpar2: string

    @GQLField()
    tpar3: string

    @GQLField()
    ipar1: number

    @GQLField()
    ipar2: number

    @GQLField()
    ipar3: number

    @GQLField()
    bipar: number

    @GQLField()
    tspar: number
    
    @GQLField()
    created_at: number

    @GQLField()
    updated_at: number

    static readonly DefaultSelect = { id: true }

    static async getRootQuery(query: GQLQuery) {
        const ids = _.uniq(query.filter.get('id').batch<string>());
        const type = _.uniq(query.filter.get('type').batch<string>());
        const code = _.uniq(query.filter.get('code').batch<string>());
        const tpar1 = _.uniq(query.filter.get('tpar1').batch<string>());
        const ipar1 = _.uniq(query.filter.get('ipar1').batch<number>());
        const bipar = _.uniq(query.filter.get('bipar').batch<number>());
        const tspar = _.uniq(query.filter.get('tspar').batch<number>());
        const created_at = _.uniq(query.filter.get('created_at').batch<number>());
        const updated_at = _.uniq(query.filter.get('updated_at').batch<number>());

        const q = GQLU.notEmpty({
            id: ids,
            type,
            code,
            tpar1,
            ipar1,
            bipar,
            tspar,
            created_at,
            updated_at
        });

        return q;
    }

    static get RootOpionalFilters() {
        return ['id', 'type', 'code', 'tpar1', 'ipar1', 'bipar', 'tspar', 'created_at', 'updated_at'];
    }

    @GQLResolver({ matches: GQLU.byFields([], GQLLakeObject.RootOpionalFilters) })
    static async rootResolve(query: GQLQuery) {
        const q = await this.getRootQuery(query);
        const options = PaginationHelper.getOptions(query);

        return await LakeObject.findAll({ where: q, attributes: <string[]> query.QueryFields, ...options });
    }

    @GQLMetaResolver({ field: 'total', matches: GQLU.byFields([], GQLLakeObject.RootOpionalFilters) })
    static async metaResolveTotal(query: GQLQuery) {
        const q = await this.getRootQuery(query);
        return await LakeObject.count({ where: q });
    }
}