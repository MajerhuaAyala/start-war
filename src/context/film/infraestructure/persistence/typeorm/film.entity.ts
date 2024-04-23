import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity("films")
export class FilmEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: "varchar"})
    titulo: string;

    @Column({type: "number"})
    episodio: number;

    @Column({type: "longtext"})
    apertura: string;

    @Column({type:"varchar"})
    director: string;

    @Column({type: "varchar"})
    productor: string;

    @Column({ type: "date" })
    fechalanzamiento: Date;

    @CreateDateColumn()
    creado: Date;

    @UpdateDateColumn()
    editado: Date;
}