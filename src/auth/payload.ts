import { Request } from "express";
import { ResponseUserDto } from "../domain/dto/ResponseUserDto";

export interface IPayload {
    usuario: ResponseUserDto;
}

export interface RequestWithPayload extends Request {
    payload: IPayload;
  }