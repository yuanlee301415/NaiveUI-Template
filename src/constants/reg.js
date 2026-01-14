/*
* 登录名 正则
* */
const LOGIN_NAME_REG = /^[a-z\d]{3,20}$/


/*
* 用户名 正则
* 所有的中文字符（包括简体中文、繁体中文、日文汉字、韩文汉字等）
* 所有英文字母（大小写）
* 数字
* 下划线
* 中划线
* */
export const USER_NAME_REG = /^[\u4E00-\u9FA5a-zA-Z0-9_-]{4,16}$/;

/** Phone reg */
export const PHONE_REG =
  /^[1](([3][0-9])|([4][01456789])|([5][012356789])|([6][2567])|([7][0-8])|([8][0-9])|([9][012356789]))[0-9]{8}$/;

/**
 * 密码 正则
 * 6-18 characters, including letters, numbers, and underscores
 */
export const PWD_REG = /^\w{6,18}$/;

/** Email reg */
export const EMAIL_REG = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

/** Six digit code reg */
export const CODE_SIX_REG = /^\d{6}$/;

/** Four digit code reg */
export const CODE_FOUR_REG = /^\d{4}$/;

/** Url reg */
export const URL_REG =
  /(((^https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
