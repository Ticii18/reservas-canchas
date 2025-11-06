// Rol.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./User";

@Entity('roles')
export class Rol {
    @PrimaryGeneratedColumn({ name: 'id_rol' })
    id_rol!: number;

    @Column({ name: 'rol' })
    rol!: string;

    @OneToMany(() => User, (user) => user.rol)
    usuarios!: User[];
}
