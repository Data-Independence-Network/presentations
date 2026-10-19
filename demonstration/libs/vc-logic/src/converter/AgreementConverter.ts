import {
    IUiAgreement,
    IUiAgreementFactor,
    AgreementFactor_Value
} from "@votecube/model";
import {
    Agreement,
    AgreementIdeaReason,
    Idea,
    IdeaReason,
    SituationIdea
} from "@votecube/votecube";
import { IRepositoryRecordConverter } from '@votecube/ui-logic'

export interface IAgreementConverter {

    dbToUi(
        dbAgreement: Agreement
    ): IUiAgreement

    uiToDb(
        uiAgreement: IUiAgreement,
        idea: Idea
    ): Agreement

}

export class AgreementConverter
    implements IAgreementConverter {

    repositoryRecordConverter: IRepositoryRecordConverter

    dbToUi(
        dbAgreement: Agreement
    ): IUiAgreement {
        let agreementIdeaReason1: AgreementIdeaReason
        let agreementIdeaReason2: AgreementIdeaReason
        let agreementIdeaReason3: AgreementIdeaReason
        for (const dbAgreementIdeaReason of dbAgreement.agreementIdeaReasons) {
            switch (dbAgreementIdeaReason.ideaReason.reasonCubeDisplay.axis) {
                case 'x':
                    agreementIdeaReason1 = dbAgreementIdeaReason
                    break
                case 'y':
                    agreementIdeaReason2 = dbAgreementIdeaReason
                    break
                case 'z':
                    agreementIdeaReason3 = dbAgreementIdeaReason
                    break
            }
        }
        return {
            ...this.repositoryRecordConverter.dbToUi(dbAgreement),
            "1": this.agreementFactorDbToUi(agreementIdeaReason1),
            "2": this.agreementFactorDbToUi(agreementIdeaReason2),
            "3": this.agreementFactorDbToUi(agreementIdeaReason3)
        }
    }

    private agreementFactorDbToUi(
        dbAgreementIdeaReason: AgreementIdeaReason
    ): IUiAgreementFactor {
        return {
            ...this.repositoryRecordConverter.dbToUi(dbAgreementIdeaReason),
            factorNumber: this.getFactorNumber(dbAgreementIdeaReason
                .ideaReason.reasonCubeDisplay.axis as 'x' | 'y' | 'z'),
            outcome: dbAgreementIdeaReason.ideaReason.isPositiveOutcome ? 'A' : 'B',
            value: dbAgreementIdeaReason.share as AgreementFactor_Value
        }
    }

    private getFactorNumber(
        axis: 'x' | 'y' | 'z'
    ): 1 | 2 | 3 {
        switch (axis) {
            case 'x':
                return 1
            case 'y':
                return 2
            case 'z':
                return 3
            default:
                throw new Error(`Unsupported axis value: ${axis}`)
        }
    }

    uiToDb(
        uiAgreement: IUiAgreement,
        idea: Idea | SituationIdea,
    ): Agreement {
        let agreementIdeaReasons: AgreementIdeaReason[] = []

        const dbAgreement: Agreement = {
            idea,
            agreementIdeaReasons
        } as any

        this.repositoryRecordConverter.uiToDb(uiAgreement, dbAgreement)
        if ((idea as Idea))

            for (const ideaReason of idea.ideaReasons) {
                const uiAgreementFactor = uiAgreement[
                    this.getFactorNumber(ideaReason.reasonCubeDisplay.axis as 'x' | 'y' | 'z')]
                agreementIdeaReasons.push(this.agreementFactorUiToDb(uiAgreementFactor,
                    dbAgreement, ideaReason))
            }

        return dbAgreement
    }

    private agreementFactorUiToDb(
        uiAgreementFactor: IUiAgreementFactor,
        agreement: Agreement,
        ideaReason: IdeaReason,
    ): AgreementIdeaReason {
        const dbAgreementIdeaReason: AgreementIdeaReason = {
            agreement,
            ideaReason
        } as any

        this.repositoryRecordConverter.uiToDb(uiAgreementFactor, dbAgreementIdeaReason)

        return dbAgreementIdeaReason
    }

}
