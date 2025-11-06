import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne, 
  JoinColumn, 
} from "typeorm";
import { User } from "./User"; 
import { Cancha } from "./Cancha";

@Entity('reservas')
export class Reserva {
    @PrimaryGeneratedColumn()
    id_reserva!: number;

    @Column()
    fecha!: Date;

    @Column()
    hora_inicio!: string ;

    @Column()
    hora_fin!: string;

    @ManyToOne(() => User, { eager: true }) 
    @JoinColumn({name: "id_usuario"}) 
    id_usuario!: User;

    @ManyToOne(() => Cancha, { eager: true })
    @JoinColumn({ name: 'id_cancha' })
    id_cancha!: Cancha;

}