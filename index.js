import crypto from 'crypto';
import { ml_dsa65 } from '@noble/post-quantum/ml-dsa.js';

// 1. 导出：生成混合密钥对
export function generateHybridKeyPair() {
  const ed25519Keys = crypto.generateKeyPairSync('ed25519');
  const mlDsa65Keys = ml_dsa65.keygen();
  return {
    ed25519: {
      // 直接使用 Node.js 原生的 KeyObject，避免解码报错
      publicKey: ed25519Keys.publicKey,
      privateKey: ed25519Keys.privateKey,
    },
    mlDsa65: {
      publicKey: mlDsa65Keys.publicKey,
      secretKey: mlDsa65Keys.secretKey
    }
  };
}

// 2. 导出：混合签名（同时用两种算法）
export function hybridSign(message, keys) {
  const messageBuffer = Buffer.from(message);
  
  // 传统签名
  const ed25519Signature = crypto.sign(null, messageBuffer, keys.ed25519.privateKey);
  // 抗量子签名
  const mlDsa65Signature = ml_dsa65.sign(messageBuffer, keys.mlDsa65.secretKey);
  
  return {
    ed25519: ed25519Signature,
    mlDsa65: mlDsa65Signature
  };
}

// 3. 导出：混合验证（两种签名都必须通过）
export function hybridVerify(message, signatures, keys) {
  const messageBuffer = Buffer.from(message);
  
  const ed25519Valid = crypto.verify(null, messageBuffer, keys.ed25519.publicKey, signatures.ed25519);
  const mlDsa65Valid = ml_dsa65.verify(signatures.mlDsa65, messageBuffer, keys.mlDsa65.publicKey);
  
  return ed25519Valid && mlDsa65Valid;
}