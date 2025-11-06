import { Reserva } from "../entities/Reserva";
import { User } from "../entities/User";
import { reservaRepository } from "../repositories/reservaRepository";


export class ReservaService {

    async getAllReservas(): Promise<any[]> 
    {
        return await reservaRepository.find();
    }

    async createReserva(data: any): Promise<any> {
        const reserva = reservaRepository.create(data);
        return reservaRepository.save(reserva);
    }
}