// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

import util from '../common/util'

let options = []
const calendarNotify = {
  getEventList() {
    const self = this
    fetch('/calendar/events', {
      method: 'GET',
      body: {}
    }).then((res) => {
      const prds = res.data.data;
      options = []
      prds.forEach((prd) => {
        const title = `${prd.projectName}${prd.name}`
        self.__createOption(`MRD_${title}`, prd.mrdTime)
        self.__createOption(`PRD_${title}`, prd.prdTime)
        self.__createOption(`开发_${title}`, prd.devTime)
        self.__createOption(`联调_${title}`, prd.apiTime)
        self.__createOption(`提测_${title}`, prd.testTime)
        self.__createOption(`beta_${title}`, prd.betaTime)
        self.__createOption(`上线_${title}`, prd.onlineTime)
      })
      console.log(JSON.stringify(options));

      // 提醒
      self.__doNotify()
    })
  },
  __createOption(title, time) {
    const bt = time - Date.now()
    console.log(`${title} ${time}-${Date.now()}=bt`);
    if (bt >= 0 && bt <= 300000) {
      const content = `开始时间：${util.formateDate(time, '%H:%M')}`
      options.push({
        title: title,
        body: content
      })
    }
  },
  __doNotify() {
    options.forEach((opt) => {
      new Notification(opt.title, opt)
    })
  }
}
calendarNotify.getEventList()
setInterval(calendarNotify.getEventList, 60 * 1000)
