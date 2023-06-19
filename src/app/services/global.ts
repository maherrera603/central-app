import * as CryptoJS from "crypto-js"

export const url: string = "http://localhost:8000/api/"
const key:string = "HolaMundo";


export function sha256(param:string): string {
  return CryptoJS.SHA256(param).toString();
}

export function enctrypAES(param:string): string {
  return CryptoJS.AES.encrypt(param, key).toString();
}

export function desencryptAES(param:string|null): string{
  if (!param) return "null";
  return CryptoJS.AES.decrypt(param, key).toString(CryptoJS.enc.Utf8);
}
