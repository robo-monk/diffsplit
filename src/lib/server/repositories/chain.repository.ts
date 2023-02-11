import { type BaseKvEntityInterface, KVRepository } from "../services/kv.service";

interface Chain extends BaseKvEntityInterface {
    name: string;
}

export class ChainRepository extends KVRepository<Chain> {}

// const chain = new ChainEntity()
// const newChain = await chain.create({ name: 'test' });
// newChain.id?.at()

// chain.update({ id: '123', name: 'test' })
