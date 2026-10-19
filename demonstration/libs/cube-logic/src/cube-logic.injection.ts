import { app } from '@airport/direction-indicator'
import { CubeDirection } from './cube/CubeDirection'
import { CubeEventListener } from './cube/CubeEventListener'
import { CubeMoveMatrix } from './cube/CubeMoveMatrix'
import { CubeMovement } from './cube/CubeMovement'
import { DegreePositionChooser } from './cube/mutation/DegreePositionChooser'
import { FinalPositionFinder } from './cube/mutation/FinalPositionFinder'
import { MatrixValueChooser } from './cube/mutation/MatrixValueChooser'
import { MutationApi } from './cube/mutation/MutationApi'
import { PercentagePositionChooser } from './cube/mutation/PercentagePositionChooser'
import { Viewport } from './cube/Viewport'
import { CubeUtils } from './utils/CubeUtils'
import { EventListenerMap } from './utils/EventListenerMap'

const cubeLogic = app({
    domain: {
        name: 'votecube.com'
    },
    name: 'cube-logic'
})

cubeLogic.register(
    CubeDirection, CubeEventListener, CubeMoveMatrix,
    CubeMovement, CubeUtils, DegreePositionChooser,
    EventListenerMap, FinalPositionFinder, MatrixValueChooser,
    MutationApi, PercentagePositionChooser, Viewport,

)
cubeLogic.setDependencies(CubeEventListener, {
    cubeDirection: CubeDirection,
    cubeMovement: CubeMovement,
    cubeUtils: CubeUtils,
    eventListenerMap: EventListenerMap,
    mutationApi: MutationApi,
    viewport: Viewport
})
cubeLogic.setDependencies(CubeMovement, {
    cubeMoveMatrix: CubeMoveMatrix
})
cubeLogic.setDependencies(DegreePositionChooser, {
    viewport: Viewport
})
cubeLogic.setDependencies(FinalPositionFinder, {
    viewport: Viewport,
    cubeUtils: CubeUtils,
    cubeMoveMatrix: CubeMoveMatrix,
    cubeMovement: CubeMovement
})
cubeLogic.setDependencies(MatrixValueChooser, {
    cubeMoveMatrix: CubeMoveMatrix,
    cubeUtils: CubeUtils,
    viewport: Viewport
})
cubeLogic.setDependencies(MutationApi, {
    cubeMoveMatrix: CubeMoveMatrix,
    cubeMovement: CubeMovement,
    cubeUtils: CubeUtils,
    degreePositionChooser: DegreePositionChooser,
    eventListenerMap: EventListenerMap,
    finalPositionFinder: FinalPositionFinder,
    matrixValueChooser: MatrixValueChooser,
    mutationApi: MutationApi,
    percentagePositionChooser: PercentagePositionChooser,
    viewport: Viewport
})
cubeLogic.setDependencies(PercentagePositionChooser, {
    viewport: Viewport
})
cubeLogic.setDependencies(Viewport, {
    cubeMoveMatrix: CubeMoveMatrix,
    cubeMovement: CubeMovement
})
