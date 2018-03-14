import React, {Component} from 'react'
import {Form, Icon, Input, Button, Checkbox, notification} from 'antd'
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim';
import {withCookies} from 'react-cookie';



const FormItem = Form.Item;

class userLogin extends React.Component {
    static contextTypes = {
        router: PropTypes.object,
    };


    constructor(props, context) {
        super(props, context);
        this.state = {
            key: '',
            username: null,
            password: null,
        };
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                fetch('http://47.94.17.111/rest-auth/login/',
                    {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: values.username,
                            password: values.password,
                        })
                    }
                ).then(function (response) {

                    if (values.remember === true) {
                        localStorage.setItem('remUsername', values.username);
                        localStorage.setItem('remPassword', values.password);
                    }
                    if (response.ok === true) {
                        localStorage.setItem('gengdanRoyalEmpireUsername', values.username);
                        localStorage.setItem('gengdanRoyalEmpirePassword', values.password);
                        localStorage.setItem('gengdanRoyalEmpireRemember', values.remember);
                        return response.json()
                    }
                }).then(function (json) {

                    localStorage.setItem("gengdanRoyalEmpireToken", json.key);
                }).then(() => {
                    fetch('http://47.94.17.111/rest-auth/user/', {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Token' + ' ' + localStorage.getItem('gengdanRoyalEmpireToken'),
                        }
                    }).then(function (res) {
                        return res.json();
                    }).then(function (json) {

                        localStorage.setItem('userId', json.pk);
                    });
                    this.context.router.history.push({
                        pathname: '/',
                    });
                }).catch(() => {
                    alert('账号/密码错误');
                });


            }
        });
    };

    forgotNotification() {
        this.context.router.history.push({
            pathname: '/forget',
        })

    };

    handleRegistration(e) {
        this.context.router.history.push({
            pathname: '/registration',
        })
    }

    componentDidMount() {

        if (localStorage.getItem('gengdanRoyalEmpireRemember') === 'true') {
            this.setState({
                username: localStorage.getItem('remUsername'),
                password: localStorage.getItem('remPassword')
            })
        }

    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const moveTime = 800;
        const openNotificationWithIcon = (type) => {
            notification[type]({
                message: '联系我们',
                description: '请发送相关信息至我们的邮箱buling910@126.com',
                style: {
                    width: 350,
                    marginLeft:345-345,
                },
            });
        };
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                <QueueAnim delay={330} duration={moveTime} type="right">
                    <FormItem className="login-information" key="2">
                        {getFieldDecorator('username', {
                            initialValue: this.state.username,
                            rules: [{required: true, message: '请输入昵称'}]
                        })(
                            <Input className='xm' prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="昵称"/>
                        )}
                    </FormItem>
                </QueueAnim>
                <QueueAnim delay={350} duration={moveTime} type="right">
                    <FormItem className="login-information" key="3">
                        {getFieldDecorator('password', {
                            initialValue: this.state.password,
                            rules: [{required: true, message: '请输入密码'}],
                        })(
                            <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                                   placeholder="密码"/>
                        )}
                    </FormItem>
                </QueueAnim>
                <QueueAnim delay={370} duration={moveTime} type="right">
                    <FormItem className="login-bottom" key="4">
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>记住我</Checkbox>
                        )}
                        <a className="login-form-forgot" onClick={() => openNotificationWithIcon('info')}>忘记密码？</a >

                    </FormItem>
                </QueueAnim>
                <QueueAnim delay={390} duration={moveTime} type="right">
                    <FormItem className="login-bottom-btn" key="5">
                        <Button type="primary" htmlType="submit">登录</Button>
                    </FormItem>
                </QueueAnim>
                <QueueAnim delay={390} duration={moveTime} type="right">
                    <FormItem className="login-bottom-btn" key="6">
                        <Button className="zhuce" onClick={this.handleRegistration.bind(this)}>注册</Button>
                    </FormItem>
                </QueueAnim>
            </Form>

        )
    }
}

const UserLogin = Form.create()(userLogin);
export default UserLogin;