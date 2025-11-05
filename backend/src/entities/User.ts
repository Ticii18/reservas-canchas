// User.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Rol } from "./Rol";

@Entity('usuarios')
export class User {
    @PrimaryGeneratedColumn({ name: 'id_usuario' })
    id_usuario!: number;

    @Column()
    nombre!: string;

    @Column()
    apellido!: string;

    @Column()
    telefono!: number;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @ManyToOne(() => Rol, (rol) => rol.usuarios, { nullable: false })
    @JoinColumn({ name: 'id_rol', referencedColumnName: 'id_rol' })
    rol!: Rol;
}
