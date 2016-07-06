/**
 * Created by zyy on 16/7/4.
 * zhangyuyu@superjia.com
 */
import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import Card from 'antd/lib/card';
import Button from 'antd/lib/button';

export default class Team extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {member, actions} = this.props;
    return (
      <div className={classNames({
        'member': true
      })}>
        <Card style={{ height: 90 }}>
          <div className="custom-card">
            <h3>{member.username}</h3>
            <div className="operators">
              <Button type="danger" htmlType="button" onClick={() => actions.deleteMemberShow(true, member)}>删除</Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }
}

Team.propTypes = {
  member: PropTypes.object.isRequired,
}
