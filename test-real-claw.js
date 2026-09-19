import { generateHybridKeyPair, hybridSign, hybridVerify } from './pqc-hybrid.js';

console.log('=== 真实 OpenClaw 源码环境集成测试 ===');
console.log('🦞 当前环境：OpenClaw 官方源码目录 (openclaw-real)');
console.log('📂 抗量子模块：pqc-integration/pqc-hybrid.js\n');

const gatewayKeys = generateHybridKeyPair();
console.log('✅ OpenClaw 网关混合密钥已生成（Ed25519 + ML-DSA-65）');

const clientKeys = generateHybridKeyPair();
const challenge = 'OpenClaw-真实环境挑战-' + Date.now();
const signatures = hybridSign(challenge, clientKeys);
console.log(`📡 挑战内容：${challenge}`);
console.log('✅ 客户端混合签名完成\n');

const isValid = hybridVerify(challenge, signatures, clientKeys);
console.log(`🔐 网关认证结果：${isValid ? '✅ 通过（抗量子混合签名验证成功）' : '❌ 拒绝'}`);

const isHacked = hybridVerify('被篡改的挑战', signatures, clientKeys);
console.log(`🛡️  防御结果：${isHacked ? '❌ 异常通过' : '✅ 正确拒绝（抗量子签名防御有效）'}`);