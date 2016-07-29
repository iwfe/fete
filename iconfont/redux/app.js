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
import Icon from 'antd/lib/icon';
import Card from 'antd/lib/card';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Iconfont from '../components/Iconfont';
import AddIconfont from '../components/AddIconfont';
import './app.scss';

class App extends Component {
  constructor(props) {
    super(props)
    // this.handleChange = this.handleChange.bind(this)
    // this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  //初始化渲染后触发
  componentDidMount() {
    console.log('执行componentDidMount');
    const {actions} = this.props
    actions.getIconfonts();
  }

  //每次接受新的props触发
  componentWillReceiveProps(nextProps) {
    // console.log('执行componentWillReceiveProps', nextProps);
    // if (nextProps.selectedReddit !== this.props.selectedReddit) {
    //     const { dispatch, selectedReddit } = nextProps
    //     dispatch(fetchPostsIfNeeded(selectedReddit))
    // }
  }

  handleChange(nextReddit) {
    // this.props.dispatch(selectReddit(nextReddit))
  }

  handleRefreshClick(e) {
    // e.preventDefault()

    // const { dispatch, selectedReddit } = this.props
    // dispatch(invalidateReddit(selectedReddit))
    // dispatch(fetchPostsIfNeeded(selectedReddit))
  }

  addOk(iconfont) {
    const {actions} = this.props;
    actions.addIconfont(iconfont);
  }

  addCancel() {
    const {actions} = this.props;
    actions.addShow(false);
  }

  render() {
    const self = this;
    const {iconfonts, actions, addShow, updateShow, deleteShow} = this.props;
    return (
      <div className="mod-iconfont">
        <Row gutter={16}>
          {
            iconfonts.map(item=>
              <Col
                key={'iconfont-' + item.id}
                className="gutter-row"
                span={6}
              >
                <Iconfont
                  iconfont={item}
                  updateShow={(updateShow && updateShow.iconfont.id === item.id) ? updateShow.updateShow : false}
                  deleteShow={(deleteShow && deleteShow.iconfont.id === item.id) ? deleteShow.deleteShow : false}
                  actions={actions}
                ></Iconfont>
              </Col>
            )
          }
          <AddIconfont
            visible={addShow}
            type="add"
            okCallback={this.addOk.bind(self)}
            cancelCallback={this.addCancel.bind(self)}
          />
          <Col className="iconfont-add gutter-row" span={6} onClick={() => actions.addShow(true)}>
            <Card title="创建团队"><Icon type="plus"/></Card>
          </Col>
        </Row>
      </div>
    )
  }
}

App.propTypes = {
  iconfonts: PropTypes.array.isRequired,
  addShow: PropTypes.bool,
  updateShow: PropTypes.object
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(state=> {
  return {
    iconfonts: state.iconfonts,
    addShow: state.addShow,
    confirmLoading: state.confirmLoading,
    updateShow: state.updateShow,
    deleteShow: state.deleteShow,
  }
}, mapDispatchToProps)(App);
