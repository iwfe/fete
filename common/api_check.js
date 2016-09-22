/*
 * @Author: wjs
 * @Date:   2016-06-28 23:08:57
* @Last modified by:   lancui
* @Last modified time: 2016-08-25 16:08:11
 */

var Mock = require('mockjs')

// 企业号组自用，express server 的 index 里面有 pageConfig.pjid
feteApiProjectId = pageConfig && pageConfig.pjid ? pageConfig.pjid : feteApiProjectId
var feteApiCommonProjectId = pageConfig && pageConfig.commonPjid ? pageConfig.commonPjid : ''

function ApiCheckMockTree2MockTemplate(data, result) {
  if (!result) {
    result = {}
  }

  if (Array.isArray(data)) {
    // data is array
    for (let i = data.length - 1; i >= 0; i--) {
      ApiCheckMockTree2MockTemplate(data[i], result)
    }
    return result
  } else if (typeof data === 'object' && data.key && data.dataType && data.mock) {
    let mockArr = data.mock.split(':')

    // if has children
    if (data.children) {
      let tmpChildren = null
      if (data.dataType.toLowerCase() === 'object') {
        // object
        tmpChildren = {}
        for (var i = data.children.length - 1; i >= 0; i--) {
          ApiCheckMockTree2MockTemplate(data.children[i], tmpChildren)
        }
      } else {
        // array
        tmpChildren = [{}]
        for (var i = data.children.length - 1; i >= 0; i--) {
          ApiCheckMockTree2MockTemplate(data.children[i], tmpChildren[0])
        }
      }
      result[`${data.key}${mockArr[0]}`] = tmpChildren
    } else {
      // has no children
      let value = mockArr[1]
      if (data.dataType.toLowerCase() === 'boolean') {
        value = (mockArr[1] === 'true')
      } else if (data.dataType.toLowerCase() === 'number') {
        // if is array
        if (value[0] === '[') {
          value = eval(mockArr[1])
        } else {
          value = parseFloat(mockArr[1])
        }
      } else if (!mockArr[0] && value[0] === '/') {
        // regexp
        let regArr = mockArr[1].split('/')
        value = new RegExp(regArr[1], regArr[2])
      } else {
        // string
        // if is array
        if (value[0] === '[') {
          value = eval(mockArr[1])
        }
      }
      result[`${data.key}${mockArr[0]}`] = value
    }

    return result
  } else {
    console.log('mock tree data format error !')
  }
}

var ApiCheckLog = {
  title: function(str) {
    console.log('%c' + str, 'background: #222; color: #bada55')
  },
  title2: function(str) {
    console.log('%c' + str, 'background: green; color: white')
  },
  success: function(str, value) {
    console.log('%c' + str, 'color: #4fc174',  value)
  },
  error: function(str, value) {
    console.log('%c' + str, 'color: red', value)
  },
  warn: function(str, value) {
    console.log('%c' + str, 'color: #ea8311', value)
  },
  info: function(str, value) {
    console.log('%c' + str, 'color: #2db7f5', value)
  }
}

function GetApiMockByPjId() {
  if ($) {
    $.ajax({
      async: false,
      url: feteApiHost + '/api/api_mock_data?projectId=' + feteApiProjectId,
      success: function(res) {
        feteApiForMock = res.data
      }
    })
  } else if (Vue && VueResource) {
    var vm = new Vue()
    vm.$http.get(feteApiHost + '/api/api_mock_data?projectId=' + feteApiProjectId).then(function(res) {
      res = res.data
      feteApiForMock = res.data
    })
  }
}
GetApiMockByPjId()  // get mock data by ajax

// check input
function ApiCheckInput(mockKey, input) {
  if (!feteApiForMock[mockKey]) {
    ApiCheckLog.error('fete上还没有该api，请去先添加: 接口 ', mockKey)
    return
  }
  if (!feteApiForMock[mockKey].inputModel) {
    ApiCheckLog.error('fete上的接口输入参数格式未生成, 请去fete找到对应api保存一下: 接口 ', mockKey)
    return
  }
  feteApiForMock[mockKey].inputModel.forEach(function(item) {
    if (item.require && input[item.key] === undefined) {
      ApiCheckLog.error('前端请求参数有误: 接口 ', mockKey + ' 的 ' + item.key + ' 是必填参数，但是前端没有传')
    } else if (typeof input[item.key] !== item.dataType.toLowerCase()) {
      ApiCheckLog.error('前端请求参数有误: 接口 ', mockKey + ' 的 ' + item.key + ' 期望类型是 ' + item.dataType.toLowerCase() + ' , 实际传了 ' + (typeof input[item.key]))
    }
  })
}

