import { type BaseKvEntityInterface, KVRepository } from "../services/kv.service";

type User = any;
export interface Chain extends BaseKvEntityInterface {
    name: string;
    users: User[]
}

export class ChainRepository extends KVRepository<Chain> {}

// const chain = new ChainEntity()
// const newChain = await chain.create({ name: 'test' });
// newChain.id?.at()

// chain.update({ id: '123', name: 'test' })
