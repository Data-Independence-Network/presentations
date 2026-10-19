import { AgreementApi } from '../generated/api/AgreementApi';
import { IdeaApi } from '../generated/api/IdeaApi';
import { IdeaRatingApi } from '../generated/api/IdeaRatingApi';
import { SituationIdeaApi } from '../generated/api/SituationIdeaApi';
import { application } from './app-declaration';

export * from '../generated/api/api'

export * from '../ddl/ddl';
export * from '../generated/qApplication';
export * from '../generated/qInterfaces';
export * from '../generated/vInterfaces';
export * from './app-declaration';

for (let apiStub of [AgreementApi,
    IdeaApi,
    IdeaRatingApi,
    SituationIdeaApi]) {
    (apiStub as any).application = application
}
