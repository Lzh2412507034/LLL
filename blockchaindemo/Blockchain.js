const Block = require("./Block");
const crypto = require("crypto");

class Blockchain {
    //初始化一个新的区块链
    constructor() {
        this.blockchain = [Block.genesis];
        this.difficulty = 3;
    }
    //获取区块链中的所有区块数组
    get() {
        return this.blockchain;
    }
    // 获取区块链中的最新区块（整条链的最末端）
    get latestBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }
    // 验证哈希值是否满足要求的函数
    isValidHashDifficulty(hash) {
        for (var i = 0; i < hash.length; i++) {
            if (hash[i] !== "0") {
                break;
            }
        }
        return i >= this.difficulty;
    }
    //为一个区块对象计算哈希值
    calculateHashForBlock(block) {
        const { index, previousHash, timestamp, data, nonce } = block;
        return this.calculateHash(index, previousHash, timestamp, data, nonce);
    }
    // 通用的计算哈希值函数的方法
    calculateHash(index, previousHash, timestamp, data, nonce) {
        return crypto
            .createHash("sha256")
            .update(index + previousHash + timestamp + data + nonce)
            .digest("hex");
    }
    // 挖矿方法--创建新的区块并添加到区块链中
    mine(data) {
        const newBlock = this.generateNextBlock(data);
        try {
            this.addBlock(newBlock);
        } catch (error) {
            console.log(error);
        }
    }
    // 生成下一个区块的方法---执行工作量证明
    generateNextBlock(data) {
        const nextIndex = this.latestBlock.index + 1;
        const previousHash = this.latestBlock.hash;
        let timestamp = new Date().getTime();
        let nonce = 0;
        let nextHash = this.calculateHash(
            nextIndex,
            previousHash,
            timestamp,
            data,
            nonce,
        );
        while (!this.isValidHashDifficulty(nextHash)) {
            nonce = nonce + 1;
            timestamp = new Date().getTime();
            nextHash = this.calculateHash(
                nextIndex,
                previousHash,
                timestamp,
                data,
                nonce,
            );
        }
        const newBlock = new Block(
            nextIndex,
            previousHash,
            timestamp,
            data,
            nextHash,
            nonce,
        );
        return newBlock;
    }
    //添加区块到区块链中
    addBlock(newBlock) {
        if (this.isVaildNextBlock(newBlock, this.latestBlock)) {
            this.blockchain.push(newBlock);
        } else {
            throw "添加的区块无效";
        }
    }
    //验证新区块是否是前一个区块的有效后继
    isVaildNextBlock(nextBlock, previousBlock) {
        const nextBlockHash = this.calculateHashForBlock(nextBlock);
        if (previousBlock.index + 1 !== nextBlock.index) {
            return false;
        } else if (previousBlock.hash !== nextBlock.previousHash) {
            return false;
        } else if (nextBlockHash !== nextBlock.hash) {
            return false;
        } else if (!this.isValidHashDifficulty(nextBlockHash)) {
            return false;
        } else {
            return true;
        }
    }
    // 验证整条区块链是否合法且有效
    isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis)) {
            return false;
        }
        const tempChain = [chain[0]];
        for (let i = 1; i < chain.length; i++) {
            if (this.isVaildNextBlock(chain[i], tempChain[i - 1])) {
                tempChain.push(chain[i]);
            } else {
                return false;
            }
        }
        return true;
    }
    // 验证新链是否比当前链更长
    isChainLonger(chain) {
        return chain.length > this.blockchain.length;
    }
    // 替换区块链的方法
    replaceChain(newChain) {
        if (this.isValidChain(newChain) && this.isChainLonger(newChain)) {
            this.blockchain = JSON.parse(JSON.stringify(newChain));
        } else {
            console.log("error++++++++++++++++++++++++++++++");
        }
    }
}
module.exports = Blockchain;
