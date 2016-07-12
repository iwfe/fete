/*
 * @Author: wjs
 * @Date:   2016-06-28 23:08:57
 * @Last Modified by:   wjs
 * @Last Modified time: 2016-07-12 14:25:54
 */

var Mock = require('mockjs')

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
  success: function(str, str2) {
    console.log('%c' + str + '%c' + (str2 === undefined ? '' : str2), 'color: #4fc174', 'color: #666')
  },
  error: function(str) {
    console.log('%c' + str, 'color: red')
  },
  warn: function(str, str2) {
    console.log('%c' + str + '%c' + (str2 === undefined ? '' : str2), 'color: #ea8311', 'color: #666')
  },
  info: function(str, str2) {
    console.log('%c' + str + '%c' + (str2 === undefined ? '' : str2), 'color: #2db7f5', 'color: #666')
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
function ApiCheckInput(input) {
  // TODO: chenck input format
  return false
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
        ApiCheckLog.title('-------- [FROM api_check.js] jquery ajax before send --------')
        ApiCheckLog.info('AJAX URL: ', settings.type.toUpperCase() + settings.url)
        ApiCheckLog.warn('Request params: ')
        console.log(settings.data) // post 才有 ，get 直接挂 url 上了
        // ApiCheckInput(settings.data)
        if (feteApiUseMockData) {
          settings.url = feteApiHost + '/api/fete_api/' + feteApiProjectId + '/mock' + settings.url;
          ApiCheckLog.info('Redirect to: ', settings.url)
        }
      })
      // check output
    $(document).ajaxSuccess(function(event, jqxhr, settings) {
      ApiCheckLog.title2('-------- [FROM api_check.js] jquery ajax after success --------')
        // console.log(jqxhr)
      let mockKey = settings.type.toUpperCase() + settings.url.split('?')[0].replace(feteApiHost + '/api/fete_api/' + feteApiProjectId + '/mock', '')
      ApiCheckLog.info('AJAX URL: ', mockKey)
      ApiCheckLog.success('Response data: ')
      console.log(jqxhr.responseJSON) // 还有一个 responseText
      ApiCheckLog.info('Mockjs check output result: ')
      var checkResult = ApiCheckOutput(mockKey, jqxhr.responseJSON)
      console.log(checkResult)
    })
  } else if ($.ajaxSettings) {
    // zepto
    $.ajaxSettings.global = true

    $(document).on('ajaxBeforeSend', function(e, xhr, settings) {
      ApiCheckLog.title('-------- [FROM api_check.js] zepto ajax before send --------')
      ApiCheckLog.info('AJAX URL: ', settings.type.toUpperCase() + settings.url)
      ApiCheckLog.warn('Request params: ')
      console.log(settings.data) // post 才有 ，get 直接挂 url 上了
      // ApiCheckInput(settings.data)
      if (feteApiUseMockData) {
        settings.url = feteApiHost + '/api/fete_api/' + feteApiProjectId + '/mock' + settings.url;
        ApiCheckLog.info('Redirect to: ', settings.url)
      }
    })
    $(document).on('ajaxSuccess', function(e, xhr, settings) {
      ApiCheckLog.title2('-------- [FROM api_check.js] zepto ajax after success --------')
      let mockKey = settings.type.toUpperCase() + settings.url.split('?')[0].replace(feteApiHost + '/api/fete_api/' + feteApiProjectId + '/mock', '')
      ApiCheckLog.info('AJAX URL: ', mockKey)
      ApiCheckLog.success('Response data: ')
      console.log(xhr.responseJSON) // 还有一个 responseText
      ApiCheckLog.info('Mockjs check output result: ')
      var checkResult = ApiCheckOutput(mockKey, xhr.responseJSON)
      console.log(checkResult)
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
      ApiCheckLog.title('-------- [FROM api_check.js] vue-resource before send --------')
      let mockKey = req.method.toUpperCase() + req.url
      ApiCheckLog.info('AJAX URL: ', mockKey)
      ApiCheckLog.warn('Request params: ')
      console.log(req.method.toUpperCase() === 'GET' ? req.params : req.data); // req.params: get params ; req.data: post params
      // ApiCheckInput(req)
      if (feteApiUseMockData) {
        req.url = feteApiHost + '/api/fete_api/' + feteApiProjectId + '/mock' + req.url;
        ApiCheckLog.info('Redirect to: ', req.url)
      }
      return req
    },

    // check output
    response: res => {
      // ApiCheckOutput(res)
      ApiCheckLog.title2('-------- [FROM api_check.js] vue-resource after success --------')
      let mockKey = res.request.method.toUpperCase() + res.request.url.replace(feteApiHost + '/api/fete_api/' + feteApiProjectId + '/mock', '')
      ApiCheckLog.info('AJAX URL: ', mockKey)
      ApiCheckLog.success('Response data: ')
      console.log(res.data)
      ApiCheckLog.info('Mockjs check output result: ')
      var checkResult = ApiCheckOutput(mockKey, res.data)
      console.log(checkResult)
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
