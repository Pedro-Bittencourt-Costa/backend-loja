import { CreateUserDto } from "../domain/dto/CreateUserDto";
import { ResponseUserDto } from "../domain/dto/ResponseUserDto";
import { Permissions } from "../domain/entities/Permissions";
import { User } from "../domain/entities/User";
import { PermissionsEnum } from "../domain/enums/PermissionsEnum";
import { Cpf } from "../domain/value-objects/Cpf";
import { Email } from "../domain/value-objects/Email";
import { HashedPassword } from "../domain/value-objects/HashedPassword";
import { Name } from "../domain/value-objects/Name";
import { Telephone } from "../domain/value-objects/Telephone";
import { ICrudRepository } from "../repository/ICrudRepository";
import { IUserRepository } from "../repository/UserRepository";
import { ICrudService } from "./ICrudService";

export class UserService implements ICrudService<User, ResponseUserDto, CreateUserDto, CreateUserDto> {
    
    protected readonly userRepository: IUserRepository;
    protected readonly permissionRepository: ICrudRepository<Permissions>;

    constructor(userRepository: IUserRepository, permissionRepository: ICrudRepository<Permissions>){
        this.userRepository = userRepository;
        this.permissionRepository = permissionRepository;
    }
    
    async findAll(relations?: string[]): Promise<ResponseUserDto[]> {
        const users = await this.userRepository.findAll(relations);
        return users.map(user => new ResponseUserDto(user));
    }

    async findById(id: number, relations?: string[]): Promise<ResponseUserDto> {
        const user = await this.userRepository.findById(id, relations);
        if(!user) throw new Error('User not found');
        return new ResponseUserDto(user);
    }

    async create(data: CreateUserDto): Promise<ResponseUserDto> {
       
        const cpf = Cpf.create(data.cpf);
        const email = Email.create(data.email);
        const telephone = Telephone.create(data.telephone);

        const [cpfExist, emailExist, telephoneExist] = await Promise.all([
            this.userRepository.findByCpf(cpf),
            this.userRepository.findByEmail(email),
            this.userRepository.findByTelephone(telephone)
        ]);

        const permission = await this.permissionRepository.findById(PermissionsEnum.CUSTOMER);
        if(!permission) throw new Error('Permission not found');

        if(cpfExist) throw new Error('CPF is already being used');
        if(emailExist) throw new Error('Email is already being used');
        if(telephoneExist) throw new Error('Telephone is already being used');

        const hashedPassword = await HashedPassword.create(data.password);

        const user = new User();
        user.name = new Name(data.name.first, data.name.surname);
        user.cpf = cpf;
        user.email = email;
        user.telephone = telephone;
        user.hashedPassword = hashedPassword;
        user.permissions = [permission]

        const newUser = await this.userRepository.create(user);

        return new ResponseUserDto(newUser);
    }

    async update(id: number, data: Partial<CreateUserDto>): Promise<void> {
       
        const userExist = await this.userRepository.findById(id);
        if(!userExist) throw new Error('User not found');

        if(data.cpf && data.cpf != userExist.cpf.value) {
            const cpf = Cpf.create(data.cpf);
            const cpfExist = await this.userRepository.findByCpf(cpf);
            if(cpfExist) throw new Error('CPF is already being used');
            userExist.cpf = cpf;
        }

        if(data.email && data.email != userExist.email.value) {
            const email = Email.create(data.email);
            const emailExist = await this.userRepository.findByEmail(email);
            if(emailExist) throw new Error('Email is already being used');
            userExist.email = email;
        }

        if(data.telephone && data.telephone != userExist.telephone.value) {
            const telephone = Telephone.create(data.telephone);
            const telephoneExist = await this.userRepository.findByTelephone(telephone);
            if(telephoneExist) throw new Error('Telephone is already being used');
            userExist.telephone = telephone;
        }

        if(data.name){
            const name = new Name(data.name.first, data.name.surname);
            if(!userExist.name.equals(name)){
                userExist.name = name;
            }
        }

        if(data.password && await userExist.hashedPassword.checkPassword(data.password)){
            userExist.hashedPassword = await HashedPassword.create(data.password);
        }

        if((await this.userRepository.update(id, userExist)).affected === 0){
            throw new Error('error when updating user');
        }

    }

}