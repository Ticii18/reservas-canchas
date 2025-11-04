import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity('usuarios')
export class User{
    @PrimaryGeneratedColumn()
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

    @Column()
    rol!: number;
    
    
}