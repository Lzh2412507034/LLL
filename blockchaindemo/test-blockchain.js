const Block = require("./Block");
console.log("====区块链测试开始========");
try {
    // 1. 测试创世区块
    console.log("1. 测试创世区块:");
    const genesis = Block.genesis;
    console.log("--索引: ", genesis.index);
    console.log("--数据: ", genesis.data);
    console.log("--哈希值: ", genesis.hash);
    console.log("--时间戳: ", genesis.timestamp);
    console.log("--nonce: ", genesis.nonce);
} catch (error) {
    console.log(error);
}
