/*
 * @Author: wjs
 * @Date:   2016-06-28 23:08:57
 * @Last Modified by:   wjs
 * @Last Modified time: 2016-07-07 18:42:29
 */

var Mock = require('mockjs')

// check input
function ApiCheckInput(input) {
  // TODO: chenck input format
  return false
}

// check output
function ApiCheckOutput(output) {
  // TODO: chenck out format
  return Mock.valid({
    'list|1-10': [{
      'id|+1': 1
    }]
  }, output)
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
        console.log('-------- from api_check.js jquery ajax before send')
          // console.log(settings)
        console.log(settings.url)
        console.log(settings.type)
        console.log(settings.data) // post 才有 ，get 直接挂 url 上了
          // ApiCheckInput(settings.data)
        if (feteApiUseMockData) {
          settings.url = feteApiHost + '/api/fete_api/' + feteApiProductId + '/mock' + settings.url;
        }
      })
      // check output
    $(document).ajaxSuccess(function(event, jqxhr, settings) {
      console.log('-------- from api_check.js jquery ajax after success')
        // console.log(jqxhr)
      console.log(settings.url)
      console.log(settings.type)
      console.log(jqxhr.responseJSON) // 还有一个 responseText
      console.log('----- check output result:')
      var checkResult = ApiCheckOutput(jqxhr.responseJSON)
      console.log(checkResult)
    })
  } else if ($.ajaxSettings) {
    // zepto
    $.ajaxSettings.global = true

    $(document).on('ajaxBeforeSend', function(e, xhr, settings) {
      console.log('-------- from api_check.js zepto ajax before send')
        // console.log(settings)
      console.log(settings.url)
      console.log(settings.type)
      console.log(settings.data) // post 才有 ，get 直接挂 url 上了
        // ApiCheckInput(settings.data)
      if (feteApiUseMockData) {
        settings.url = feteApiHost + '/api/fete_api/' + feteApiProductId + '/mock' + settings.url;
      }
    })
    $(document).on('ajaxSuccess', function(e, xhr, settings) {
      console.log('-------- from api_check.js zepto ajax after success')
        // console.log(jqxhr)
      console.log(settings.url)
      console.log(settings.type)
      console.log(xhr.responseJSON) // 还有一个 responseText
      console.log('----- check output result:')
      var checkResult = ApiCheckOutput(xhr.responseJSON)
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
      // ApiCheckInput(req)
      console.log('-------- from api_check.js vue-resource before send')
      console.log(req.url)
      console.log(req.method)
      console.log(req.data)
      if (feteApiUseMockData) {
        req.url = feteApiHost + '/api/fete_api/' + feteApiProductId + '/mock' + req.url;
      }
      return req
    },

    // check output
    response: res => {
      // ApiCheckOutput(res)
      console.log('-------- from api_check.js vue-resource after success')
      console.log(res.request.url)
      console.log(res.request.method)
      console.log(res.data)
      console.log('----- check output result:')
      var checkResult = ApiCheckOutput(res.data)
      console.log(checkResult)
      return res
    }

  })

}

// jquery 的还有问题，先注释掉
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
