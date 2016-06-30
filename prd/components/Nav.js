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
      projects: [],
    }
  }

  //初始化渲染后触发
  componentDidMount() {
    const self = this;
    const {team, project} = this.props;
    fetch('/team/data').then(res => self.setState({
      teams: res.data
    }))
    fetch('/project/data', {
      body: {
        teamId: team.id
      }
    }).then(res => self.setState({
      projects: res.data
    }))
  }

  render() {
    const {team, project} = this.props;
    const {teams, projects} = this.state;
    const teamMenu =
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
    const projectMenu =
      <Menu>
        {
          projects.map(item =>
            item.id === project.id ? null :
              <Menu.Item key={item.id}>
                <a href={'/prd?projectId=' + item.id}>{item.name}</a>
              </Menu.Item>
          )
        }
      </Menu>
    return (
      <div className="prd-nav">
        <Breadcrumb>
          <Breadcrumb.Item>当前位置</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Dropdown overlay={teamMenu}>
              <a className="ant-dropdown-link" href={'/project?teamId=' + team.id}>
                团队: {team.name}<Icon type="down"/>
              </a>
            </Dropdown>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Dropdown overlay={projectMenu}>
              <a className="ant-dropdown-link" href={'/prd?projectId=' + project.id}>
                项目: {project.name}<Icon type="down"/>
              </a>
            </Dropdown>
          </Breadcrumb.Item>
          <Breadcrumb.Item>我的PRD</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    )
  }
}

Nav.propTypes = {}
