import { APPLICATION_INITIALIZER, TerminalStore } from '@airport/terminal-map'
import { ApplicationLoader } from './ApplicationLoader'
import { IdeaDao, SituationIdeaDao } from "../dao/dao";
import { AgreementApi, IdeaApi, SituationIdeaApi } from '../api/api'
import { AgreementDao } from '../dao/AgreementDao'
import { AgreementIdeaReasonDao } from '../dao/AgreementIdeaReasonDao'
import { ReasonDao } from '../dao/reason/ReasonDao'
import { IdeaRatingApi } from '../api/IdeaRatingApi'
import { IdeaRatingDao } from '../dao/IdeaRatingDao'
import { FactorDao } from '../dao/FactorDao'
import { PositionDao } from '../dao/PositionDao'
import { application } from './app-declaration'
import { app } from '@airport/direction-indicator'
import { IdeaReasonDao } from '../dao/reason/IdeaReasonDao';
import { API_REGISTRY } from '@airport/air-traffic-control';
import { RequestManager } from '@airport/web-tower';

export const votecube = app(application)

votecube.register(
    AgreementApi, AgreementDao,
    AgreementIdeaReasonDao, FactorDao, IdeaApi, IdeaDao,
    IdeaRatingApi, IdeaRatingDao,
    IdeaReasonDao, PositionDao,
    ReasonDao, SituationIdeaApi, SituationIdeaDao
)

votecube.setDependencies(AgreementApi, {
    agreementDao: AgreementDao,
    agreementIdeaReasonDao: AgreementIdeaReasonDao,
    factorDao: FactorDao,
    ideaDao: IdeaDao,
    positionDao: PositionDao,
    reasonDao: ReasonDao,
    situationIdeaDao: SituationIdeaDao
})

votecube.setDependencies(IdeaApi, {
    ideaDao: IdeaDao,
    requestManager: RequestManager
})

votecube.setDependencies(IdeaRatingApi, {
    ideaDao: IdeaDao,
    ideaRatingDao: IdeaRatingDao,
    situationIdeaDao: SituationIdeaDao
})

votecube.setDependencies(SituationIdeaApi, {
    ideaApi: IdeaApi,
    requestManager: RequestManager,
    situationIdeaDao: SituationIdeaDao
})

votecube.setDependencies(ApplicationLoader, {
    applicationInitializer: APPLICATION_INITIALIZER,
    apiRegistry: API_REGISTRY,
    terminalStore: TerminalStore,
})
