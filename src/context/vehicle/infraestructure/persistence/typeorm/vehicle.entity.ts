import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity("people")
export class VehicleEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: "varchar"})
    nombre: string;

    @Column({type: "varchar"})
    modelo: string;

    @Column({type: "varchar"})
    fabricante: string;

    @Column({type: "number"})
    costoCreditos: number;

    @Column({type: "number"})
    longitud: number;

    @CreateDateColumn()
    creado: Date;

    @UpdateDateColumn()
    editado: Date;
}