/*
* @Author: wjs
* @Date:   2016-06-28 23:08:57
* @Last Modified by:   wjs
* @Last Modified time: 2016-06-28 23:59:53
*/


const ApiCheckInput = (input) => {
  // TODO: chenck input format
  return false
}

const ApiCheckOutput = (output) => {
  // TODO: chenck out format
  return false
}

// jquery ajax global interceptor
if (window.jQuery) {

  // to get ajaxSend and ajaxSend work
  $.ajaxSetup({
    global: true
  })

  // check input
  $( document ).ajaxSend((event, jqxhr, settings) => {
    // ApiCheckInput(jqxhr.data)
    console.log('-------- from api_check.js jquery ajax before send')
    console.log(jqxhr)
    console.log(settings)
  })

  // check output
  $( document ).ajaxSend((event, jqxhr, settings) => {
    // ApiCheckOutput(jqxhr)
    console.log('-------- from api_check.js jquery ajax before send')
    console.log(jqxhr)
    console.log(settings)
  })

}
