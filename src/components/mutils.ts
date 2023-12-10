import type { Ref } from 'vue'
import { createVNode, isRef, ref, toRaw } from 'vue'
import { ruleValid } from '@/utils/validate'
import {
  ElAutocomplete,
  ElCascader,
  ElCheckbox,
  ElCheckboxButton,
  ElCheckboxGroup,
  ElColorPicker,
  ElDatePicker,
  ElInput,
  ElInputNumber,
  ElOption,
  ElRadio,
  ElRadioButton,
  ElRadioGroup,
  ElRate,
  ElSelect,
  ElSelectV2,
  ElSlider,
  ElSwitch,
  ElTimePicker,
  ElTimeSelect,
  ElUpload
} from 'element-plus'
import SingleDatePicker from '@/components/form/SingleDatePicker.vue'
import IconSelect from '@/components/form/IconSelect.vue'
import MUpload from '@/components/form/Upload.vue'
import i18n, { getCurrentLocales } from '@/i18n'
import type { CommonItemData, CommonModelParam, ItemListColumn } from '@i/components'
import type { CommonFormColumn } from '@i/components/form'
import type { CommonTableColumn } from '@i/components/table'
import type { ValidRule } from '@i/utils/validate'

const { t } = i18n.global

/**
 * 构造表单动态组件参数
 * sxh
 * 2023-3-14
 */
export function generateDynamicColumn(column: FormColumn) {
  if (!column.prop) return
  const param = {
    clearable: true,
    ...column
  }
  if (!['switch', 'radio', 'checkbox'].includes(param.type ?? '')) {
    param.style = 'width: 100%;' + (param.style ?? '')
  }
  const slots = {
    ...column.slots
  }

  // 没有默认插槽，给select，radio-group，checkbox-group初始化子选项
  if (!slots.default) {
    // 选项的通用参数
    const itemParam = {
      ...param.itemParam
    }
    if (param.type === 'select') {
      // 下拉框option数据， ref
      const itemArr = getItemListRef(param)
      // 构造select-option
      slots.default = () => {
        return itemArr.value.map((i) => createVNode(ElOption, { ...itemParam, ...i }))
      }
    }
    if (param.type === 'radio-group') {
      // 默认加上子项的边框
      itemParam.border ??= true
      // 选项ref数据
      const itemArr = getItemListRef(param)
      // 构造单选框选项
      slots.default = () => {
        return itemArr.value.map((i) => {
          const optionParam = { ...itemParam, label: i.value }
          return createVNode(ElRadio, optionParam, () => i.label)
        })
      }
    }
    if (param.type === 'checkbox-group') {
      // 默认加上子项的边框
      itemParam.border ??= true
      // 选项ref数据
      const itemArr = getItemListRef(param)
      // 构造多选框子选项
      slots.default = () => {
        return itemArr.value.map((i) => {
          const optionParam = { ...itemParam, label: i.value }
          return createVNode(ElCheckbox, optionParam, () => i.label)
        })
      }
    }
  }

  let type: string = column.type ?? 'input'
  if (['text', 'textarea', 'password', 'number'].includes(type)) {
    type = 'el-input'
  } else if (
    ['year', 'month', 'date', 'dates', 'datetime', 'week', 'datetimerange', 'daterange', 'monthrange'].includes(type)
  ) {
    // 设置默认的格式化
    if (!param.valueFormat) {
      if (['year'].includes(type)) param.valueFormat = 'YYYY'
      // if (['dates'].includes(type)) param.valueFormat = 'YYYY'
      // if (['week'].includes(type)) param.valueFormat = 'YYYY'
      if (['date', 'daterange'].includes(type)) param.valueFormat = 'YYYY-MM-DD'
      if (['datetime', 'datetimerange'].includes(type)) param.valueFormat = 'YYYY-MM-DD HH:mm:ss'
      if (['month', 'monthrange'].includes(type)) param.valueFormat = 'YYYY-MM'
    }
    type = 'el-date-picker'
  } else if (type === 'icon') {
    type = 'm-icon-select'
  } else if (['upload-img', 'upload-file'].includes(type)) {
    type = 'm-upload'
  } else {
    type = 'el-' + type
  }

  // 日期区间需要单独处理
  if (['daterange', 'datetimerange', 'monthrange'].includes(param.type ?? '')) {
    if (!param.prop2) throw Error('prop2属性缺失')
    // 日期区间拆分独立选择
    if (param.single) {
      type = 'm-single-date-picker'
    }
  }
  const component = getFormComponentByName(type)
  return {
    component,
    param,
    slots
  }
}

// 生成双向绑定属性值
export function vModelValue<T extends object = any>(param: FormColumn & { prop: any; prop2: any }, form: T) {
  const returnParam: CommonModelParam = {}
  // 需要双向绑定
  if (form && param.prop) {
    // 日期区间需要单独处理
    if (['daterange', 'datetimerange', 'monthrange'].includes(param.type ?? '')) {
      if (!param.prop2) throw Error('prop2属性缺失')
      // 日期区间拆分独立选择
      if (param.single) {
        returnParam.start = form[param.prop]
        returnParam.end = form[param.prop2]
        returnParam['onUpdate:start'] = (val) => {
          form[param.prop] = val
        }
        returnParam['onUpdate:end'] = (val) => {
          form[param.prop2] = val
        }
      } else {
        if (form[param.prop] && form[param.prop2]) {
          returnParam.modelValue = [form[param.prop], form[param.prop2]]
        } else {
          returnParam.modelValue = null
        }
        returnParam['onUpdate:modelValue'] = (val) => {
          if (val) {
            const [value, value2] = val
            form[param.prop] = value
            form[param.prop2] = value2
          } else {
            form[param.prop] = null
            form[param.prop2] = null
          }
        }
      }
    } else {
      returnParam.modelValue = form[param.prop]
      returnParam['onUpdate:modelValue'] = (val) => {
        form[param.prop] = val
      }
    }
    return returnParam
  }
}

