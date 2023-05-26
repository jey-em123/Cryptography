const fs = require('fs');

function vigenereDecrypt(ciphertext, key) {
  let plaintext = '';
  key = key.toUpperCase();
  ciphertext = ciphertext.toUpperCase();

  for (let i = 0; i < ciphertext.length; i++) {
    const char = ciphertext[i];
    if (char.match(/[A-Z]/)) {
      const keyChar = key[i % key.length];
      const keyShift = keyChar.charCodeAt(0) - 'A'.charCodeAt(0);
      const decrypted = String.fromCharCode(((char.charCodeAt(0) - 'A'.charCodeAt(0) - keyShift + 26) % 26) + 'A'.charCodeAt(0));
      plaintext += decrypted;
    }
  }

  return plaintext;
}

fs.readFile('data_encrypted.txt', 'utf8', (err, ciphertext) => {
  if (err) {
    console.error('Error reading data_encrypted.txt:', err);
    return;
  }

  const key = 'CUTE'; 

  const decrypted = vigenereDecrypt(ciphertext, key);
  console.log('Decrypted:', decrypted);

  fs.writeFile('data_decrypted.txt', decrypted, (err) => {
    if (err) {
      console.error('Error creating data_decrypted.txt:', err);
      return;
    }
    console.log('data_decrypted.txt file created.');
  });
});
