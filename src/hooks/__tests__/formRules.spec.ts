import { describe, expect, it } from 'vitest'

import { useFormRules } from '@/hooks/formRules'

const { createConfirmPasswordRules, createPasswordRules, createPhoneRules, createRuleMessage } = useFormRules()

describe('useFormRules', () => {
  it('必填规则排在格式规则之前', () => {
    const rules = createPhoneRules()
    expect(rules).toHaveLength(2)
    expect(rules[0]).toMatchObject({ required: true, message: '请输入手机号' })
    expect(rules[1]?.pattern).toBeInstanceOf(RegExp)
  })

  it('非必填时只保留格式规则', () => {
    expect(createPhoneRules({ required: false })).toHaveLength(1)
    expect(createPasswordRules({ required: false })).toHaveLength(1)
  })

  it('确认密码：一致通过、不一致拒绝', async () => {
    const rules = createConfirmPasswordRules({ password: '123456' })
    const rule = rules[1]
    const validator = rule?.asyncValidator as (rule: unknown, value: string) => Promise<void>

    await expect(validator(rule, '123456')).resolves.toBeUndefined()
    await expect(validator(rule, '654321')).rejects.toBe('再次密码不一致')
  })

  it('返回独立的提示信息副本', () => {
    const messages = createRuleMessage()
    expect(messages.phoneMessage.requiredMessage).toBe('请输入手机号')
    expect(messages.emailMessage.patternMessage).toBe('邮箱格式错误')
    messages.phoneMessage.requiredMessage = '已修改'
    expect(createRuleMessage().phoneMessage.requiredMessage).toBe('请输入手机号')
  })
})
