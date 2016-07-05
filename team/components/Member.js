/**
 * Created by zyy on 16/7/4.
 * zhangyuyu@superjia.com
 */
import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import Card from 'antd/lib/card';
import Button from 'antd/lib/button';
import AddTeam from './AddTeam';
import Modal from 'antd/lib/modal';
import { Link } from 'react-router';

export default class Team extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {team, updateShow, deleteShow, actions} = this.props;
    return (
      <div className="team">
        <Card title={<div>{team.name}<Link style={{float: 'right'}} to={'/team/' + team.id}>详情</Link></div>}>
          <p className="description">{team.description}</p>
          <div className="operators">
            <a className="ant-btn ant-btn-dashed" href={"/project?teamId=" + team.id}>进入项目</a>
            &nbsp;
            <Button type="primary" htmlType="button" onClick={() => actions.updateShow(true, team)}>更新</Button>
            &nbsp;
            <Button type="danger" htmlType="button" onClick={() => actions.deleteShow(true, team)}>删除</Button>
          </div>
        </Card>
        <AddTeam
          visible={updateShow}
          team={team}
          type="update"
          cancelCallback={()=>actions.updateShow(false, team)}
          okCallback={team=>actions.updateTeam(team)}
        />
        <Modal title="删除团队"
               visible={deleteShow}
               onCancel={() => actions.deleteShow(false, team)}
               onOk={() => actions.deleteTeam(team)}
        >
          <p>您确定要删除该"{team.name}"团队吗?</p>
        </Modal>
      </div>
    )
  }
}

Team.propTypes = {
  team: PropTypes.object.isRequired,
}
