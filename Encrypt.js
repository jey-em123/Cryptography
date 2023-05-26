const fs = require('fs');

function vigenereEncrypt(plaintext, key) {
  let ciphertext = '';
  key = key.toUpperCase();
  plaintext = plaintext.toUpperCase();

  for (let i = 0; i < plaintext.length; i++) {
    const char = plaintext[i];
    if (char.match(/[A-Z]/)) {
      const keyChar = key[i % key.length];
      const keyShift = keyChar.charCodeAt(0) - 'A'.charCodeAt(0);
      const encrypted = String.fromCharCode(((char.charCodeAt(0) - 'A'.charCodeAt(0) + keyShift) % 26) + 'A'.charCodeAt(0));
      ciphertext += encrypted;
    }
  }

  return ciphertext;
}

fs.readFile('data.txt', 'utf8', (err, plaintext) => {
  if (err) {
    console.error('Error reading data.txt:', err);
    return;
  }

  const key = 'CUTE';

  
  const encrypted = vigenereEncrypt(plaintext, key);
  console.log('Encrypted:', encrypted);

  fs.writeFile('data_encrypted.txt', encrypted, (err) => {
    if (err) {
      console.error('Error creating data_encrypted.txt:', err);
      return;
    }
    console.log('data_encrypted.txt file created.');
  });
});
