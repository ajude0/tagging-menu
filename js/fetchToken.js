import CryptoJS from "crypto-js";

// export const encryptData = (data) => {
//   const secretKey = "mysjjdsadiemcaedadfafaf=="; // Use a strong secret key for encryption
//   const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
//   return encrypted.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
// };
export const encryptData = (data) => {
  const secretKey = "your-secret-key"; // Use a strong secret key for encryption
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

export const getToken = () => {
  const encryptedToken = localStorage.getItem("token");
  return encryptedToken ? decryptData(encryptedToken) : null;
};
export const getRole = () => {
  const encryptedToken = localStorage.getItem("role");
  return encryptedToken ? decryptData(encryptedToken) : null;
};
export const getIsApproved = () => {
  const encryptedToken = localStorage.getItem("isApproved");
  return encryptedToken ? decryptData(encryptedToken) : null;
};
export const decryptData = (encryptedData) => {
  const secretKey = "your-secret-key";
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
