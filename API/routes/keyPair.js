import crypto from "crypto"

class keyPair {
  constructor() {
    this.keyPair = crypto.generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
    });
  }

  get publicKey() {
    return this.keyPair.publicKey;
  }

  get privateKey() {
    return this.keyPair.privateKey;
  }
}

export default keyPair