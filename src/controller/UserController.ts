import { CreateUserDto } from "../domain/dto/CreateUserDto";
import { ResponseUserDto } from "../domain/dto/ResponseUserDto";
import { User } from "../domain/entities/User";
import { UserService } from "../service/UserService";
import { CrudController } from "./CrudController";

export class UserController extends CrudController<User, ResponseUserDto, CreateUserDto, CreateUserDto >{

    constructor(protected readonly service: UserService){
        super(service);
    }

}