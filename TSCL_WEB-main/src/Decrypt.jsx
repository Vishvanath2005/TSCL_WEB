import CryptoJS from 'crypto-js';


const decryptData = (encryptedData) => {
  
  const key = CryptoJS.enc.Hex.parse("9b7bdbd41c5e1d7a1403461ba429f2073483ab82843fe8ed32dfa904e830d8c9");
  const iv = CryptoJS.enc.Hex.parse("33224fa12720971572d1a5677cede948");

  
  const encryptedWordArray = CryptoJS.enc.Hex.parse(encryptedData);

 
  const decrypted = CryptoJS.AES.decrypt(
    { ciphertext: encryptedWordArray },
    key,
    { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
  );


  const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);

  
  try {
    return JSON.parse(decryptedString);
  } catch (error) {
    console.error('Failed to parse decrypted data as JSON:', error);
    return null; 
  }
};

export default decryptData;
