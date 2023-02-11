import { KVRepository, type BaseKvEntityInterface } from "../services/kv.service";

interface User extends BaseKvEntityInterface {
    username: string;
}

export class UserRepository extends KVRepository<User> {}
