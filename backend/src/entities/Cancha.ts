import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
} from "typeorm";

@Entity('canchas') 
export class Cancha {
    @PrimaryGeneratedColumn()
    id_cancha!: number;

    @Column()
    nombre!: string;

    @Column() 
    tipo_pasto!: string ;

    @Column() 
    precio_hora!: string;

    @Column()
    estado!:string;
}