// check output
function ApiCheckOutput(key, output) {
  if (!feteApiForMock[key]) {
    return 'fete上还没有该api，请去先添加: 接口 ' + key

  }
  var mockTemplate = ApiCheckMockTree2MockTemplate(feteApiForMock[key].output)
  return Mock.valid(mockTemplate, output)
}


// jquery ajax global interceptor
function ApiCheckForJqueryAjax() {
  // to get ajaxSend and ajaxSend work
  if ($.ajaxSetup) {
    // jquery
    $.ajaxSetup({
        global: true
      })
      // check input
    $(document).ajaxSend(function(event, jqxhr, settings) {
    //     ApiCheckLog.title('-------- [FROM api_check.js] jquery ajax before send --------')
    //     ApiCheckLog.info('AJAX URL: ', settings.type.toUpperCase() + settings.url)
    //     ApiCheckLog.warn('Request params: ', settings.data) // post 才有 ，get 直接挂 url 上了
        // ApiCheckInput(settings.data)
        let mockKey = settings.type.toUpperCase() + settings.url.split('?')[0].replace(feteApiHost + '/api/fete_api/' + feteApiProjectId + '/mock', '')
        if (feteApiUseMockData) {
          settings.url = feteApiHost + '/api/fete_api/' + feteApiProjectId + '/mock' + settings.url;
          // ApiCheckLog.info('Redirect to: ', settings.url)
        } else {
          // ApiCheckLog.info('Not redirect, use old request url: ', mockKey)
        }
      })
      // check output
    $(document).ajaxSuccess(function(event, jqxhr, settings) {
      // ApiCheckLog.title2('-------- [FROM api_check.js] jquery ajax after success --------')
      let mockKey = settings.type.toUpperCase() + settings.url.split('?')[0].replace(feteApiHost + '/api/fete_api/' + feteApiProjectId + '/mock', '')
      // ApiCheckLog.info('AJAX URL: ', mockKey)
      // ApiCheckLog.success('Response data: ', jqxhr.responseJSON) // 还有一个 responseText
      var checkResult = ApiCheckOutput(mockKey, jqxhr.responseJSON)
      // ApiCheckLog.info('Mockjs check output result: ', checkResult)
      if (Array.isArray(checkResult) && checkResult.length > 0) {
        // alert('后端返回结果与fete定义的接口不符\n' + JSON.stringify(checkResult))
        ApiCheckLog.error('后端返回结果与fete定义的接口不符，接口：' + mockKey, checkResult)
      }
      // 重置选项值
      jqxhr.responseJSON = setSelectData(mockKey, jqxhr.responseJSON)
    })
  } else if ($.ajaxSettings) {
    // zepto
    $.ajaxSettings.global = true

    $(document).on('ajaxBeforeSend', function(e, xhr, settings) {
      // ApiCheckLog.title('-------- [FROM api_check.js] zepto ajax before send --------')
      // ApiCheckLog.info('AJAX URL: ', settings.type.toUpperCase() + settings.url)
      // ApiCheckLog.warn('Request params: ', settings.data) // post 才有 ，get 直接挂 url 上了
      // ApiCheckInput(settings.data)
      let mockKey = settings.type.toUpperCase() + settings.url.split('?')[0].replace(feteApiHost + '/api/fete_api/' + feteApiProjectId + '/mock', '')
      if (feteApiUseMockData && feteApiForMock[mockKey]) {
        settings.url = feteApiHost + '/api/fete_api/' + feteApiProjectId + '/mock' + settings.url;
        // ApiCheckLog.info('Redirect to: ', settings.url)
      } else {
        // ApiCheckLog.info('Not redirect, use old request url: ', mockKey)
      }
    })
    $(document).on('ajaxSuccess', function(e, xhr, settings) {
      // ApiCheckLog.title2('-------- [FROM api_check.js] zepto ajax after success --------')
      let mockKey = settings.type.toUpperCase() + settings.url.split('?')[0].replace(feteApiHost + '/api/fete_api/' + feteApiProjectId + '/mock', '')
      // ApiCheckLog.info('AJAX URL: ', mockKey)
      // ApiCheckLog.success('Response data: ', xhr.responseJSON) // 还有一个 responseText
      var checkResult = ApiCheckOutput(mockKey, xhr.responseJSON)
      // ApiCheckLog.info('Mockjs check output result: ', checkResult)
      if (Array.isArray(checkResult) && checkResult.length > 0) {
        // alert('后端返回结果与fete定义的接口不符\n' + JSON.stringify(checkResult))
        ApiCheckLog.error('后端返回结果与fete定义的接口不符，接口：' + mockKey, checkResult)
      }
      // 重置选项值
      xhr.responseJSON = setSelectData(mockKey, xhr.responseJSON)
    })
  }
}

