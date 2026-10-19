import {
    type ICubeEventListener,
    MutationApi
} from '@votecube/cube-logic'
import {
    type ICubeLogic,
    type IIdeaFormManager,
    IdeaFormManager,
    IdeaManager,
    AgreementManager
} from '@votecube/vc-logic'
import {
    pageTitle,
} from '@votecube/ui-logic'
import type {
    IUiAgreement,
    IUiIdea,
    IUiAgreementFactor,
    ITweenAgreement,
    ITweenAgreementFactor
} from '@votecube/model';
import type { IChildContainer } from '@airport/direction-indicator';

// import {APP_CONTAINER} from './container'

export async function init() {
    // await APP_CONTAINER.get(AIR
    // const dbManager = await APP_CONTAINER.get(DATABASE_MANAGER)
    // await dbManager.init('votecube.com', StoreType.SQLITE_CORDOVA, APPLICATION)
}

export function getBlankTweenAgreement(
    container: IChildContainer
): ITweenAgreement {
    const ideaFormManager = container.getSync(IdeaFormManager)

    return {
        ...ideaFormManager.getBlankUiRepositoryRecord(),
        1: getBlankTweenAgreementFactor(ideaFormManager),
        2: getBlankTweenAgreementFactor(ideaFormManager),
        3: getBlankTweenAgreementFactor(ideaFormManager)
    }
}

export function getBlankUiAgreement(
    container: IChildContainer
): IUiAgreement {
    const ideaFormManager = container.getSync(IdeaFormManager)

    return {
        ...ideaFormManager.getBlankUiRepositoryRecord(),
        1: getBlankUiAgreementFactor(ideaFormManager),
        2: getBlankUiAgreementFactor(ideaFormManager),
        3: getBlankUiAgreementFactor(ideaFormManager)
    }
}

function getBlankTweenAgreementFactor(
    ideaFormManager: IIdeaFormManager
): ITweenAgreementFactor {
    return {
        ...getBlankUiAgreementFactor(ideaFormManager),
        tweenOutcome: null,
        tweenValue: 0,
    }
}

function getBlankUiAgreementFactor(
    ideaFormManager: IIdeaFormManager
): IUiAgreementFactor {
    return {
        ...ideaFormManager.getBlankUiRepositoryRecord(),
        factorNumber: 1,
        outcome: null,
        value: 0,
    }
}

export async function setupCubeView(
    hostingPlatform: string,
    repositoryGUID: string,
    cubeLogic: ICubeLogic,
    cubeEventListener: ICubeEventListener,
    container: IChildContainer
): Promise<{
    idea: IUiIdea,
    agreement: IUiAgreement
}> {
    const [
        mutationApi, ideaManager, agreementManager
    ] = await container.get(
        MutationApi, IdeaManager, AgreementManager)

    const agreement = await agreementManager.getAgreementForIdea(
        repositoryGUID
    );

    const idea = await ideaManager.getIdea(hostingPlatform, repositoryGUID)

    cubeEventListener.setPositionData(agreement)
    await mutationApi.recompute()
    const setPositionDataAndMove = (agreement) => cubeEventListener.setPositionDataAndMove(agreement)
    setPositionDataAndMove(agreement)

    pageTitle.set(idea.name)

    return {
        idea,
        agreement
    }
}