/**
 * 生成默认的placeholder
 */
export function generatePlaceholder<T extends object>(column: CommonFormColumn<T>) {
  if (!column?.prop) return
  const type = column.type ?? 'input'
  if (!Object.prototype.hasOwnProperty.call(column, 'placeholder')) {
    const label = column.label ?? ''
    if (['select', 'cascader', 'year', 'month', 'date', 'dates', 'datetime', 'week', 'icon'].includes(type)) {
      column.placeholder = t('m.form.toSelect', { label })
    } else if (['datetimerange', 'daterange', 'monthrange'].includes(type)) {
      column.startPlaceholder = column.startPlaceholder ?? label + '起'
      column.endPlaceholder = column.endPlaceholder ?? label + '止'
    } else if (['input', 'textarea'].includes(type)) {
      column.placeholder = t('m.form.toInput', { label })
    }
  }
  return column
}

/**
 * 生成itemListRef数据
 */
export function getItemListRef(column: ItemListColumn): Ref<CommonItemData[]> {
  // 生成方法
  const generateItemList = (data: CommonItemData[]) => {
    return data.map((i) => {
      let label = i.label
      let value = i.value
      if (column.labelKey) {
        label = column.labelKey instanceof Function ? column.labelKey(i) : i[column.labelKey]
      }
      if (column.valueKey) {
        value = column.valueKey instanceof Function ? column.valueKey(i) : i[column.valueKey]
      }
      return {
        label,
        value
      }
    })
  }
  // 下拉框option数据
  const itemArr: Ref<CommonItemData[]> = ref([])
  let itemList = toRaw(column.itemList ?? [])
  if (itemList instanceof Function) {
    itemList = itemList()
  }
  if (itemList instanceof Promise) {
    itemList.then((res) => (itemArr.value = generateItemList(res)))
  } else {
    itemArr.value = generateItemList(itemList as CommonItemData[])
  }
  return itemArr
}

/**
 * 增强el-form表单验证
 */
export function generateFormRules<T extends object>(
  column: CommonFormColumn<T>,
  formData: T
): ValidRule<T, keyof T>[] | undefined {
  const rules = getRules(column)
  if (!rules) return
  return rules.map((i) => {
    return {
      required: i.required,
      validator: async (rule, value, callback) => {
        const errMsg = await ruleValid(
          {
            label: column.label,
            prop: column.prop! as keyof T,
            rules
          },
          i,
          value,
          formData
        )
        if (errMsg) callback(Error(errMsg?.toString()))
        else callback()
      },
      trigger: i.trigger
    }
  })
}

/**
 * 设置一下rules
 */
export function getRules<T extends object>(column: CommonFormColumn<T>) {
  if (!column.rules) return
  let rules = column.rules
  if (!(rules instanceof Array)) {
    rules = [rules]
  }
  return rules as ValidRule<T, keyof T>[]
}

// 生成默认的formatter函数
export function generateFormatter<T extends object>(tableColumParams: TableColumn<T>) {
  // itemList需要转化一下显示
  if (tableColumParams.itemList) {
    tableColumParams.formatter ??= (row, column, cellValue) => {
      const itemList = (
        isRef(tableColumParams.itemList) ? tableColumParams.itemList.value : tableColumParams.itemList
      ) as CommonItemData[]
      return itemList.find((i) => i.value === cellValue)?.label ?? cellValue
    }
  }
}

/**
 * 自动计算一下labelWidth，以最长label字符宽度作为form的labelWidth
 * 这样就算切换语言也不会导致换行而影响美观
 */
export function generateLabelWidth<T extends object>(
  ...columns: (CommonFormColumn<T> | CommonTableColumn<T>)[]
): string | number {
  const charWidth = getCurrentLocales().charWidth
  return (
    Math.max(
      ...columns.map((column) => {
        let width = column.label?.length ?? 0
        width *= charWidth
        //有备注疑问的加上额外宽度
        if (column.comment) width += 18
        //有必填*的加上额外宽度
        if (column.required) width += 12
        return width
      })
    ) + 28
  )
}

// 通过名称获取组件对象
function getFormComponentByName(compName: string) {
  let component: any = ElInput
  if (compName === 'el-autocomplete') component = ElAutocomplete
  if (compName === 'el-cascader') component = ElCascader
  if (compName === 'el-checkbox') component = ElCheckbox
  if (compName === 'el-checkbox-button') component = ElCheckboxButton
  if (compName === 'el-color-picker') component = ElColorPicker
  if (compName === 'el-date-picker') component = ElDatePicker
  if (compName === 'el-input-number') component = ElInputNumber
  if (compName === 'el-radio') component = ElRadio
  if (compName === 'el-radio-button') component = ElRadioButton
  if (compName === 'el-rate') component = ElRate
  if (compName === 'el-select') component = ElSelect
  if (compName === 'el-select-v2') component = ElSelectV2
  if (compName === 'el-slider') component = ElSlider
  if (compName === 'el-switch') component = ElSwitch
  if (compName === 'el-time-picker') component = ElTimePicker
  if (compName === 'el-time-select') component = ElTimeSelect
  if (compName === 'el-upload') component = ElUpload
  if (compName === 'el-radio-group') component = ElRadioGroup
  if (compName === 'el-checkbox-group') component = ElCheckboxGroup
  if (compName === 'm-single-date-picker') component = SingleDatePicker
  if (compName === 'm-icon-select') component = IconSelect
  if (compName === 'm-upload') component = MUpload
  return component
}
