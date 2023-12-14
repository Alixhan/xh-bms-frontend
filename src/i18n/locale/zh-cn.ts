export default {
  m: {
    comment: '备注',
    table: {
      index: '序',
      unit: '条',
      total: '总数',
      selected: '已选中',
      export: '导出',
      colSort: '列排序',
      operation: '操作',
      allCol: '全部列',
      fileName: '表格数据',
      exportConfirm: '确认导出？',
      exportCurrent: '导出当页',
      exportAll: '导出全部',
      exportFail: '导出失败',
      exportNoData: '无数据可以导出！'
    },
    topFilter: {
      query: '查询',
      search: '搜索',
      reset: '重置',
      expand: '展开',
      collapse: '收起'
    },
    form: {
      toInput: '请输入{label}',
      toSelect: '请选择{label}',
      refresh: '刷新',
      enlarge: '放大',
      reduce: '缩小',
      clockwise: '顺时针',
      anticlockwise: '逆时针',
      cutConfirmation: '确定裁剪',
      iconSearch: '输入内容搜索图标',
      shortcuts1: '最近一周',
      shortcuts2: '最近一个月',
      shortcuts3: '最近三个月',
      shortcuts4: '最近六个月',
      shortcuts5: '当月',
      shortcuts6: '当年',
      shortcuts7: '上个月',
      shortcuts8: '去年',
      lib: '文件库',
      selectFile: '选择文件',
      selectFromLib: '从文件库选择',
      imageCropper: '图片裁剪',
      beEmpty: '{label}不能为空',
      wrongFormat: '{label}格式不对',
      maxlength: '{label}最大字符不超过{maxlength}',
      minlength: '{label}不得少于{minlength}个字符',
      valRestriction: '{label}的值只能为{enums}',
      formatTip: '{label}格式为{format}'
    },
    excelImport: {
      downloadTemplate: '下载模板',
      confirmImport: '确认导入',
      templateFileName: '导入模板.xlsx',
      step1Do: '导入excel',
      step1Error: '导入excel文件失败',
      step2Do: '解析excel',
      step2Error: '解析excel失败',
      step2Success: '解析excel成功',
      step3Do: '验证数据中',
      step3Error: '验证数据有误',
      step3Success: '验证数据成功',
      step4Do: '数据导入中',
      step4Error: '导入失败（服务器校验未通过）',
      step4Success: '数据导入成功',
      step5Do: '清空中',
      step5Success: '清空成功',
      num: '数据行号',
      excelNum: 'excel行号',
      templateMismatch: '模板不匹配',
      noData: '没有数据可以导入！'
    }
  },
  common: {
    tip: '提示',
    expand: '展开',
    collapse: '收起',
    add: '新增',
    edit: '编辑',
    detail: '明细',
    del: '删除',
    all: '所有',
    copy: '复制',
    paste: '粘贴',
    cache: '缓存',
    enabled: '启用',
    order: '排序号',
    isEnabled: '是否启用',
    isCache: '是否缓存',
    createTime: '创建时间',
    updateTime: '修改时间',
    more: '更多',
    save: '保存',
    cancel: '取消',
    confirmDelete: '确认删除吗？删除后不可恢复！',
    saveSuccess: '保存成功！',
    restoreDefault: '恢复默认',
    select: '选择',
    clear: '清空',
    imports: '导入',
    switch: '切换',
    importSuccess: '导入成功',
    importsFailed: '导入失败',
    errorMsg: '错误信息',
    confirm: '确认',
    confirmMsg: '确认是否继续此操作?',
    loadingText: '操作中',
    successMsg: '操作成功',
    optFailed: '操作失败',
    noMenus: 'The current role is not assigned menu, please login again!'
  },
  layout: {
    switchLocaleError: '切换语言失败',
    activeRole: '当前角色',
    personalCenter: '个人中心',
    switchRole: '切换角色',
    logout: '注销',
    logoutSuccess: '注销成功'
  },
  setting: {
    layout: '布局配置',
    theme: '主题',
    showLogo: '显示logo',
    menuUnique: '手风琴菜单',
    showNavTabIcon: '页签图标',
    menuWidth: '菜单宽度',
    tabStyle: {
      label: '页签风格',
      square: '方正',
      mellow: '圆润',
    },
    size: {
      label: '组件大小',
      small: '小',
      default: '中',
      large: '大',
    },
  },
  login: {
    account: '请输入账号',
    password: '请输入密码',
    captcha: '请输入图形验证码',
    login: '登录'
  },
  home: {
    pie: '环形图',
    line: '折线图',
    bar: '柱状图',
    pressure: '仪表盘',
    grossSales: '总销量',
    customers: '总客户',
    grossProfit: '总利润',
    orders: '订单数'
  },
  system: {
    dict: {
      label: '数据字典',
      add: '@:system.dict.label@:common.add',
      edit: '@:system.dict.label@:common.edit',
      detail: '@:system.dict.label@:common.detail',
      all: '全部字典',
      parent: '上级字典id',
      parentName: '上级字典',
      dictTypeId: '字典类型ID',
      dictTypeName: '数据字典类型',
      value: '字典值key',
      labelName: '字典名称',
      orderComment: '数据字典的排列顺序，小号排在前，大号排在后。',
      selectDictType: '选择@:system.dict.dictTypeName',
      selectParent: '选择上级字典'
    },
    file: {
      label: '文件',
      edit: '@:system.file.label@:common.edit',
      detail: '@:system.file.label@:common.detail',
      object: '对象存储key',
      name: '文件名称',
      contentType: '文件类型',
      suffix: '文件扩展名',
      size: '文件大小',
      preview: '图片预览',
      imgWidth: '图片宽度',
      imgHeight: '图片高度',
      status: '文件状态',
      imgRatio: '图片宽高比',
      sha1: 'sha1',
      sha1Comment: '同一个文件的sha1相同，相同sha1不会重复上传文件',
      download: '下载',
      createTime: '上传时间'
    },
    menu: {
      label: '菜单',
      add: '@:system.menu.label@:common.add',
      edit: '@:system.menu.label@:common.edit',
      detail: '@:system.menu.label@:common.detail',
      copy: '@:system.menu.label@:common.copy',
      title: '菜单标题',
      platform: '平台',
      type: '菜单类型',
      icon: '菜单图标',
      parent: '上级菜单',
      parentPlaceholder: '请选择上级菜单',
      handleType: '处理类型',
      orderComment: '菜单的排列顺序，小号排在前，大号排在后。',
      path: '路由路径',
      component: '组件全路径',
      outerUrl: '外链地址'
    },
    org: {
      label: '机构',
      add: '@:system.org.label@:common.add',
      edit: '@:system.org.label@:common.edit',
      detail: '@:system.org.label@:common.detail',
      code: '机构代码',
      name: '机构名称',
      parentId: '上级机构Id',
      parentName: '上级机构名称',
      all: '全部机构',
      select: '选择机构',
      selectParent: '选择上级机构'
    },
    role: {
      label: '角色',
      add: '@:system.role.label@:common.add',
      edit: '@:system.role.label@:common.edit',
      detail: '@:system.role.label@:common.detail',
      name: '角色名称',
      permission: '权限',
      parentId: '上级角色id',
      parentName: '上级角色名称',
      selectParent: '选择上级角色',
      select: '选择角色'
    },
    user: {
      label: '用户',
      add: '@:system.user.label@:common.add',
      edit: '@:system.user.label@:common.edit',
      detail: '@:system.user.label@:common.detail',
      job: '用户岗位',
      role: '用户角色',
      inGroup: '所在用户组',
      code: '用户账号',
      name: '用户名称',
      avatar: '头像',
      telephone: '手机号码',
      telephoneNote: '11位手机号码',
      password: '初始密码',
      newPassword: '新密码',
      newPasswordH: '如需修改密码请填入新密码',
      repeatPassword: '重复新密码',
      passwordMismatches: '两次密码输入不一致！',
      status: '用户状态',
      lockMsg: '锁定原因',
      jobMaintain: '岗位维护',
      userCodeRule: '登录账号只能是大小写字母和数字！',
      select: '用户选择',
      jobSuccess: '岗位保存成功',
      imports: '@:system.user.label@:common.imports',
      group: {
        label: '用户组',
        add: '@:system.user.group.label@:common.add',
        edit: '@:system.user.group.label@:common.edit',
        detail: '@:system.user.group.label@:common.detail',
        name: '用户组名称',
        job: '用户组岗位',
        user: '用户组成员'
      }
    }
  },
  monitor: {
    online: {
      userCode: '登录账户',
      userName: '登录账户名称',
      loginTime: '登录时间',
      loginAddress: '登录地点',
      loginBrowser: '浏览器',
      browserVersion: '浏览器版本',
      loginOs: '操作系统',
      isMobile: '是否手机端',
      orgName: '登录机构',
      roleName: '登录角色',
      localeLabel: '当前使用语言',
      forceLogout: '强制下线',
      confirmLogout: '确认踢除此用户下线吗？踢除下线后，该用户需要重新登录！'
    }
  }
}
