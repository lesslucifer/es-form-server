import { Table, Column, Model, PrimaryKey, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'object' })
export class LakeObject extends Model<LakeObject> {
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
    ipar1: number

    @Column
    ipar2: number

    @Column
    ipar3: number

    @Column
    bipar: number

    @Column
    tspar: number

    @CreatedAt
    created_at: number

    @UpdatedAt
    updated_at: number
}

export default LakeObject;