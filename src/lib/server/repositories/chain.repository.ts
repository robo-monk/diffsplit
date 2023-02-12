import { type IEntity, KVRepository, type StoredIEntity } from "../services/kv.service";
import type { Expense } from "./expense.repository";
import type { User } from "./user.repository";

export interface Chain extends IEntity {
    name: string;
    users: (User & StoredIEntity)[]
    expenses: (Expense & StoredIEntity)[]
}

export class ChainRepository extends KVRepository<Chain> {}

// const chain = new ChainEntity()
// const newChain = await chain.create({ name: 'test' });
// newChain.id?.at()

// chain.update({ id: '123', name: 'test' })
