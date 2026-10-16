const Block = require("./Block");
const Blockchain = require("./Blockchain");

console.log("====区块链测试开始========");

try {
    // 1. 测试创世纪区块11111111111111111111111111111111111111111
    console.log("1. 测试创世区块:");
    const genesis = Block.genesis;
    console.log("--索引：", genesis.index);
    console.log("--数据：", genesis.data);
    console.log("--哈希值：", genesis.hash);
    console.log("--时间戳：", genesis.timestamp);
    console.log("--nonce：", genesis.nonce);
    // 2.测试初始化区块链
    console.log("2. 测试区块链初始化：");
    const blockchain = new Blockchain();
    console.log("--区块链长度：", blockchain.get().length);
    console.log("--区块的最新索引：", blockchain.latestBlock.index);
    console.log("--挖矿难度：", blockchain.difficulty);
    // 3.测试哈希难度验证
    console.log("3. 测试哈希难度验证：");
    console.log("--当前难度要求：", blockchain.difficulty, "个前导0");
    const validHash = "000abc123def";
    const invalidHash = "00123def1111";
    console.log("--有效哈希值：", validHash);
    console.log("--无效哈希值：", invalidHash);
    console.log(
        '--"' + validHash + '" 是否有效哈希值：',
        blockchain.isValidHashDifficulty(validHash),
    );
    console.log(
        '--"' + invalidHash + '" 是否有效哈希值：',
        blockchain.isValidHashDifficulty(invalidHash),
    );
    // 4.测试hash计算
    console.log("4. 测试hash计算：");
    const testHash = blockchain.calculateHash(
        0,
        "0",
        65455221232,
        "first block111",
        0,
    );
    console.log("--测试哈希值：", testHash);
    console.log("--哈希值长度：", testHash.length, "字符");
    // 5.测试挖矿，挖第一个区块
    console.log("5. 测试挖矿，挖第一个区块：");
    blockchain.mine("123456");
    console.log("--挖矿后的索引：", blockchain.latestBlock.index);
    console.log("--挖矿后的哈希值：", blockchain.latestBlock.hash);
    console.log("--挖矿后的数据：", blockchain.latestBlock.data);
    console.log("--挖矿后的nonce：", blockchain.latestBlock.nonce);
    console.log("--当前区块链长度: ", blockchain.get().length);
    console.log("=========================挖矿成功1=======================");
    // 6.测试挖矿，挖第二个区块
    console.log("6. 测试挖矿，挖第二个区块：");
    blockchain.mine("789456");
    console.log("--挖矿后的索引：", blockchain.latestBlock.index);
    console.log("--挖矿后的哈希值：", blockchain.latestBlock.hash);
    console.log("--挖矿后的数据：", blockchain.latestBlock.data);
    console.log("--挖矿后的nonce：", blockchain.latestBlock.nonce);
    console.log("--当前区块链长度: ", blockchain.get().length);
    console.log("=========================挖矿成功2=======================");
    // 7.测试区块链验证
    console.log("7. 测试区块链验证：");
    const isValid = blockchain.isValidChain(blockchain.get());
    console.log("--区块链是否有效：", isValid);
    console.log("=========================区块链验证成功=======================");
    // 8.测试显示完整的区块链
    console.log("8. 测试显示完整的区块链：");
    blockchain.get().forEach((block, index) => {
        console.log(`区块${index}`);
        console.log(`索引：${block.index}`);
        console.log(`哈希值：${block.hash}`);
        console.log(`数据：${block.data}`);
        console.log(`时间戳：${new Date(block.timestamp).toLocaleString("zh-CN")}`);
        console.log(`nonce：${block.nonce}`);
        console.log(`前一个哈希值：${block.previousHash}`);
        console.log("=======================");
    });
    console.log("=========================显示区块链成功=======================");
    // 9.测试区块验证
    console.log("9. 测试区块验证：");
    const block0 = blockchain.get()[0];
    const block1 = blockchain.get()[1];
    const isNextBlockValid = blockchain.isVaildNextBlock(block1, block0);
    console.log("--区块是否有效：", isNextBlockValid);
    console.log("=========================区块验证通过=======================");
} catch (error) {
    console.log(error);
}
