/*
 * 表单规则
 * */

import { toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import type { FormItemRule } from 'naive-ui'
import { PHONE_REG, EMAIL_REG, CODE_FOUR_REG, PWD_REG, LOGIN_NAME_REG, USER_NAME_REG } from '@/constants/reg'

export interface RuleMessagePair {
  requiredMessage: string
  patternMessage: string
}

const phoneMessage: RuleMessagePair = {
  requiredMessage: '请输入手机号',
  patternMessage: '手机号格式错误',
}

const codeFourMessage: RuleMessagePair = {
  requiredMessage: '请输入验证码',
  patternMessage: '验证码格式错误，4位数字',
}

const loginNameMessage: RuleMessagePair = {
  requiredMessage: '请输入用户名',
  patternMessage: '用户名格式错误，3-20位字符，包含小写字母、数字',
}

const nickNameMessage: RuleMessagePair = {
  requiredMessage: '请输入昵称',
  patternMessage: '昵称格式错误，4-16位字符，包含汉字、大小写字母、数字、中划线、下划线',
}

const passwordMessage: RuleMessagePair = {
  requiredMessage: '请输入密码',
  patternMessage: '密码格式错误，6-18位字符，包含大小写字母、数字、下划线',
}

const confirmPasswordMessage: RuleMessagePair = {
  requiredMessage: '请再次输入密码',
  patternMessage: '再次密码不一致',
}

const emailMessage: RuleMessagePair = {
  requiredMessage: '请输入邮箱地址',
  patternMessage: '邮箱格式错误',
}

export interface BaseRuleOptions {
  /** 是否必填 */
  required?: boolean
  /** 必填提示信息 */
  requiredMessage?: string
  /** 字段 Key（用于按字段校验） */
  key?: string
}

export interface PatternRuleOptions extends BaseRuleOptions {
  /** 格式提示信息 */
  patternMessage?: string
  /** 触发方式 */
  trigger?: string
}

export interface ConfirmPasswordRuleOptions extends PatternRuleOptions {
  /** 需要比对的原密码 */
  password?: MaybeRefOrGetter<string>
}

export interface RuleMessages {
  phoneMessage: RuleMessagePair
  codeFourMessage: RuleMessagePair
  loginNameMessage: RuleMessagePair
  nickNameMessage: RuleMessagePair
  passwordMessage: RuleMessagePair
  confirmPasswordMessage: RuleMessagePair
  emailMessage: RuleMessagePair
}

export function useFormRules() {
  // 手机
  function createPhoneRules({
    required = true,
    requiredMessage = phoneMessage.requiredMessage,
    patternMessage = phoneMessage.patternMessage,
    trigger = 'change',
    key,
  }: PatternRuleOptions = {}): FormItemRule[] {
    const rules: FormItemRule[] = [createPatternRule({ pattern: PHONE_REG, patternMessage, trigger, key })]
    if (required) rules.unshift(createRequiredRule({ required, requiredMessage, key }))
    return rules
  }

  // 4位验证码
  function createCodeFourRules({
    required = true,
    requiredMessage = codeFourMessage.requiredMessage,
    patternMessage = codeFourMessage.patternMessage,
    trigger = 'change',
    key,
  }: PatternRuleOptions = {}): FormItemRule[] {
    const rules: FormItemRule[] = [createCodePatternRule({ pattern: CODE_FOUR_REG, patternMessage, trigger, key })]
    if (required) rules.unshift(createCodeRequiredRule({ required, requiredMessage, key }))
    return rules
  }

  // 用户名
  function createLoginNameRules({
    required = true,
    requiredMessage = loginNameMessage.requiredMessage,
    patternMessage = loginNameMessage.patternMessage,
    trigger = 'change',
    key,
  }: PatternRuleOptions = {}): FormItemRule[] {
    const rules: FormItemRule[] = [createPatternRule({ pattern: LOGIN_NAME_REG, patternMessage, trigger, key })]
    if (required) rules.unshift(createRequiredRule({ required, requiredMessage, key }))
    return rules
  }

  // 密码
  function createPasswordRules({
    required = true,
    requiredMessage = passwordMessage.requiredMessage,
    patternMessage = passwordMessage.patternMessage,
    trigger = 'change',
    key,
  }: PatternRuleOptions = {}): FormItemRule[] {
    const rules: FormItemRule[] = [createPatternRule({ pattern: PWD_REG, patternMessage, trigger, key })]
    if (required) rules.unshift(createRequiredRule({ required, requiredMessage, key }))
    return rules
  }

  // EMail
  function createEmailRules({
    required = true,
    requiredMessage = emailMessage.requiredMessage,
    patternMessage = emailMessage.patternMessage,
    trigger = 'change',
    key,
  }: PatternRuleOptions = {}): FormItemRule[] {
    const rules: FormItemRule[] = [createPatternRule({ pattern: EMAIL_REG, patternMessage, trigger, key })]
    if (required) rules.unshift(createRequiredRule({ required, requiredMessage, key }))
    return rules
  }

  // 确认密码
  function createConfirmPasswordRules({
    required = true,
    requiredMessage = confirmPasswordMessage.requiredMessage,
    patternMessage = confirmPasswordMessage.patternMessage,
    trigger = 'input',
    key,
    password,
  }: ConfirmPasswordRuleOptions = {}): FormItemRule[] {
    const rules: FormItemRule[] = [
      {
        asyncValidator: async (rule, value: string) => {
          if (value && value !== toValue(password)) return Promise.reject(rule.message)
        },
        message: patternMessage,
        trigger,
        key,
      },
    ]
    if (required) rules.unshift(createRequiredRule({ required, requiredMessage, key }))
    return rules
  }

  // 昵称
  function createNickNameRules({
    required = true,
    requiredMessage = nickNameMessage.requiredMessage,
    patternMessage = nickNameMessage.patternMessage,
    trigger = 'change',
    key,
  }: PatternRuleOptions = {}): FormItemRule[] {
    const rules: FormItemRule[] = [createPatternRule({ pattern: USER_NAME_REG, patternMessage, trigger, key })]
    if (required) rules.unshift(createRequiredRule({ required, requiredMessage, key }))
    return rules
  }

  /**
   * 必填
   */
  function createRequiredRule({ required, requiredMessage, key }: { required: boolean; requiredMessage: string; key?: string }): FormItemRule {
    return {
      message: requiredMessage,
      required,
      key,
    }
  }

  /**
   * 格式
   */
  function createPatternRule({ pattern, patternMessage, trigger, key }: { pattern: RegExp; patternMessage: string; trigger: string; key?: string }): FormItemRule {
    return {
      message: patternMessage,
      pattern,
      trigger,
      key,
    }
  }

  /**
   * 验证码 必填
   */
  function createCodeRequiredRule({ required, requiredMessage, key }: { required: boolean; requiredMessage: string; key?: string }): FormItemRule {
    return {
      message: requiredMessage,
      required,
      key,
      validator: (_rule, value: string[] | null) => {
        if (value === null || value === void 0) return false
        return value.filter(Boolean).length !== 0
      },
    }
  }

  /**
   * 验证码 格式
   */
  function createCodePatternRule({ pattern, patternMessage, trigger, key }: { pattern: RegExp; patternMessage: string; trigger: string; key?: string }): FormItemRule {
    return {
      message: patternMessage,
      trigger,
      key,
      validator: (_rule, value: string[]) => {
        if (value.filter(Boolean).length === 0) return true
        return pattern.test(value.join(''))
      },
    }
  }

  // 提示信息
  function createRuleMessage(): RuleMessages {
    return {
      phoneMessage: { ...phoneMessage },
      codeFourMessage: { ...codeFourMessage },
      loginNameMessage: { ...loginNameMessage },
      nickNameMessage: { ...nickNameMessage },
      passwordMessage: { ...passwordMessage },
      confirmPasswordMessage: { ...confirmPasswordMessage },
      emailMessage: { ...emailMessage },
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
    createRuleMessage,
  }
}
