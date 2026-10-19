import { IUiRepositoryRecord } from "@votecube/model";
import { Inject, Injected } from "@airport/direction-indicator";
import { AirEntity } from "@airport/final-approach";
import { IQueryResultsDeserializer } from "@airport/pressurization";

export interface IRepositoryRecordConverter {

    dbToUi(
        dbAirEntity: AirEntity
    ): IUiRepositoryRecord

    uiToDb(
        uiRepositoryRecord: IUiRepositoryRecord,
        dbAirEntity: AirEntity
    ): void

}

@Injected()
export class RepositoryRecordConverter
    implements IRepositoryRecordConverter {

    @Inject()
    queryResultsDeserializer: IQueryResultsDeserializer

    dbToUi(
        dbAirEntity: AirEntity
    ): IUiRepositoryRecord {
        if (!dbAirEntity) {
            dbAirEntity = {} as any
        }

        let uiEntity = {
            _actorRecordId: dbAirEntity._actorRecordId,
            ageSuitability: dbAirEntity.repository?.ageSuitability ?? 0,
            actor: dbAirEntity.actor,
            repository: dbAirEntity.repository
        }

        this.queryResultsDeserializer
            .setPropertyDescriptorsOfAirEntity(dbAirEntity)

        return uiEntity as any
    }

    uiToDb(
        uiRepositoryRecord: IUiRepositoryRecord,
        dbAirEntity: AirEntity
    ): void {
        if (!uiRepositoryRecord) {
            return
        }

        if (uiRepositoryRecord._actorRecordId
            || uiRepositoryRecord._actorRecordId === 0) {
            dbAirEntity._actorRecordId
                = uiRepositoryRecord._actorRecordId
        }
        if (!dbAirEntity.actor) {
            dbAirEntity.actor
                = uiRepositoryRecord.actor as any
        }
        if (!dbAirEntity.repository) {
            dbAirEntity.repository
                = uiRepositoryRecord.repository as any
        }
    }

}
