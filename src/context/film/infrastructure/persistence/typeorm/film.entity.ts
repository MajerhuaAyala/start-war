import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("films")
export class FilmEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  titulo: string;

  @Column({ type: "int" })
  episodio: number;

  @Column({ type: "longtext", nullable: true })
  apertura: string;

  @Column({ type: "varchar" })
  director: string;

  @CreateDateColumn()
  creado: Date;

  @UpdateDateColumn()
  editado: Date;
}
