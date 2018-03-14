import React, {Component} from 'react';
import '../../../css/index.css'
import ReactDOM from 'react-dom';
import {history} from 'react-router-dom'
import PropTypes from "prop-types";
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Upload,
    Modal,
    Select,
    Mention,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete
} from 'antd';


const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;


class LostPublish extends React.Component {
    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            username: '',
            key: '',
            summary_data: '',
            goods_id: '',
            confirmDirty: false,
            autoCompleteResult: [],
            lostpublish_data: '',
            previewVisible: false,
            previewImage: '',
            fileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }],
        }
    };

    componentDidMount() {
        try {
            if (localStorage.getItem('gengdanRoyalEmpireToken') !== null) {
                this.setState({
                    userName: localStorage.getItem('gengdanRoyalEmpireUsername'),
                    key: localStorage.getItem('gengdanRoyalEmpireToken'),
                    login: true,
                });
            } else {
                alert("请先登录")
                this.props.history.push('/login')
            }
        } catch (err) {
            alert("请先登录")
            this.props.history.push('/login')
        }
    }

    handleSubmit = (e) => {
        let form = this.refs.form1
        let formData = new FormData(form)


        fetch('http://47.94.17.111/api/v1/goods_list/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Token' + ' ' + localStorage.getItem('gengdanRoyalEmpireToken'),
                },
                body: formData

            }
        ).then(res => res.text())
            .then(function (res) {
                    let id = JSON.parse(res)._id
                    return id
                }
            )
            .then((id) =>
                this.context.router.history.push({
                    pathname: '/lostdetailpublish',
                    state: {
                        goods_id: id
                    }
                })
            )
            .catch(function (e) {
                console.log("Oops, error");
                alert("网络错误")
            });


        e.preventDefault();


    }

    render() {
        const titleConfig = {
            rules: [{
                required: true, message: '请输入标题内容！',
            }],
        }

        const {TextArea} = Input;
        const {toString} = Mention;
        const {getFieldDecorator} = this.props.form;
        const {autoCompleteResult} = this.state;
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{width: 60}}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));
        var selectStyle = {
            height: '100%',
            width: '100%',
        };
        //上传图片
        const {previewVisible, previewImage, fileList} = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="foudn_detail_wrap">
                <div className="detail_title">
                    <p>描述物品属性</p>
                </div>
                <div className="detail_title_down">
                    <p>智能匹配</p>
                </div>
                <form name="form1" ref="form1" id="form1" className="from_style">
                    <FormItem
                        className="formitem_style"
                        label="物品名称"
                        name="name"
                    >
                        {getFieldDecorator('name', titleConfig)(
                            <Input name="name" placeholder='物品名称'/>
                        )}
                    </FormItem>
                    <FormItem
                        className="formitem_style"
                        label="物品颜色"
                        name="color"
                    >
                        {getFieldDecorator('color', titleConfig)(
                            <Input name="color" placeholder='物品颜色'/>
                        )}
                    </FormItem>

                    <FormItem
                        className="formitem_style"
                        label="分类"
                        name="type"
                    >
                        {getFieldDecorator('type', {
                            rules: [{required: true, message: 'Please select your gender!'}],
                        })(
                            <div className="publish_styled_select">
                                <div className="styled-select">
                                    <select name="type" style={selectStyle}>
                                        <option value='全部'>物品种类</option>
                                        <option value='饭卡'>饭卡</option>
                                        <option value='钥匙'>钥匙</option>
                                        <option value='钱包'>钱包</option>
                                        <option value='手机'>手机</option>
                                        <option value='耳机'>耳机</option>
                                        <option value='文具'>文具</option>
                                        <option value='水杯'>水杯</option>
                                        <option value='数据线'>数据线</option>
                                        <option value='移动电源'>移动电源</option>
                                        <option value='其他'>其他</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </FormItem>
                    <FormItem
                        label="上传图片"
                        name="picture"
                    >
                        {getFieldDecorator('picture', {
                            rules: [{
                                required: true, message: 'Please input your password!',
                            }, {
                                validator: this.checkConfirm,
                            }],
                        })(
                            <Input name="picture" type="file"/>
                        )}
                    </FormItem>

                    <FormItem>
                        <input type="button" name="b1" className="post_btn" value="下一步"
                               onClick={this.handleSubmit.bind(this)}/>
                    </FormItem>

                </form>
            </div>
        );
    }
}

const WrappedLostPublish = Form.create()(LostPublish);
export default WrappedLostPublish;