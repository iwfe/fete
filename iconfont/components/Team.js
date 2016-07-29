/*
 * @Author: jade
 * @Date:   2016-06-12 00:03:50
 * @Last Modified by:   jade
 * @Last Modified time: 2016-06-28 23:37:31
 */

'use strict';
import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import Card from 'antd/lib/card';
import Button from 'antd/lib/button';
import AddIconfont from './AddIconfont';
import Modal from 'antd/lib/modal';
import { Link } from 'react-router';

export default class Iconfont extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {iconfont, updateShow, deleteShow, actions} = this.props;
    return (
      <div className="iconfont">
        <Card title={<div>{iconfont.name}<Link style={{float: 'right'}} to={'/iconfont/' + iconfont.id}>详情</Link></div>}>
          <p className="description">{iconfont.description}</p>
          <div className="operators">
            <a className="ant-btn ant-btn-dashed" href={"/project?iconfontId=" + iconfont.id}>进入项目</a>
            &nbsp;
            <Button type="primary" htmlType="button" onClick={() => actions.updateShow(true, iconfont)}>更新</Button>
            &nbsp;
            <Button type="danger" htmlType="button" onClick={() => actions.deleteShow(true, iconfont)}>删除</Button>
          </div>
        </Card>
        <AddIconfont
          visible={updateShow}
          iconfont={iconfont}
          type="update"
          cancelCallback={()=>actions.updateShow(false, iconfont)}
          okCallback={iconfont=>actions.updateIconfont(iconfont)}
        />
        <Modal title="删除团队"
               visible={deleteShow}
               onCancel={() => actions.deleteShow(false, iconfont)}
               onOk={() => actions.deleteIconfont(iconfont)}
        >
          <p>您确定要删除该"{iconfont.name}"团队吗?</p>
        </Modal>
      </div>
    )
  }
}

Iconfont.propTypes = {
  iconfont: PropTypes.object.isRequired,
}
