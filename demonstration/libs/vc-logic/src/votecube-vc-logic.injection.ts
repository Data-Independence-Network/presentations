import { IdeaConverter } from './converter/IdeaConverter'
import { LogicUtils } from './LogicUtils'
import { DetailedCubeLogic } from './pages/components/idea/DetailedCubeLogic'
import { FactorRankingLogic } from './pages/idea/info/FactorRankingLogic'
import { IdeaFormLogic } from './pages/idea/info/IdeaFormLogic'
import { IdeaMainLogic } from './pages/idea/info/IdeaMainLogic'
import { IdeaFormManager } from './pages/idea/IdeaFormManager'
import { CubeLogic } from './idea/CubeLogic'
import { IdeaManager } from './idea/IdeaManager'
import { AgreementManager } from './idea/AgreementManager'
import { AgreementConverter } from './converter/AgreementConverter'
import { app } from '@airport/direction-indicator'
import { RepositoryRecordConverter } from '@votecube/ui-logic'

const vcLogic = app({
    domain: {
        name: 'votecube.com'
    },
    name: 'vc-logic'
})

vcLogic.register(
    AgreementConverter, AgreementManager, CubeLogic,
    DetailedCubeLogic, FactorRankingLogic, IdeaConverter,
    IdeaFormLogic, IdeaFormManager, IdeaMainLogic,
    IdeaManager, LogicUtils
)

vcLogic.setDependencies(AgreementConverter, {
    repositoryRecordConverter: RepositoryRecordConverter
})
vcLogic.setDependencies(AgreementManager, {
    agreementConverter: AgreementConverter,
    ideaManager: IdeaManager
})
vcLogic.setDependencies(DetailedCubeLogic, {
    cubeLogic: CubeLogic,
    logicUtils: LogicUtils
})
vcLogic.setDependencies(IdeaConverter, {
    ideaFormManager: IdeaFormManager
})
vcLogic.setDependencies(IdeaFormLogic, {
    ideaFormManager: IdeaFormManager
})
vcLogic.setDependencies(IdeaMainLogic, {
    ideaFormManager: IdeaFormManager
})
vcLogic.setDependencies(IdeaManager, {
    cubeLogic: CubeLogic,
    logicUtils: LogicUtils,
    ideaFormManager: IdeaFormManager,
    ideaConverter: IdeaConverter
})
