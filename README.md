# 抗量子龙虾（OpenClaw）混合签名 Demo

## 项目简介
这是我的大二科研项目。我的任务是探索**抗量子密码（ML-DSA-65）**在 OpenClaw 网关认证中的可行性。

传统密码（如 Ed25519）在未来量子计算机面前会被破解，而 ML-DSA-65 是 NIST 在 2024 年标准化的抗量子签名算法（FIPS 204）。本项目由我独立借助 AI 辅助编程，实现了“传统 + 抗量子”的混合签名验证逻辑。

## 我做了什么
我实现了一个**混合签名**的小 Demo：
- 对同一条消息，同时用 **Ed25519**（传统密码）和 **ML-DSA-65**（抗量子密码）签名。
- 验证时，两种签名都必须通过，才算认证成功。
- 如果有人篡改消息，两种签名都会验证失败，实现了双重保险。

## 环境与依赖
- Node.js (v24.21.0 或更高)
- `@noble/post-quantum` 库

## 怎么运行
1. 安装 Node.js
2. 在项目文件夹打开终端，输入 `npm install`
3. 输入 `node index.js` 或 `node run-pqc-claw.js`
4. 你会看到签名和验证的完整输出结果。

## 真实 OpenClaw 源码环境集成测试
本项目已将抗量子模块放入 **OpenClaw 官方源码目录**的 `pqc-integration` 子模块中。
在 `pqc-integration` 目录下运行 `node test-real-claw.js`，实际输出结果如下：

🔐 网关认证结果：✅ 通过（抗量子混合签名验证成功）
🛡️  防御结果：✅ 正确拒绝（抗量子签名防御有效）
## 当前局限与后续计划
目前完成了最核心的密码学签名验证脚本，以及真实源码环境的集成测试。
后续计划：
- 把这个混合签名模块正式合并到 OpenClaw 的 Gateway 认证流程
- 研究 ML-KEM-768 密钥封装在 TLS 传输层的应用
- 学习 AEGIS 审计链的抗量子改造

## 参考
- NIST FIPS 204（ML-DSA 标准）
- [@noble/post-quantum](https://www.npmjs.com/package/@noble/post-quantum)
