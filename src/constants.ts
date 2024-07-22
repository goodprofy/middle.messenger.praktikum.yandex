/* eslint-disable no-useless-escape */
export const PASSWORD_REG_EXP = /(?=.*[A-Z])(?=.*\d).+/;
export const LOGIN_REG_EXP = /(?=.*[a-zA-Z])[a-zA-Z0-9_\-]*/;
export const NAME_REG_EXP = /[A-ZА-Я][a-zа-я\-]+/;
export const EMAIL_REG_EXP = /[a-zA-Z0-9_\-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)+/;
export const PHONE_REG_EXP = /\+?\d{10,15}/;

export const API_BASE_URL = 'https://ya-praktikum.tech/api/v2/';
export const API_WS_URL = 'wss://ya-praktikum.tech/ws/';
