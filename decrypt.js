const { readFile, writeFile } = require('fs').promises;
const { decryptText, hash} = require('./cipher');
const {ENCRYPTION_SALT, HASH_SALT} = require('./constans');



const [,,fileName,pwd] = process.argv;

(async () => {

    const json = await readFile(fileName, 'utf8');
    const encrypted = JSON.parse(json);
    const decrypted = await decryptText(encrypted.encrypted, pwd, ENCRYPTION_SALT, encrypted.iv);
    const decryptedHash = hash(decrypted, HASH_SALT);

    if (decryptedHash === encrypted.hash) {
        await writeFile(fileName, decrypted, 'utf8');
        console.log('Done!');
    } else {
        console.log('File is bad!');
    }
})();