/*
 * @Author: jade
 * @Date:   2016-06-12 00:03:50
 * @Last Modified by:   jade
 * @Last Modified time: 2016-06-28 23:37:31
 */

'use strict';
import React, {Component, PropTypes} from 'react';
import Card from 'antd/lib/card';
import Button from 'antd/lib/button';
import AddProject from './AddProject';
import Modal from 'antd/lib/modal';

export default class Project extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {project, updateShow, deleteShow, actions} = this.props;
    console.log(project)
    return (
      <div className="project">
        <Card title={project.name}>
          <p className="description">{project.description}</p>
          <div className="operators">
            <a className="ant-btn ant-btn-dashed" href={"/prd?projectId=" + project.id}>进入</a>
            &nbsp;
            <Button type="primary" htmlType="submit" onClick={() => actions.updateShow(true, project)}>更新</Button>
            &nbsp;
            <Button type="danger" htmlType="submit" onClick={() => actions.deleteShow(true, project)}>删除</Button>
          </div>
        </Card>
        <AddProject
          visible={updateShow}
          project={project}
          type="update"
          cancelCallback={()=>actions.updateShow(false, project)}
          okCallback={project=>actions.updateProject(project)}
        />
        <Modal title="删除团队"
               visible={deleteShow}
               onCancel={() => actions.deleteShow(false, project)}
               onOk={() => actions.deleteProject(project)}
        >
          <p>您确定要删除该"{project.name}"团队吗?</p>
        </Modal>
      </div>
    )
  }
}

Project.propTypes = {
  project: PropTypes.object.isRequired,
}
