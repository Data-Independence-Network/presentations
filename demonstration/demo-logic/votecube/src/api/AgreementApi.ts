import { Inject, Injected } from "@airport/direction-indicator";
import { AgreementDao } from "../dao/AgreementDao";
import { AgreementIdeaReasonDao } from "../dao/AgreementIdeaReasonDao";
import { FactorDao } from "../dao/FactorDao";
import { IIdeaDao } from "../dao/IdeaDao";
import { PositionDao } from "../dao/PositionDao";
import { ReasonDao } from "../dao/reason/ReasonDao";
import { ISituationIdeaDao } from "../dao/SituationIdeaDao";
import { Agreement, ITotalDelta } from "../ddl/ddl";
import { Api } from "@airport/air-traffic-control";

export interface IAgreementApi {

    saveAgreement(
        agreement: Agreement
    ): Promise<void>

    getMyAgreementForIdea(
        ideaRepositoryUuid: string
    ): Promise<Agreement>

}

@Injected()
export class AgreementApi
    implements IAgreementApi {

    @Inject()
    agreementDao: AgreementDao

    @Inject()
    agreementIdeaReasonDao: AgreementIdeaReasonDao

    @Inject()
    factorDao: FactorDao

    @Inject()
    ideaDao: IIdeaDao

    @Inject()
    positionDao: PositionDao

    @Inject()
    reasonDao: ReasonDao

    @Inject()
    situationIdeaDao: ISituationIdeaDao

    @Api()
    async saveAgreement(
        agreement: Agreement
    ): Promise<void> {
        return null
    }

    @Api()
    async getMyAgreementForIdea(
        ideaRepositoryUuid: string
    ): Promise<Agreement> {
        return null
    }

    @Api()
    async setAgreement(
        agreement: Agreement
    ): Promise<void> {
        await this.calculateShareTotal(agreement)
        const {
            updatedAgreement,
            delta
        } = await this.removeSharesFromNotSelectedAgreementReasons(agreement)
        await this.agreementDao.save(updatedAgreement)
        await this.updateAgreementShareTotals(updatedAgreement, delta)
    }

    async calculateShareTotal(
        agreement: Agreement
    ): Promise<void> {
        let shareTotal = 0

        for (const agreementIdeaReason of agreement.agreementIdeaReasons) {
            shareTotal += agreementIdeaReason.share
        }

        agreement.shareTotal = Math.floor(shareTotal)
    }

    private async removeSharesFromNotSelectedAgreementReasons(
        agreement: Agreement
    ): Promise<{
        updatedAgreement: Agreement,
        delta: ITotalDelta
    }> {
        let existingAgreement: Agreement
        if (agreement.situationIdea) {
            existingAgreement = await this.agreementDao
                .findForSituationIdeaAndUser(
                    agreement.situationIdea,
                    agreement.actor.userAccount.accountPublicSigningKey
                )
        } else {
            existingAgreement = await this.agreementDao
                .findForIdeaOnlyAndUser(
                    agreement.idea,
                    agreement.actor?.userAccount.accountPublicSigningKey
                )
        }
        if (existingAgreement) {
            const leftOverAgreementIdeaReasonsById = this.agreementIdeaReasonDao
                .mapById(existingAgreement.agreementIdeaReasons)
            for (const agreementIdeaReason of agreement.agreementIdeaReasons) {
                if (agreementIdeaReason.id) {
                    leftOverAgreementIdeaReasonsById.delete(agreementIdeaReason.id)
                }
            }
            for (const leftOverAgreementIdeaReason of leftOverAgreementIdeaReasonsById.values()) {
                leftOverAgreementIdeaReason.share = 0
                agreement.agreementIdeaReasons.push(leftOverAgreementIdeaReason)
            }
            existingAgreement.agreementIdeaReasons = agreement.agreementIdeaReasons
            existingAgreement.idea = agreement.idea
            existingAgreement.situationIdea = agreement.situationIdea
            return {
                updatedAgreement: existingAgreement,
                delta: {
                    totalDelta: agreement.shareTotal - existingAgreement.shareTotal,
                    numberDelta: 0
                }
            }
        }
        return {
            updatedAgreement: agreement,
            delta: {
                totalDelta: agreement.shareTotal,
                numberDelta: 1
            }
        }
    }

    private async updateAgreementShareTotals(
        agreement: Agreement,
        delta: ITotalDelta
    ): Promise<void> {
        await this.ideaDao.updateShareTotal(delta, agreement.idea)

        if (agreement.situationIdea) {
            await this.situationIdeaDao.updateShareTotal(delta, agreement.situationIdea)
        }
    }

}
