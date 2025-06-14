import { CreateAddressDto } from "../domain/dto/CreateAddressDto";
import { ICrudService } from "./ICrudService";
import { IUserRepository } from "../repository/UserRepository";
import { ResponseAddressDto } from "../domain/dto/ResponseAddressDto";
import { IAddressRepository } from "../repository/AddressReposiroy";
import { Address } from "../domain/entities/Address";
import { ResponseUserDto } from "../domain/dto/ResponseUserDto";
import { Cep } from "../domain/value-objects/Cep";
import { HouseNumber } from "../domain/value-objects/HouseNumber";

export interface IAddressService extends ICrudService<Address, ResponseAddressDto, CreateAddressDto, Partial<CreateAddressDto>>{
    
}

export class AddressService implements IAddressService {
    
    private readonly addressRepository: IAddressRepository;
    private readonly userRepository: IUserRepository;

    constructor(addressRepository: IAddressRepository, userRepository: IUserRepository) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }

    private toResponseDto(address: Address): ResponseAddressDto {
        const response = new ResponseAddressDto({
            id: address.id,
            street: address.street,
            district: address.district,
            reference: address.reference,
            complement: address.complement,
            // Extrai o valor primitivo dos Value Objects
            cep: address.cep.value,
            number: address.number.value,
        });

        // Mapeia o usuário associado para seu próprio DTO, se ele existir
        if (address.user) {
            response.user = new ResponseUserDto(address.user)
        }

        return response;
    }

    async findAll(): Promise<ResponseAddressDto[]> {
        const address = await this.addressRepository.findAll(['user']);
        return address.map((address) => this.toResponseDto(address));
    }

    async findById(id: number): Promise<ResponseAddressDto> {
        const address = await this.addressRepository.findById(id, ['user']);
        if (!address) {
            throw new Error('Address not found');
        }
        return this.toResponseDto(address);
    }
    
    
    async create(data: CreateAddressDto): Promise<ResponseAddressDto> {
        const userExist = await this.userRepository.findById(data.idUser);
        if (!userExist) {
            throw new Error('User not found');
        }

        const address = new Address({
            cep: Cep.create(data.cep),
            street: data.street,
            district: data.district,
            number: HouseNumber.create(data.number),
            reference: data.reference ?? null,
            complement: data.complement ?? null,
        });

        address.user = userExist;

        const newAddress = await this.addressRepository.create(address);
        return this.toResponseDto(newAddress);
    }

    async update(id: number, data: Partial<CreateAddressDto>): Promise<void> {
        const addressExist = await this.addressRepository.findById(id);
        if(!addressExist) throw new Error('Address not found');

        // Atualiza os campos primitivos e os Value Objects
        if (data.street) addressExist.street = data.street;
        if (data.district) addressExist.district = data.district;
        if (data.reference) addressExist.reference = data.reference;
        if (data.complement) addressExist.complement = data.complement;

        if (data.cep && data.cep !== addressExist.cep.value) {
            addressExist.cep = Cep.create(data.cep);
        }
        if (data.number && data.number !== addressExist.number.value) {
            addressExist.number = HouseNumber.create(data.number);
        }

        const result = await this.addressRepository.update(id, addressExist);
        if (result.affected === 0) {
            throw new Error('Error when updating address');
        }
    }

    // async delete(id: number): Promise<void> {
    //     // Verifica se o endereço existe antes de tentar deletar
    //     await this.findById(id); 
        
    //     const result = await this.addressRepository.delete(id);
    //     if (result.affected === 0) {
    //         throw new Error('Address not found for deletion');
    //     }
    // }
}