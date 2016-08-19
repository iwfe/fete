/*
 * @Author: jade
 * @Date:   2016-06-26 21:57:58
 * @Last Modified by:   jade
 * @Last Modified time: 2016-06-29 11:58:51
 */

'use strict';
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as actions from './action'
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Card from 'antd/lib/card';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Modal from 'antd/lib/modal';
import Tabs from 'antd/lib/tabs';
import Checkbox from 'antd/lib/checkbox';
import Member from '../components/Member';
import InviteMember from '../components/InviteMember.jsx';
import PrdList from '../../prd/components/PrdList.jsx';
import './app.scss';
const TabPane = Tabs.TabPane;
const CheckboxGroup = Checkbox.Group;

class Detail extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    team: PropTypes.object.isRequired,
  };

  //初始化渲染后触发
  componentDidMount() {
    const {team, actions} = this.props;
    actions.getMembers(team);
    actions.getPrds(team, 'all');
  }

  render() {
    const {team, members, prds, actions, inviteMemberShow, deleteMemberShow} = this.props;
    const options = [
      { label: 'mrd', value: 'mrd' },
      { label: 'prd', value: 'prd' },
      { label: '开发', value: 'dev' },
      { label: '联调', value: 'api' },
      { label: '提测', value: 'test' },
      { label: 'beta', value: 'beta' },
      { label: '上线', value: 'online' },
    ];
    return (
      <div className="mod-detail">
        <h2 className="detail-title">{team.name}</h2>
        <Tabs defaultActiveKey="member">
          <TabPane tab="团队成员" key="member">
            <Row gutter={16}>
              {
                members.map(item=>
                  <Col
                    key={'team-' + item.username}
                    className="gutter-row"
                    span={4}
                  >
                    <Member
                      member={item}
                      actions={actions}
                    />
                  </Col>
                )
              }
              <Col className="member-invite gutter-row" span={4} onClick={() => actions.inviteMemberShow(true)}>
                <Card style={{ height: 90 }}><Icon type="plus"/></Card>
              </Col>
            </Row>
            {
              deleteMemberShow && deleteMemberShow.show ?
                <Modal title="删除团队成员"
                       visible={deleteMemberShow.show}
                       onCancel={() => actions.deleteMemberShow(false, deleteMemberShow.member)}
                       onOk={() => actions.deleteMember(team, deleteMemberShow.member)}
                >
                  <p>您确定要删除该"{deleteMemberShow.member.username}"成员吗?</p>
                </Modal>
                : null
            }
            {
              inviteMemberShow ?
                <InviteMember
                  visible={inviteMemberShow}
                  type="add"
                  okCallback={member => actions.inviteMember(team, member)}
                  cancelCallback={() => actions.inviteMemberShow(false)}
                />
                : null
            }
          </TabPane>
          <TabPane tab="prd详情" key="prd">
            <CheckboxGroup options={options} defaultValue={[]} onChange={value => actions.getPrds(team, value)} />
            <br/>
            {
              prds ? <PrdList prds={prds} showProject={true} /> : null
            }
          </TabPane>
        </Tabs>
      </div>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(state=> {
  return {
    team: state.teams.find(item=>item.id == state.router.params.teamId) || pageConfig.team.team,
    members: state.members,
    prds: state.prds,
    inviteMemberShow: state.inviteMemberShow,
    deleteMemberShow: state.deleteMemberShow,
  }
}, mapDispatchToProps)(Detail);
