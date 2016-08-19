<template>
  <div class="jj-temp">
    <div class="doc-example java">
      <pre>
        <textarea id="java" @blur="keyup" placeholder="骚年～java代码粘过来吧！"></textarea>
        </pre>
    </div>
    <div class="doc-example json">
    <input class="copy" type="button" value="copy" @click="copy"/>
      <pre>
        <textarea id="json" placeholder="见证奇迹的时刻……"></textarea>
      </pre>
    </div>
  </div>
</template>

<script>
  const dataTypes = {
    String: '',
    int: 0,
    Integer: 0,
    long: 0,
    Long: 0,
    float: 0.0,
    Float: 0.0,
    double: 0.0,
    Double: 0.0,
    BigDecimal: 0.0,
    Boolean: false,
    boolean: false,
    List: [],
    Date: '',
    'Object[]': [],
    Map: {}
  }
  export default {
    data() {

    },
    ready() {
      this.java2json();
    },
    methods: {
      java2json() {
        const java = $('#java').val()
        if (!java) return

        const arrs = java.split('\n')
        const json = {}

        for (let i = 0; i < arrs.length; i++) {
          const line = arrs[i]
          const reg = /[a-z]{4,10}\s+([\w\-]+)(?:[\w\-<>\s]*)\s+([\w\-]+)(?:\s*=?\s*(.+)\s*)?;\s*(?:\/\/\s*(.*))?/g
          const res = reg.exec(line) // ["private int offSet = 0; //数据偏移量", "int", "offSet", "0", "数据偏移量"]

          if (!res || !res[2]) continue
          const defVal = dataTypes[res[1]] === undefined ? '' : dataTypes[res[1]]  // 类型对应的默认值
          json[res[2]] = !res[3] ? defVal : res[3]

          // String或Date类型的，值等于注释
          if (res[1] === 'String' || res[1] === 'Date' && !!res[4]) {
            json[res[2]] = res[4]
          }
        }
        $('#json').val(JSON.stringify(json, null, 2))
      },
      keyup() {
        this.java2json()
      },
      copy() {
        const $txt = $('#json')
        if (!$txt.val() || $txt.val() === '{}') {
          toastr.warning('嗨，骚年！空白也要烤么？')
          return
        }
        $txt[0].select()
        document.execCommand('Copy', false, null)
        toastr.success('嗨，骚年！你要的代码已经在剪贴板咯，粘去吧^@^！')
      }
    },
    events: {

    }
  }
</script>

<style lang="sass">
.jj-temp {
  display: flex;
  flex-grow: 1;
}
.doc-example {
    display: flex;
    flex-grow: 1;
    border: 1px solid #eee;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    padding: 0 15px 0;
    max-width: 50%;
}
.doc-example:before {
    content: 'java';
    display: block;
    color: #bbb;
    text-transform: uppercase;
    margin: 0 -15px 15px;
    padding: 4px 10px;
    font-size: 12px;
}
.doc-example.java {
  border-right: 0;
}
.doc-example.json:before {
    content: 'json';
}
.doc-example:after {
    content: '';
    display: table;
    clear: both;
}
*, :after, :before {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.am-pre-scrollable {
    max-height: 24rem;
    overflow-y: scroll;
}
pre {
    display: block;
    line-height: 1.6;
    word-break: break-all;
    word-wrap: break-word;
    color: #555;
    background-color: #f8f8f8;
    border: 1px solid #dedede;
    border-radius: 0;
    margin: 24px 10px 20px -10px;
    width: 100%;
    min-height: 485px;
    overflow: hidden;
    padding: 0px 40px 20px 0;
}
code, kbd, pre, samp {
    font-family: Monaco,Menlo,Consolas,"Courier New",FontAwesome,monospace;
    outline: none;
}
#java, #json {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: 0 0 0 -24px;
  padding: 10px;
  outline: none;
  border: 0;
  background-color: #f8f8f8;
}
.copy {
  display: inline-block;
  width: 60px;
  height: 21px;
  position: absolute;
  right: 0;
  top: 0;
}
.copy:hover {
  background-color: #f8f8f8;
  outline: none;
}
</style>
