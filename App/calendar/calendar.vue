/* 日历 */
<template>
  <div id='calendar'></div>
</template>

<script type="text/babel">
  require('fullcalendar/dist/fullcalendar.css')
  require('components-jqueryui/themes/cupertino/jquery-ui.css')
  // require('fullcalendar/dist/fullcalendar.print.css')
  require('jquery/dist/jquery.js')
  require('moment/moment.js')
  require('../../plugins/jquery.qtip.min.css')
  require('../../plugins/jquery.qtip.min.js')
  require('fullcalendar/dist/fullcalendar.js')

  import util from '../../common/util.js'
  export default {
    ready() {
      this.getEventList()
    },
    data() {
      return {
        events: []
      }
    },
    methods: {
      // 初始化FullCalendar
      __initFullCalendar(events) {
        const initialLocaleCode = 'zh-cn'

        $('#calendar').fullCalendar({
          theme: true,
          header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay,listMonth'
          },
          defaultDate: '2017-02-12',
          locale: initialLocaleCode,
          buttonIcons: false, // show the prev/next text
          weekNumbers: true,
          navLinks: true, // can click day/week names to navigate views
          editable: true,
          eventLimit: true, // allow "more" link when too many events
          events: events,
          eventRender: function (event, element) {
            element.qtip({
              content: event.description
            })
          }
        })

        // build the locale selector's options
        $.each($.fullCalendar.locales, (localeCode) => {
          $('#locale-selector').append(
            $('<option/>')
            .attr('value', localeCode)
            .prop('selected', localeCode === initialLocaleCode)
            .text(localeCode)
          )
        })

        // when the selected option changes, dynamically change the calendar option
        $('#locale-selector').on('change', () => {
          if (this.value) {
            $('#calendar').fullCalendar('option', 'locale', this.value)
          }
        })
      },
      // 获取所有的events
      getEventList() {
        const self = this
        fetch('/calendar/events', {
          method: 'GET',
          body: {}
        }).then((res) => {
          const prds = res.data.data
          const events = []
          prds.forEach((prd) => {
            const title = `${prd.projectName}${prd.name}`
            self.__createEvents(`MRD_${title}`, prd.mrdTime, events)
            self.__createEvents(`PRD_${title}`, prd.prdTime, events)
            self.__createEvents(`开发_${title}`, prd.devTime, events)
            self.__createEvents(`联调_${title}`, prd.apiTime, events)
            self.__createEvents(`提测_${title}`, prd.testTime, events)
            self.__createEvents(`beta_${title}`, prd.betaTime, events)
            self.__createEvents(`上线_${title}`, prd.onlineTime, events, { className: 'red' })
          })
          // console.log(`${JSON.stringify(events)}`);
          // 初始化
          self.__initFullCalendar(events)
        })
      },
      __createEvents(title, eventTime, events, assignObj) {
        if (!eventTime) return
        const d = new Date(eventTime)
        eventTime = util.formateDate(d, '%Y-%m-%dT%H:%M:%S')
        const content = `${title}\n开始时间：${util.formateDate(d, '%H:%M')}`

        events.push(Object.assign({
          title: title,
          start: eventTime,
          description: content
          // end: '2017-02-12T12:30:00',
          // url: ''
        }, assignObj))
      }
    }
  }
</script>

<style lang="sass">
  body {
    padding: 0;
    font-family: "Lucida Grande", Helvetica, Arial, Verdana, sans-serif;
    font-size: 14px;
  }
  #calendar {
    width: 90%;
    /* max-width: 900px; */
    margin: 10px auto;
    background: #f6f6f6;
    padding: 20px;

    .fc-content {
      background: #8dc9ec;
    }
    .fc-event {
      border-color: #8dc9ec;
    }
    .red {
      color: #e84a01;
    }
  }
</style>
