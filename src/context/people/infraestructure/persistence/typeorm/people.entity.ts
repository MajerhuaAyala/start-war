import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {FilmEntity} from "../../../../film/infraestructure/persistence/typeorm/film.entity";
import {VehicleEntity} from "../../../../vehicle/infraestructure/persistence/typeorm/vehicle.entity";

@Entity("people")
export class PeopleEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({nullable: false, type: "varchar"})
    nombre: string

    @Column({type: "number"})
    peso: number

    @Column({type: "varchar"})
    colorPelo: string

    @Column({ nullable: true })
    colorPiel: string;

    @Column({ nullable: true })
    colorOjo: string;

    @Column({ type: "date", nullable: true })
    fechaNacimiento: Date;

    @Column({ nullable: true })
    genero: string;

    @Column({ nullable: true })
    planetaNatal: string;

    @Column({ nullable: true })
    especie: string;

    @CreateDateColumn()
    creado: Date;

    @UpdateDateColumn()
    editado: Date;

    @ManyToMany(() => FilmEntity)
    @JoinTable()
    films: FilmEntity[];

    @ManyToMany(() => VehicleEntity)
    @JoinTable()
    vehicles: VehicleEntity[];

}