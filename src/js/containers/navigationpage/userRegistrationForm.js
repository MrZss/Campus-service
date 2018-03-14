import React, {Component} from 'react'
import {Form, Input, Select, Button, AutoComplete} from 'antd';
import PropTypes from 'prop-types'

import 'antd/dist/antd.css'

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };
    static contextTypes = {
        router: PropTypes.object
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                fetch('http://47.94.17.111/rest-auth/registration/',{
                    method:'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                        username:values.nickname,
                        password1: values.password,
                        password2: values.confirm,
                        email: values.email,
                    })
                }).then(
                    res => res.text()
                ).then(
                    this.context.router.history.push({
                        pathname: '/login',
                    })
                    // (json)=>{
                    //     console.log(json);
                    // }
                )
            }
        });
    };
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码不相同');
        } else {
            callback();
        }
    };
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        if (reg.test(value) === false) {
            callback('8-16位数字和字母组成');
        }
        callback();
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {autoCompleteResult} = this.state;
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} type="flex" className="Form-css">
                <FormItem
                    className="FormItem-css"
                    label="用户名"
                    hasFeedback
                >
                    {getFieldDecorator('nickname', {
                        rules: [{required: true, message: '请输入姓名', whitespace: true}],
                    })(
                        <Input placeholder="用户名"/>
                    )}
                </FormItem>
                <FormItem
                    className="FormItem-css"
                    label="邮箱"
                    hasFeedback
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: '邮箱格式错误',
                        }, {
                            required: true, message: '请输入邮箱',
                        }],
                    })(
                        <Input placeholder="邮箱"/>
                    )}
                </FormItem>
                <FormItem
                    className="FormItem-css"
                    label="密码"
                    hasFeedback
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '请输入密码',
                        }, {
                            validator: this.checkConfirm,
                        }],
                    })(
                        <Input type="password" placeholder="密码"/>
                    )}
                </FormItem>
                <FormItem
                    className="FormItem-css"
                    label="确认"
                    hasFeedback
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: '请确认密码',
                        }, {
                            validator: this.checkPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} placeholder="再次输入"/>
                    )}
                </FormItem>

                <FormItem
                    className="FormItem-css"
                >
                    <Button type="primary" htmlType="submit">注册</Button>
                </FormItem>
            </Form>
        );
    }
}

const UserRegistrationForm = Form.create()(RegistrationForm);

export default UserRegistrationForm;