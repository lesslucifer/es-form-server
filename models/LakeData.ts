import { Table, Column, Model, PrimaryKey, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'data', timestamps: false })
export class LakeData extends Model<LakeData> {
    @PrimaryKey
    @Column
    id: string

    @Column
    type: string

    @Column
    name: string

    @Column
    code: string

    @Column
    tpar1: string

    @Column
    tpar2: string

    @Column
    tpar3: string

    @Column
    tpar4: string

    @Column
    tpar5: string

    @Column
    tpar6: string

    @Column
    tpar7: string

    @Column
    tpar8: string

    @Column
    tpar9: string

    @Column
    ltpar1: string

    @Column
    ltpar2: string

    @Column
    ltpar3: string

    @Column
    ipar1: number

    @Column
    ipar2: number

    @Column
    ipar3: number

    @Column
    ipar4: number

    @Column
    ipar5: number

    @Column
    bipar1: number

    @Column
    bipar2: number

    @Column
    tspar1: number

    @Column
    tspar2: number

    @Column
    tspar3: number
    
    @Column
    created_at: number

    @Column
    updated_at: number
}

export default LakeData;