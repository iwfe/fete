/*
 * @Author: wjs
 * @Date:   2016-06-28 23:08:57
 * @Last Modified by:   wjs
 * @Last Modified time: 2016-06-29 12:21:28
 */


function ApiCheckInput(input) {
  // TODO: chenck input format
  return false
}

function ApiCheckOutput(output) {
  // TODO: chenck out format
  return false
}

// jquery ajax global interceptor
window.ApiCheckForJqueryAjax = function($) {

  // to get ajaxSend and ajaxSend work
  $.ajaxSetup({
    global: true
  })

  // check input
  $(document).ajaxSend((event, jqxhr, settings) => {
    // ApiCheckInput(jqxhr.data)
    console.log('-------- from api_check.js jquery ajax before send')
    console.log(jqxhr)
    console.log(settings)
  })

  // check output
  $(document).ajaxSend((event, jqxhr, settings) => {
    // ApiCheckOutput(jqxhr)
    console.log('-------- from api_check.js jquery ajax after success')
    console.log(jqxhr)
    console.log(settings)
  })

}

// vue-resource global interceptor
window.ApiCheckVueResource = function(Vue) {

  Vue.http.interceptors.push({

    // check input
    request: req => {
      // ApiCheckInput(req)
      console.log('-------- from api_check.js vue-resource before send')
      console.log(req.url)
      console.log(req.method)
      console.log(req.data)
      req.url = `http://localhost:3810/api/fete_api/${feteApiProductId}/mock/test/aaa`;
      return req
    },

    // check output
    response: res => {
      // ApiCheckOutput(res)
      console.log('-------- from api_check.js vue-resource after success')
      console.log(res.request.url)
      console.log(res.request.method)
      console.log(res.data)
      return res
    }

  })

}
