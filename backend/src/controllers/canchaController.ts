import { Request, Response } from "express";
import { CanchaService } from "../services/canchaService";

import Cloudinary from "cloudinary"

const cloudinary = Cloudinary.v2
cloudinary.config({
    cloud_name:"dz8trxow0",
    api_secret:"Lo_fKzCLMPRY6SdkyYBfz7FdBHs",
    api_key:"175495817645828"
})

const uploadImage = async (imagePath: any) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, options);
      console.log(result.url);
      return result.url;
    } catch (error) {
      console.error(error);
    }
};


const canchaService = new CanchaService()
export class CanchaController {
    static async getAllCancha(req: Request, res: Response) {
        const reservas = await canchaService.getAllCanchas();
        res.json(reservas);
    }

    static async createCancha(req: Request, res: Response) {
        try {
            const url = await uploadImage(req.file?.path)
            req.body.urlImg = url
            console.log("acá tizi",req.body)
            const newCancha = await canchaService.createCancha(req.body);
            res.status(201).json(newCancha);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async deleteCancha(req: Request, res: Response){
        try {
            const {id} = req.params
            const result = await canchaService.deleteCancha(id)
            if (!result.affected) return res.status(409).json("no se borró nada.")
            res.status(201).json("se borró una cancha.")
        } catch (error:any) {
            res.status(400).json({message: error.message || "desconocido"})
        }
    }
} 