// vue-resource global interceptor
function ApiCheckVueResource() {
  if (!Vue.http) {
    Vue.use(VueResource)
  }

  Vue.http.interceptors.push({

    // check input
    request: req => {
      // ApiCheckLog.title('-------- [FROM api_check.js] vue-resource before send --------')
      // ApiCheckLog.info('AJAX URL: ', mockKey)
      // ApiCheckLog.warn('Request params: ', req.method.toUpperCase() === 'GET' ? req.params : req.data) // req.params: get params ; req.data: post params
      const mockKey = req.method.toUpperCase() + req.url.replace(feteApiHost + '/api/fete_api/' + feteApiProjectId + '/mock', '')
      ApiCheckInput(mockKey, req.data)
      if (feteApiUseMockData) {
        if (req.url.startsWith('http')) {

        } else if (req.url.startsWith('/weixinEnt/common/')) {
          req.url = feteApiHost + '/api/fete_api/' + feteApiCommonProjectId + '/mock' + req.url;
        } else {
          req.url = feteApiHost + '/api/fete_api/' + feteApiProjectId + '/mock' + req.url;
        }
        // ApiCheckLog.info('Redirect to: ', req.url)
      }
      return req
    },

    // check output
    response: res => {
      // ApiCheckLog.title2('-------- [FROM api_check.js] vue-resource after success --------')
      let mockKey = res.request.method.toUpperCase() + res.request.url.replace(feteApiHost + '/api/fete_api/' + feteApiProjectId + '/mock', '')
      // ApiCheckLog.info('AJAX URL: ', mockKey)
      // ApiCheckLog.success('Response data: ', res.data)
      var checkResult = ApiCheckOutput(mockKey, res.data)
      // ApiCheckLog.info('Mockjs check output result: ', checkResult)
      if (Array.isArray(checkResult) && checkResult.length > 0) {
        // alert('后端返回结果与fete定义的接口不符\n' + JSON.stringify(checkResult))
        ApiCheckLog.error('后端返回结果与fete定义的接口不符，接口：' + mockKey, checkResult)
      }
      // 重置选项值
      res.data = setSelectData(mockKey, res.data)
      return res
    }

  })

}

// 提示需要输入的选项
function setSelectData(mockKey, data) {

  if (feteApiUseMockData && feteApiForMock[mockKey]) {
    let output = feteApiForMock[mockKey].output
    let selects = querySelectKeys(output, {})

    if (Object.keys(selects).length === 0) return data;

    for (const key in selects) {
      let select = selects[key], dataType = select.dataType
      let comment = select.comment
      let keyVal = window.prompt(`请输入${key}的值:${!comment ? '' : '\n' + comment}`, '')
      if (dataType.toUpperCase() === 'NUMBER') {
        keyVal = keyVal*1
      }

      if (key.indexOf('[]') != -1){
        // 包含数组，只考虑一个数组的情况
        let arr = key.split('[]')
        if (arr.length <= 2) {
          let arrDatas = eval(`data.${arr[0]}`)
          for (let i in arrDatas) {
            eval(`arrDatas[i]${arr[1]} = ${keyVal}`)
          }
        }
      } else {
        eval(`data.${key}=${keyVal}`)
      }
    }

    return data;
  }
}

// 递归查找isSelect＝true的属性
function querySelectKeys(output, selects, preParent, parent) {
  let parentName = !(parent && parent.key) ? '' : parent.key
  parentName = !parentName ? '' : (parent.dataType.toUpperCase() === 'ARRAY' ? `${parentName}[].` : `${parentName}.`)
  parentName = `${!preParent?'':preParent}${parentName}`
  for (let i in output) {
      let val = output[i]
      if (val.isSelect) {
        selects[`${parentName}${val.key}`] = val
      }
      if(!!val.children) {
        querySelectKeys(val.children, selects, parentName, val)
      }
  }
  return selects
}


function initFeteApiCheck() {
  try {
    if ($) {
      ApiCheckForJqueryAjax()
    }
  } catch (e) {
    console.log(e)
  }

  try {
    if (Vue && VueResource) {
      ApiCheckVueResource()
    }
  } catch (e) {
    console.log(e)
  }
}
// should call init after mock data come back from ajax, but got error, so call it here
// TODO: init after mock data come back but get error
initFeteApiCheck()
