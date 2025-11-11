import { canchaRepository  } from "../repositories/canchaRepository";
import { Cancha } from "../entities/Cancha";
import { DeleteResult } from "typeorm";


export class CanchaService {

    async getAllCanchas(): Promise<Cancha[]> 
    {
        return await canchaRepository.find();
    }

    async createCancha(data:any): Promise<Cancha[]> {
        const cancha = canchaRepository.create(data);
         
        return canchaRepository.save(cancha);
    }

    async deleteCancha(id:any): Promise<DeleteResult>{
        return await canchaRepository.delete({id_cancha: id})
    }
}