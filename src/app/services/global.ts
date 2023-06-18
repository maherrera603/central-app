<<<<<<< HEAD
export const url: string = "https://central-l4ub.onrender.com/api/"
=======
import * as CryptoJS from "crypto-js";

export const url: string = "http://localhost:8000/api/"
const key:string = "pruebafinal";

export const encrypt = (data:string):string => {
  return CryptoJS.AES.encrypt(data, key).toString();
}

export const desencrypt = (data:string|null):string|null => {
  if (data != null){
    return CryptoJS.AES.decrypt(data, key).toString();
  }
  return null;
}
>>>>>>> developer
