import { KVRepository, type IEntity } from "../services/kv.service";

export interface User extends IEntity {
    username: string;
}

export class UserRepository extends KVRepository<User> {}
