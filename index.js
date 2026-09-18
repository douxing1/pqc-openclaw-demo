import crypto from 'crypto';
import { ml_dsa65 } from '@noble/post-quantum/ml-dsa.js';

console.log('=== 抗量子混合签名 Demo ===\n');

// 1. 生成密钥对（相当于生成两把锁和两把钥匙）
const ed25519Keys = crypto.generateKeyPairSync('ed25519');
const mlDsa65Keys = ml_dsa65.keygen();
console.log('✅ 密钥生成完成');
console.log('   Ed25519 公钥长度：', ed25519Keys.publicKey.export({ type: 'spki', format: 'der' }).length, '字节');
console.log('   ML-DSA-65 公钥长度：', mlDsa65Keys.publicKey.length, '字节\n');

// 2. 对消息签名（相当于用两把钥匙给文件盖章）
const message = Buffer.from('Hello OpenClaw! 这是一条测试消息');
const ed25519Signature = crypto.sign(null, message, ed25519Keys.privateKey);
const mlDsa65Signature = ml_dsa65.sign(message, mlDsa65Keys.secretKey);
console.log('✅ 签名完成');
console.log('   Ed25519 签名长度：', ed25519Signature.length, '字节');
console.log('   ML-DSA-65 签名长度：', mlDsa65Signature.length, '字节\n');

// 3. 验证签名（检查盖章是否有效）
const ed25519Valid = crypto.verify(null, message, ed25519Keys.publicKey, ed25519Signature);
const mlDsa65Valid = ml_dsa65.verify(mlDsa65Signature, message, mlDsa65Keys.publicKey);
console.log('✅ 验证结果：');
console.log('   Ed25519 签名验证：', ed25519Valid ? '通过' : '失败');
console.log('   ML-DSA-65 签名验证：', mlDsa65Valid ? '通过' : '失败');
console.log('\n🔐 混合签名验证结果：', (ed25519Valid && mlDsa65Valid) ? '✅ 两种算法都通过' : '❌ 失败');

// 4. 篡改检测（如果有人改了文件，签名会失效）
const tamperedMessage = Buffer.from('Hello OpenClaw! 这是被篡改的消息');
const tamperedEd25519 = crypto.verify(null, tamperedMessage, ed25519Keys.publicKey, ed25519Signature);
const tamperedMlDsa65 = ml_dsa65.verify(mlDsa65Signature, tamperedMessage, mlDsa65Keys.publicKey);
console.log('\n⚠️  篡改检测：');
console.log('   篡改后 Ed25519 验证：', tamperedEd25519 ? '异常通过' : '正确拒绝');
console.log('   篡改后 ML-DSA-65 验证：', tamperedMlDsa65 ? '异常通过' : '正确拒绝');