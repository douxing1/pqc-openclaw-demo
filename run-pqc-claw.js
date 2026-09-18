import { generateHybridKeyPair, hybridSign, hybridVerify } from './index.js';

console.log('=== 抗量子龙虾（OpenClaw）实际运行模拟 ===\n');
console.log('🦞 正在启动 OpenClaw 网关（模拟环境）...');

// 1. 模拟龙虾网关启动，生成自己的混合密钥
const gatewayKeys = generateHybridKeyPair();
console.log('✅ 网关设备密钥生成成功（Ed25519 + ML-DSA-65）\n');

// 2. 模拟客户端发起连接，发送挑战请求
const challenge = '随机挑战字符串-' + Date.now();
console.log(`📡 网关向客户端发送挑战: "${challenge}"`);

// 3. 模拟客户端生成自己的密钥，并对挑战进行混合签名
const clientKeys = generateHybridKeyPair();
const signatures = hybridSign(challenge, clientKeys);
console.log('✅ 客户端混合签名完成\n');

// 4. 模拟龙虾网关验证客户端签名
console.log('🔍 网关正在验证客户端签名...');
const isValid = hybridVerify(challenge, signatures, clientKeys);
console.log(`🔐 网关认证结果: ${isValid ? '✅ 通过（抗量子混合签名验证成功）' : '❌ 拒绝'}`);

// 5. 模拟黑客篡改挑战内容进行攻击
console.log('\n⚠️  模拟黑客篡改挑战内容...');
const fakeChallenge = '被篡改的挑战';
const isHacked = hybridVerify(fakeChallenge, signatures, clientKeys);
console.log(`🛡️  防御结果: ${isHacked ? '❌ 异常通过' : '✅ 正确拒绝（抗量子签名防御有效）'}`);