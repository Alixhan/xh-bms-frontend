/**
 * sxh 2020-10-13
 * 验证通用方法
 */
import { isEmpty } from 'lodash-es'
import { getItemListRef } from '@/components/mutils'
import type { Ref } from 'vue'
import type { FieldRule, FieldValidResult, RuleObject, ValidResult, ValidRule } from '@i/utils/validate'
import type { CommonItemData } from '@i/components'
import i18n from '@/i18n'

const { t } = i18n.global

// 验证类型定义
const datatype: { [any: string]: RegExp | ((val: any) => boolean) } = {
  phone: /^1\d{10}$/,
  email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  username: /^[\u4E00-\u9FA5A-Za-z]+$/,
  double: /^\d+(\.\d{1,2})?$/,
  vin: /^[A-Z0-9]{17}$/,
  number: /^(-?\d+)(\.\d+)?$/,
  idCard: /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  carNum:
    /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/
}

// 整个表单验证
export default async function <T extends object>(formData: T, ruleObject: RuleObject<T>): Promise<ValidResult<T>> {
  const formPromiseArr: Promise<FieldValidResult<T, keyof T>>[] = []
  for (const prop in ruleObject) {
    formPromiseArr.push(fieldValid(ruleObject[prop], formData[prop], formData))
  }
  return Promise.all(formPromiseArr).then((res) => {
    const errFields = res.filter((i) => !i.result)
    return {
      error: !!errFields.length,
      success: !errFields.length,
      errFields
    }
  })
}

// 单个字段多个rules验证
export async function fieldValid<T extends object>(
  fieldRule: FieldRule<T, keyof T>,
  formValue: T[keyof T],
  formData: T
): Promise<FieldValidResult<T, keyof T>> {
  const rules = fieldRule.rules instanceof Array ? fieldRule.rules : [fieldRule.rules ?? {}]
  const rulePromiseArr = rules.map((rule) => ruleValid(fieldRule, rule, formValue, formData))
  return Promise.all(rulePromiseArr).then((e) => {
    // 过滤正确，分号拼接错误信息
    const errMsg = e.filter((i) => i).join(';')
    return {
      prop: fieldRule.prop,
      formValue,
      result: !errMsg,
      errMsg
    }
  })
}

// 单个rule验证
export async function ruleValid<T extends object>(
  fieldRule: FieldRule<T, keyof T>,
  rule: ValidRule<T, keyof T> = {},
  val: T[keyof T],
  formData: T
): Promise<string> {
  const formValue: any = val ?? ''
  return new Promise<string>((resolve, reject) => {
    if (rule.required) {
      // 验证必填
      if ((formValue instanceof Array && formValue?.length === 0) || isEmpty(formValue + '')) {
        return reject(rule.message ?? t('m.form.beEmpty', { label: fieldRule.label ?? '' }))
      }
    }
    if (!formValue && !rule.validator) return resolve('')
    if (rule.type) {
      // 验证数据类型是否满足
      const typeFilter = datatype[rule.type]
      if (!typeFilter) {
        return reject(rule.type + 'not defined!')
      }
      if (typeFilter instanceof RegExp) {
        if (!typeFilter.test(formValue))
          return reject(rule.message ?? t('m.form.wrongFormat', { label: fieldRule.label ?? '' }))
      } else {
        const re = typeFilter(formValue)
        if (!re) return reject(rule.message ?? t('m.form.wrongFormat', { label: fieldRule.label ?? '' }))
      }
    }
    if (rule.pattern && !rule.pattern.test(formValue)) {
      // 验证数据格式
      return reject(rule.message ?? t('m.form.wrongFormat', { label: fieldRule.label ?? '' }))
    }
    // 验证字符最大长度
    if (rule.maxlength && formValue.length > rule.maxlength) {
      return reject(rule.message ?? t('m.form.maxlength', { label: fieldRule.label ?? '', maxlength: rule.maxlength }))
    }
    // 验证字符最小长度
    if (rule.minlength && formValue.length < rule.minlength) {
      return reject(rule.message ?? t('m.form.minlength', { label: fieldRule.label ?? '', maxlength: rule.minlength }))
    }
    // 下拉选项验证
    if (rule.itemList) {
      const itemList: Ref<CommonItemData[]> = getItemListRef({
        itemList: rule.itemList,
        labelKey: rule.labelKey,
        valueKey: rule.valueKey
      })
      const item = itemList.value.find((i) => i.label === formValue)
      if (item) {
        formData?.[fieldRule.prop] && (formData[fieldRule.prop] = item.value as T[keyof T])
      } else {
        return reject(
          rule.message ??
            t('m.form.valRestriction', {
              label: fieldRule.label ?? '',
              enums: itemList.value.map((i) => i.label)
            })
        )
      }
    }
    // 自定义验证方法
    if (rule.validator)
      rule.validator(rule, formValue, (e) => (e instanceof Error ? reject(e.message) : resolve('')), formData)
    else resolve('')
  }).catch((e) => e) // 捕获错误信息，resolve Promise
}
