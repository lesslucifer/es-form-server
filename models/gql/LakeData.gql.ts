import { GQLModel, GQLObject, GQLField, GQLResolver, GQLU, GQLQuery, GQLMapper, GQLMetaResolver, GQLFieldRevMapping } from 'gql-ts';
import _ from 'lodash';
import PaginationHelper from '../../utils/pagination';
import LakeData from '../LakeData';

@GQLObject('data')
export class GQLLakeData extends GQLModel<LakeData, GQLLakeData> {
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
    tpar4: string

    @GQLField()
    tpar5: string

    @GQLField()
    tpar6: string

    @GQLField()
    tpar7: string

    @GQLField()
    tpar8: string

    @GQLField()
    tpar9: string

    @GQLField()
    ltpar1: string

    @GQLField()
    ltpar2: string

    @GQLField()
    ltpar3: string

    @GQLField()
    ipar1: number

    @GQLField()
    ipar2: number

    @GQLField()
    ipar3: number

    @GQLField()
    ipar4: number

    @GQLField()
    ipar5: number

    @GQLField()
    bipar1: number

    @GQLField()
    bipar2: number

    @GQLField()
    tspar1: number

    @GQLField()
    tspar2: number

    @GQLField()
    tspar3: number
    
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
        const ltpar1 = _.uniq(query.filter.get('ltpar1').batch<string>());
        const ipar1 = _.uniq(query.filter.get('ipar1').batch<number>());
        const bipar1 = _.uniq(query.filter.get('bipar1').batch<number>());
        const tspar1 = _.uniq(query.filter.get('tspar1').batch<number>());
        const created_at = _.uniq(query.filter.get('created_at').batch<number>());
        const updated_at = _.uniq(query.filter.get('updated_at').batch<number>());

        const q = GQLU.notEmpty({
            id: ids,
            type,
            code,
            tpar1,
            ltpar1,
            ipar1,
            bipar1,
            tspar1,
            created_at,
            updated_at
        });

        return q;
    }

    static get RootOpionalFilters() {
        return ['id', 'type', 'code', 'tpar1', 'ltpar1', 'ipar1', 'bipar1', 'tspar1', 'created_at', 'updated_at'];
    }

    @GQLResolver({ matches: GQLU.byFields([], GQLLakeData.RootOpionalFilters) })
    static async rootResolve(query: GQLQuery) {
        const q = await this.getRootQuery(query);
        const options = PaginationHelper.getOptions(query);

        return await LakeData.findAll({ where: q, attributes: <string[]> query.QueryFields, ...options });
    }

    @GQLMetaResolver({ field: 'total', matches: GQLU.byFields([], GQLLakeData.RootOpionalFilters) })
    static async metaResolveTotal(query: GQLQuery) {
        const q = await this.getRootQuery(query);
        return await LakeData.count({ where: q });
    }
}