/**
 * Created by zyy on 16/6/30.
 * zhangyuyu@superjia.com
 */
import React, {Component, PropTypes} from 'react';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import Dropdown from 'antd/lib/dropdown';
import Breadcrumb from 'antd/lib/breadcrumb';

export default class Nav extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      teams: [],
    }
  }

  //初始化渲染后触发
  componentDidMount() {
    const self = this;
    fetch('/team/data').then(res => self.setState({
      teams: res.data
    }))
  }

  render() {
    const {team} = this.props;
    const {teams} = this.state;
    const menu =
      <Menu>
        {
          teams.map(item =>
            item.id === team.id ? null :
              <Menu.Item key={item.id}>
                <a href={'/project?teamId=' + item.id}>{item.name}</a>
              </Menu.Item>
          )
        }
      </Menu>
    return (
      <div className="project-nav">
        <Breadcrumb>
          <Breadcrumb.Item>当前位置</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link">
                团队: {team.name}<Icon type="down"/>
              </a>
            </Dropdown>
          </Breadcrumb.Item>
          <Breadcrumb.Item>我的项目</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    )
  }
}

Nav.propTypes = {}
