/*
 * @Author: jade
 * @Date:   2016-05-31 14:07:40
 * @Last Modified by:   jade
 * @Last Modified time: 2016-06-15 18:23:45
 */

'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import menus from './menu';
import util from '../common/util';
import _ from 'underscore';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const user = this.props.user;
        return (
            <div className="header-wrap clearfix">
                <div className="pull-left">
                    <Menu onClick={this.handleClick} mode="horizontal" selectedKeys={[this.props.current]}>
                        {
                            this.props.menus.map( menu =>
                                util.showIf(menu.subMenus,
                                    <SubMenu key={menu.key} title={menu.text}>
                                        {
                                            menu.subMenus && menu.subMenus.map(subMenu =>
                                                <Menu.Item key={subMenu.key}>
                                                    <a href={subMenu.link}>{subMenu.text}</a>
                                                </Menu.Item>
                                            )
                                        }
                                    </SubMenu>,
                                    <Menu.Item key={menu.key}>
                                        <a href={menu.link}>{menu.text}</a>
                                    </Menu.Item>)
                            )
                        }
                    </Menu>
                </div>
                <div className="pull-right">
                    <Menu onClick={this.handleClick} mode="horizontal" selectedKeys={[this.props.current]}>
                        {
                            util.showIf(user.username,
                                <SubMenu title={user.username}>
                                    <Menu.Item><a href="/user/profile">个人设置</a></Menu.Item>
                                    <Menu.Item><a href="/logout">退出</a></Menu.Item>
                                </SubMenu>,
                                <Menu.Item key="login">
                                    <a href="/login">登录</a>
                                </Menu.Item>)
                        }
                    </Menu>
                </div>
            </div>
        );
    }
}

if (typeof document != 'undefined') {
    const staticTag = pageConfig.staticTag;
    const currentPageConfig = pageConfig[staticTag];
    if (!currentPageConfig.noHeader) {
        ReactDOM.render(
            <Header user={pageConfig.me} current={staticTag} menus = {currentPageConfig.menus || menus}/>, document.getElementById('header')
        );
    }

}

export {
    Header
};