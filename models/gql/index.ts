import { EROpenAPIDocument } from "express-router-ts";
import { GQLGlobal } from "gql-ts";
import { GQLLakeData } from "./LakeData.gql";
import { GQLLakeObject } from "./LakeObject";

export async function initGQL() {
    const models = [
        GQLLakeObject,
        GQLLakeData
    ]

    models.forEach(m => GQLGlobal.add(m))
    models.forEach(m => EROpenAPIDocument.COMPONENTS.schemas[m.gql.get(m).name] = m.openAPISchema())
}