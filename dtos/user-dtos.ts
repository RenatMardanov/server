import { DtoUserModel, IUser } from "./../types/types";

// TO DO РАЗОБРАТЬСЯ В МАГИИ

export class UserDto {
    email;
    id;
    isActivated;

    constructor(model: DtoUserModel) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
    }
}
