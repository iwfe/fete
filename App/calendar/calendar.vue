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
  require('fullcalendar/dist/fullcalendar.js')
  export default {
    ready() {
      this.getEventList()
    },
    data() {
      return {
        events: [{
          title: 'sdfdsfdsfsdfdsfsdf',
          start: 1487920714545
        }, {
          title: 'All Day Event',
          start: '2017-02-01'
        }, {
          title: 'Long Event',
          start: '2017-02-07',
          end: '2017-02-10'
        }, {
          id: 999,
          title: 'Repeating Event',
          start: '2017-02-09T16:00:00'
        }, {
          id: 999,
          title: 'Repeating Event',
          start: '2017-02-16T16:00:00'
        }, {
          title: 'Conference',
          start: '2017-02-11',
          end: '2017-02-13'
        }, {
          title: 'Meeting',
          start: '2017-02-12T10:30:00',
          end: '2017-02-12T12:30:00'
        }, {
          title: 'Lunch',
          start: '2017-02-12T12:00:00'
        }, {
          title: 'Meeting',
          start: '2017-02-12T14:30:00'
        }, {
          title: 'Happy Hour',
          start: '2017-02-12T17:30:00'
        }, {
          title: 'Dinner',
          start: '2017-02-12T20:00:00'
        }, {
          title: 'Birthday Party',
          start: '2017-02-13T07:00:00'
        }, {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2017-02-28'
        }]
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
          events: events
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
            self.__createEvents(`上线_${title}`, prd.onlineTime, events)
          })

          // 初始化
          self.__initFullCalendar(events)
        })
      },
      __createEvents(title, eventTime, events) {
        if (!eventTime) return
        console.log(`eventTime${eventTime}`);
        events.push({
          title: title,
          start: eventTime
          // end: '2017-02-12T12:30:00',
          // url: ''
        })
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
  }
</style>
