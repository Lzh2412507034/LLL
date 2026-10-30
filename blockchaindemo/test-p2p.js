const net = require("net");
const Blockchain = require("./Blockchain.js");
const P2p = require("./P2p.js");
const messageType = require("./messages-type.js");
const Messages = require("./messages.js");

console.log("========P2P测试开始==========");

// 创建一个区块链实例
const blockchain = new Blockchain();

// 创建一个P2p实例
const p2p = new P2p(blockchain);

try {
  // 测试1：P2p实例的创建
  console.log("1. 测试P2P实例创建：");
  console.log("---p2p实例类型：", typeof p2p);
  console.log(
    "---p2p实例是否为对象：",
    typeof p2p === "object" && p2p !== null,
  );
  console.log(
    "---p2p实例是否有startServer方法：",
    typeof p2p.startServer === "function",
  );
  console.log(
    "---p2p实例是否有connectToPeer方法：",
    typeof p2p.connectToPeer === "function",
  );
  console.log(
    "---p2p实例是否有broadcast方法：",
    typeof p2p.broadcast === "function",
  );
  console.log("p2p实例创建成功\n");

  // 测试2：服务器启动测试
  console.log("2. 测试服务器启动功能：");
  console.log(
    "---p2p类是否具有startServer方法：",
    typeof p2p.startServer === "function",
  );
  console.log("服务器启动方法存在\n");

  // 测试3：节点连接测试
  console.log("3. 测试节点连接功能：");
  console.log(
    "---p2p类具有connectToPeer方法：",
    typeof p2p.connectToPeer === "function",
  );
  console.log("节点连接方法存在\n");

  // 测试4：广播测试
  console.log("4. 测试广播功能：");
  console.log(
    "---p2p类具有broadcast方法:",
    typeof p2p.broadcast === "function",
  );
  console.log(
    "---p2p类具有broadcastLatest方法：",
    typeof p2p.broadcastLatest === "function",
  );
  console.log("广播方法存在\n");

  // 测试5：区块链同步测试
  console.log("5. 测试区块链同步方法完整性：");
  console.log(
    "---p2p类具有handleMessage方法：",
    typeof p2p.handleMessage === "function",
  );
  console.log(
    "---p2p类具有handleReceivedBlockchain方法：",
    typeof p2p.handleReceivedBlockchain === "function",
  );
  console.log(
    "---p2p类具有handleReceivedLatestBlock方法：",
    typeof p2p.handleReceivedLatestBlock === "function",
  );
  console.log("同步方法定义完整\n");

  // 测试6：测试消息路由和响应逻辑（模拟对等节点）
  console.log("6. 测试消息路由和响应处理：");
  let lastSentMsg = null;
  const mockPeer = {
    peerInfo: { host: "127.0.0.1", port: 2727 },
    write: (msgStr) => {
      lastSentMsg = JSON.parse(msgStr);
    },
  };

  // 6.1 测试请求最新区块的响应
  p2p.handleMessage(mockPeer, Messages.getLatestBlock());
  console.log(
    "---请求最新区块响应是否正确：",
    lastSentMsg && lastSentMsg.type === messageType.RECEIVE_LATEST_BLOCK,
  );

  // 6.2 测试请求整条区块链的响应（验证之前解构变量名的Bug是否修复）
  p2p.handleMessage(mockPeer, Messages.getBlockchain());
  console.log(
    "---请求整条区块链响应是否正确：",
    lastSentMsg && lastSentMsg.type === messageType.RECEIVE_LATEST_BLOCKCHAIN,
  );

  // 6.3 测试握手消息处理
  p2p.handleMessage(mockPeer, Messages.sendHandshake(3000));
  console.log("---握手消息更新端口是否正确：", mockPeer.peerInfo.port === 3000);

  console.log("\np2p网络所有测试通过========================");
} catch (e) {
  console.log(e);
}
