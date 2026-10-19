import { AirEntity } from '@airport/final-approach'
import {
    Column,
    DbNumber,
    DbString,
    Entity,
    Table
} from '@airport/tarmaq-entity'

@Entity()
@Table({ name: 'REASONS_CUBE_DISPLAYS' })
export class ReasonCubeDisplay
    extends AirEntity {

    @Column({ name: 'FACTOR_COORDINATE_AXIS', nullable: false })
    @DbString()
    axis: 'x' | 'y' | 'z'

    @Column({ name: 'POSITION_ORIENTATION', nullable: false })
    @DbNumber()
    dir: -1 | 1

    @Column({ name: 'FACTOR_NUMBER', nullable: false })
    @DbNumber()
    factorNumber: 1 | 2 | 3

    @Column({ name: 'COLOR_BLUE', nullable: false })
    blue: number // 0-255

    @Column({ name: 'COLOR_GREEN', nullable: false })
    green: number // 0-255

    @Column({ name: 'COLOR_RED', nullable: false })
    red: number // 0-255

}
