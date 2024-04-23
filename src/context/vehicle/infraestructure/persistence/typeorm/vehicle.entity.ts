import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

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
}