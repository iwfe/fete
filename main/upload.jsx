'use strict';
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {Link} from 'react-router';
import Upload from 'antd/lib/upload';
import Button from 'antd/lib/button';
import Message from 'antd/lib/message';
import Icon from 'antd/lib/icon';

class UploadV extends Component {
  constructor(props, context) {
    super(props, context);
  }

  static propTypes = {
  }

  render() {
    const props = {
      name: 'file',
      action: '/upload',
      onChange(info) {
        console.log(info)
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          Message.success(`${info.file.name} 上传成功。`);
        } else if (info.file.status === 'error') {
          Message.error(`${info.file.name} 上传失败。`);
        }
      },
    };
    return (
      <div className="mod-demo">
        <Upload {...props}>
          <Button type="ghost">
            <Icon type="upload" /> 点击上传
          </Button>
        </Upload>
      </div>
    )
  }
}

ReactDOM.render(
  <UploadV>
  </UploadV>
  , document.getElementById('main'));
