/*
 * @Author: wjs
 * @Date:   2016-06-28 23:08:57
* @Last modified by:   lancui
* @Last modified time: 2016-08-04 15:08:66
 */

var Mock = require('mockjs')

// 企业号组自用，express server 的 index 里面有 pageConfig.pjid
feteApiProjectId = pageConfig && pageConfig.pjid ? pageConfig.pjid : feteApiProjectId

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
function ApiCheckInput(key, input) {
  if (!feteApiForMock[key]) {
    return 'mock api not found: ' + key
  }
  feteApiForMock[key].inputModel
}

// check output
function ApiCheckOutput(key, output) {
  if (!feteApiForMock[key]) {
    return 'mock api not found: ' + key
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
        alert('后端返回结果与fete定义的接口不符\n' + JSON.stringify(checkResult))
      }
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
        alert('后端返回结果与fete定义的接口不符\n' + JSON.stringify(checkResult))
      }
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
      if (!ApiCheckInput(mockKey, req.data)) {
        ApiCheckLog.error('前端请求参数有误', req.data)
        alert('前端请求参数有误\n' + JSON.stringify(req.data))
      }
      if (feteApiUseMockData) {
        req.url = feteApiHost + '/api/fete_api/' + feteApiProjectId + '/mock' + req.url;
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
        ApiCheckLog.error('后端返回结果与fete定义的接口不符', checkResult)
        alert('后端返回结果与fete定义的接口不符\n' + JSON.stringify(checkResult))
      }
      return res
    }

  })

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
