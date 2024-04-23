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

  @CreateDateColumn()
  creado: Date;

  @UpdateDateColumn()
  editado: Date;
}
