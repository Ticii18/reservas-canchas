import { DeleteResult } from "typeorm";
import { Reserva } from "../entities/Reserva";
import { reservaRepository } from "../repositories/reservaRepository";


export class ReservaService {

    async getAllReservas(): Promise<Reserva[]> 
    {
        return await reservaRepository.find();
    }

    async createReserva(data: any): Promise<any> {
        const reserva = reservaRepository.create(data);
        return reservaRepository.save(reserva);
    }

    async deleteReserva(id: number): Promise<DeleteResult>{
        return await reservaRepository.delete({id_reserva:id})
    }
}