/**
 * Created by zyy on 16/6/30.
 * zhangyuyu@superjia.com
 */
import React, {Component, PropTypes} from 'react';
import Select from 'antd/lib/Select';
const Option = Select.Option;

export default class Nav extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      teams:[],
    }
  }

  //初始化渲染后触发
  componentDidMount() {
    const self = this;
    const {teamId} = self.props;
    fetch('/team/data').then(res => self.setState({
      teamEle:
        <Select defaultValue={teamId}  onChange={this.handleChange}>
          {res.data.map(team => <Option key={team.id} value={team.id}>{team.name}</Option>)}
        </Select>
    }))
  }

  handleChange(value) {
    window.location.href = `/project?teamId=${value}`;
  }

  render() {
    const {teamEle} = this.state;
    return (
      <div className="project-nav">
        团队: {teamEle}
      </div>
    )
  }
}

Nav.propTypes = {
  teamId: PropTypes.string.isRequired,
}
