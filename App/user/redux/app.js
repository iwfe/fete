/**
* @Author: lancui
* @Date:   2016-08-29 15:08:00
* @Email:  lancui@superjia.com
* @Last modified by:   lancui
* @Last modified time: 2016-08-29 19:08:57
*/



/*判断数据变动的值*/
import './app.less'
import React, {Component, PropTypes} from 'react'
import { Select, Input, Icon } from 'antd'
import Upload from 'antd/lib/upload'
import Button from 'antd/lib/button'
import Message from 'antd/lib/message'
String.prototype.empy = function() {return this.replace(/\s/, '')}
const Option = Select.Option
const App = React.createClass ({
  getInitialState: function() {
    return {
      active: 'info', // 标识
      img: '',
      sex: '', // 性别
      role: '', // 角色
      name: '', // 姓名
      phone: '', // 手机号
      message: '', // 消息
      headPic: '', // 头像
      remarks: '', // 备注
      oldPassword: '', // 旧密码
      newPassword: '', // 新密码
      repeatPassword: '',
      iconLoading: false, // icon
      priviewImage: '/assets/avatar/' + (pageConfig.me.img || 'default.png')
    }
  },
  componentWillMount() {
    fetch('/user/data', {
      method: 'GET'
    }).then((res) => {
      if (res.code === 200) {
        this.setState({
          'name': res.data.username || '',
          'img': res.data.img
        })
        res.data.role ? this.setState({role: res.data.role}) : this.setState({role: 'frontend'})
        if (res.data.phone) this.setState({'phone': this.codePhone(res.data.phone)})
        if (res.data.remarks) this.setState({'remarks': res.data.remarks})
        res.data.message ? this.setState({'message': res.data.message}) : this.setState({'message': "yes"})
        !res.data.sex ? this.setState({'sex': "female"}) : this.setState({'sex': res.data.sex})
      }
    })
  },
  setSex(e) {
    this.setState({sex: e.target.dataset.sex})
  },
  setPhone(e) {
    const code = this.codePhone(e.target.value)
    this.setState({phone: code})
  },
  setMessage(e) {
    this.setState({message: e.target.dataset.message})
    console.log(e.target.dataset.message)
  },
  codePhone(phone) {
    const code = phone.replace(/[^\d]/g, "")
    const len = code.length
    if (len < 11) {
      if (len <= 3) {
        return code
      } else {
        if (len <= 7) {
          return code.substring(0, 3) + " " + code.substring(3, len)
        } else {
          return code.substring(0, 3) + " " + code.substring(3, 7) + " " + code.substring(7, len)
        }
      }
    } else {
      return code.substring(0, 3) + " " + code.substring(3, 7) + " " + code.substring(7, 11)
    }
  },
  handleInfo() {
    this.setState({active: 'info'})
  },
  handlePassword() {
    this.setState({active: 'password'})
  },
  setRole(value) {
    this.setState({role: value})
  },
  setRepeatPassword(e) {
    this.setState({repeatPassword: e.target.value.empy()})
  },
  setNewPassword(e) {
    this.setState({newPassword: e.target.value.empy()})
  },
  setOldPassword(e) {
    this.setState({oldPassword: e.target.value.empy()})
  },
  autoHeight(e) {
    this.setState({remarks: e.target.value})
    e.target.style.height = e.target.scrollHeight + 'px'
  },
  saveInfo(e) {
    if (this.state.name) {
      if (this.state.iconLoading === true) return
      this.setState({ iconLoading: true })
      const data = {
        sex: this.state.sex,
        name: this.state.name,
        phone: this.state.phone.empy(),
        role: this.state.role,
        message: this.state.message
      }
      alert(JSON.stringify(data))
      if (this.state.remarks) data.remarks = this.state.remarks.empy()
      fetch('/user/upload', {
        method: 'POST',
        body: data
      }).then(res => {
        if (res.code === 200) {
          setTimeout(() => {
            this.setState({ iconLoading: false })
            Message.success('信息修改成功')
          }, 2000)
        }
      })
    } else {
      Message.error('用户名为必填项')
    }
  },
  savePassword() {
    const oldPassword = this.state.oldPassword.empy()
    const newPassword = this.state.newPassword.empy()
    const repeatPassword = this.state.repeatPassword.empy()
    if (!oldPassword) {
      Message.error('请输入当前密码')
      return
    }
    if (!newPassword || !repeatPassword) {
      Message.error('请输入新密码')
      return
    }
    if (newPassword !== repeatPassword) {
      this.setState({newPassword: '',repeatPassword: ''})
      Message.error('两次密码不一致')
      return
    }
    if (oldPassword === newPassword) {
      Message.error('不能和当前密码一致')
      return
    }
    this.setState({ iconLoading: true })
    const data = {
      username: pageConfig.me.username,
      newPassword: newPassword,
      oldPassword: oldPassword
    }
    fetch('/user/uploadPassword', {
      method: 'POST',
      body:data
    })
    .then(res => {
      if (res.code === 200) {
        setTimeout(() => {
          this.setState({ iconLoading: false })
          this.setState({oldPassword: '',newPassword: '',repeatPassword: ''})
          Message.success('密码保存成功')
        }, 1000)
      }
    })
    .catch(() => {
      setTimeout(() => {
        this.setState({ iconLoading: false })
        this.setState({oldPassword: '',newPassword: '',repeatPassword: ''})
        Message.error('信息修改失败')
      }, 1000)
    })
  },
  render() {
    const self = this
    const info = this.state.active === 'info' ? {display: 'block'} : {display: 'none'}
    const password = this.state.active === 'password' ? {display: 'block'} : {display: 'none'}
    const props = {
      name: 'file',
      action: '/user/uploadPic',
      onChange(file) {
        console.log(file)
        if (file.file && file.file.response) {
          self.setState({priviewImage: '/assets/avatar/' + file.file.response.data})
        }
        // if (file.file.status !== 'uploading') {
        //   console.log(file.file, file.fileList);
        // }
        if (file.file.status === 'done') {
          Message.success(`${file.file.name} 上传成功。`);
        } else if (file.file.status === 'error') {
          Message.error(`${file.file.name} 上传失败。`);
        }
      }
    }

    let role = <div>正在加载角色信息...</div>
    if (this.state.role) {
      role = <Select showSearch
        style={{ width: 320 }}
        placeholder="角色"
        optionFilterProp="children"
        notFoundContent="无法找到"
        defaultValue={this.state.role}
        onChange={this.setRole}>
        <Option value="product">产品</Option>
        <Option value="design">设计</Option>
        <Option value="frontend">前端</Option>
        <Option value="fackend">后端</Option>
        <Option value="test">测试</Option>
      </Select>
    }
    return (
      <div className="main">
        <div className="user_list">
          <div className="user_title">账户设置</div>
          <ul>
            <li className={this.state.active === 'info' && 'active'} onClick={this.handleInfo}>个人信息</li>
            <li className={this.state.active === 'password' && 'active'} onClick={this.handlePassword}>修改密码</li>
          </ul>
        </div>
        <div className="user_main">
          <div className="cont" style={info}>
            <div className="user_title" style={{textAlign: 'left'}}>个人信息</div>
            <ul>
              <li>
                <div className="clearfix">
                  <Upload {...props}>
                    <div className="pic">
                      <img src={this.state.priviewImage} />
                    </div>
                  </Upload>
                </div>
              </li>
              <li>
                <input type="radio" className="magic-radio" id="sexMale" name="sex" checked={this.state.sex==='male'?true:false} />
                <label data-sex="male" onClick={this.setSex}>男</label>
                <input type="radio" className="magic-radio" id="sexFemale" name="sex" checked={this.state.sex==='female'?true:false}/>
                <label data-sex="female" onClick={this.setSex}>女</label>
              </li>
              <li>{role}</li>
              <li><Input style={{ height: 30 }} placeholder="姓名" value={this.state.name} disabled="true"/>
              </li>
              <li>
                <Input style={{ height: 30 }} placeholder="手机号" value={this.state.phone} onChange={this.setPhone} />
              </li>
              <li><textarea id="area" className="area" onInput={this.autoHeight} value={this.state.remarks} placeholder="备注信息"></textarea></li>
              <li>
                <span style={{marginRight: '12px'}}>消息通知:</span>
                <input type="radio" className="magic-radio" id="messageyes" name="message" checked={this.state.message==='yes'?true:false} />
                <label data-message="yes" onClick={this.setMessage}>是</label>
                <input type="radio" className="magic-radio" id="messageno" name="message" checked={this.state.message==='no'?true:false}/>
                <label data-message="no" onClick={this.setMessage}>否</label>
              </li>
              <li style={{marginTop:"24px"}}><Button type="primary" icon="poweroff" loading={this.state.iconLoading} onClick={this.saveInfo}>{this.state.iconLoading?'保存中':'保存信息'}</Button></li>
            </ul>
          </div>

          <div className="cont" style={password}>
            <div className="user_title" style={{marginBottom: '24px',textAlign: 'left'}}>修改密码</div>
            <ul>
              <li>
                <Input style={{ height: 30 }} type="password" placeholder="当前密码" value={this.state.oldPassword} onChange={this.setOldPassword} />
              </li>
              <li>
                <Input style={{ height: 30 }} type="password" placeholder="新的密码" value={this.state.newPassword} onChange={this.setNewPassword} />
              </li>
              <li>
                <Input style={{ height: 30 }} type="password" placeholder="重复一遍新的密码" value={this.state.repeatPassword} onChange={this.setRepeatPassword} />
              </li>
              <li style={{marginTop:"24px"}}><Button type="primary" icon="poweroff" loading={this.state.iconLoading} onClick={this.savePassword}>{this.state.iconLoading?'保存中':'保存密码'}</Button></li>
            </ul>
          </div>

        </div>
      </div>
    )
  }
})

export default App
