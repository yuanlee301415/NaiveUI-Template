/*
* 表单规则
* */

import { toValue } from 'vue'
import { PHONE_REG, EMAIL_REG, CODE_FOUR_REG, PWD_REG, LOGIN_NAME_REG, USER_NAME_REG } from '@/constants/reg.js'

const phoneMessage = {
  requiredMessage: '请输入手机号',
  patternMessage: '手机号格式错误'
}

const codeFourMessage = {
  requiredMessage: '请输入验证码',
  patternMessage: '验证码格式错误，4位数字'
}

const loginNameMessage = {
  requiredMessage: '请输入用户名',
  patternMessage: '用户名格式错误，3-20位字符，包含小写字母、数字'
}

const nickNameMessage = {
  requiredMessage: '请输入昵称',
  patternMessage: '昵称格式错误，4-16位字符，包含汉字、大小写字母、数字、中划线、下划线'
}

const passwordMessage = {
  requiredMessage: '请输入密码',
  patternMessage: '密码格式错误，6-18位字符，包含大小写字母、数字、下划线'
}

const confirmPasswordMessage = {
  requiredMessage: '请再次输入密码',
  patternMessage: '再次密码不一致'
}

const emailMessage = {
  requiredMessage: '请输入邮箱地址',
  patternMessage: '邮箱格式错误'
}

export function useFormRules() {
  // 手机
  function createPhoneRules({ required = true, requiredMessage = phoneMessage.requiredMessage, patternMessage = phoneMessage.patternMessage, trigger = 'change', key } = {}) {
    const rules = [createPatternRule({ pattern: PHONE_REG, patternMessage, trigger, key })]
    required && rules.unshift(createRequiredRule({ required, requiredMessage, key }))
    return rules
  }

  // 4位验证码
  function createCodeFourRules({ required = true, requiredMessage = codeFourMessage.requiredMessage, patternMessage = codeFourMessage.patternMessage, trigger = 'change', key } = {}) {
    const rules = [createCodePatternRule({ pattern: CODE_FOUR_REG, patternMessage, trigger, key })]
    required && rules.unshift(createCodeRequiredRule({ required, requiredMessage, key }))
    return rules
  }

  // 用户名
  function createLoginNameRules({ required = true, requiredMessage = loginNameMessage.requiredMessage, patternMessage = loginNameMessage.patternMessage, trigger = 'change', key } = {}) {
    const rules = [createPatternRule({ pattern: LOGIN_NAME_REG, patternMessage, trigger, key })]
    required && rules.unshift(createRequiredRule({ required, requiredMessage, key }))
    return rules
  }

  // 密码
  function createPasswordRules({ required = true, requiredMessage = passwordMessage.requiredMessage, patternMessage = passwordMessage.patternMessage, trigger = 'change', key } = {}) {
    const rules = [createPatternRule({ pattern: PWD_REG, patternMessage, trigger, key })]
    required && rules.unshift(createRequiredRule({ required, requiredMessage, key }))
    return rules
  }

  // EMail
  function createEmailRules({ required = true, requiredMessage = emailMessage.requiredMessage, patternMessage = emailMessage.patternMessage, trigger = 'change', key } = {}) {
    const rules = [createPatternRule({ pattern: EMAIL_REG, patternMessage, trigger, key })]
    required && rules.unshift(createRequiredRule({ required, requiredMessage, key }))
    return rules
  }

  // 确认密码
  function createConfirmPasswordRules({
                                        required = true,
                                        requiredMessage = confirmPasswordMessage.requiredMessage,
                                        patternMessage = confirmPasswordMessage.patternMessage,
                                        trigger = 'input',
                                        key,
                                        password
                                      } = {}) {
    const rules = [{
      asyncValidator(rule, value) {
        if (value && value !== toValue(password)) return Promise.reject(rule.message)
        return Promise.resolve()
      },
      message: patternMessage,
      trigger,
      key
    }]
    required && rules.unshift(createRequiredRule({ required, requiredMessage, key }))
    return rules
  }

  // 昵称
  function createNickNameRules({ required = true, requiredMessage = nickNameMessage.requiredMessage, patternMessage = nickNameMessage.patternMessage, trigger = 'change', key } = {}) {
    const rules = [createPatternRule({ pattern: USER_NAME_REG, patternMessage, trigger, key })]
    required && rules.unshift(createRequiredRule({ required, requiredMessage, key }))
    return rules
  }

  /**
   * 必填
   * @param {boolean} required 是否必填
   * @param {string} requiredMessage 提示信息
   * @param {string} key 字段 Key
   * @return {{message, required, key}}
   */
  function createRequiredRule({ required, requiredMessage, key }) {
    return {
      message: requiredMessage,
      required,
      key
    }
  }

  /**
   * 格式
   * @param {RegExp} pattern 正则
   * @param {string} patternMessage 提示信息
   * @param {string} trigger 触发方式
   * @param {string} key 字段 Key
   * @return {{pattern, trigger, message, key}}
   */
  function createPatternRule({ pattern, patternMessage, trigger, key }) {
    return {
      message: patternMessage,
      pattern,
      trigger,
      key
    }
  }

  /**
   * 验证码 必填
   * @param {boolean} required 是否必填
   * @param {string} requiredMessage 提示信息
   * @param {string} key 字段 Key
   * @return {{validator, required, key}}
   */
  function createCodeRequiredRule({ required, requiredMessage, key }) {
    return {
      message: requiredMessage,
      required,
      key,
      validator(_, value) {
        if (value === null || value === void 0) return false
        return value.filter(Boolean).length !== 0
      }
    }
  }

  /**
   * 验证码 格式
   * @param {RegExp} pattern 正则
   * @param {string} patternMessage 提示信息
   * @param {string} trigger 触发方式
   * @param {string} key 字段 Key
   * @return {{validator, trigger, message, key}}
   */
  function createCodePatternRule({ pattern, patternMessage, trigger, key }) {
    return {
      message: patternMessage,
      trigger,
      key,
      validator(_, value) {
        if (value.filter(Boolean).length === 0) return true
        return pattern.test(value.join(''))
      }
    }
  }

  // 提示信息
  function createRuleMessage() {
    return {
      phoneMessage: { ...phoneMessage },
      codeFourMessage: { ...codeFourMessage },
      loginNameMessage: { ...loginNameMessage },
      nickNameMessage: { ...nickNameMessage },
      passwordMessage: { ...passwordMessage },
      confirmPasswordMessage: { ...confirmPasswordMessage },
      emailMessage: { ...emailMessage }
    }
  }

  return {
    createLoginNameRules,
    createNickNameRules,
    createPasswordRules,
    createPhoneRules,
    createCodeFourRules,
    createConfirmPasswordRules,
    createEmailRules,
    createRuleMessage
  }
}
