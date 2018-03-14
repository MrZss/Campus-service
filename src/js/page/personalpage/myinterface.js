import React from 'react';
import {Link} from 'react-router-dom';
import Top from '../../components/my/top.js'
import PublishList from '../../components/my/publishlist.js'
import FooteBar from '../../components/footebar'


class MyInterFace extends React.Component {
    constructor(props){
        super(props);
        this.state={
            userName:'',
            key:'',

        }
    }
    componentDidMount() {
        try {
            if (localStorage.getItem('gengdanRoyalEmpireToken') !== null) {
                this.setState({
                    userName: localStorage.getItem('gengdanRoyalEmpireUsername'),
                    key: localStorage.getItem('gengdanRoyalEmpireToken'),
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
    render() {
        return (
            <div className="found_wrap">
                <div className="found_list">
                    <Top userName={this.state.userName}/>
                    <PublishList/>
                </div>
                <FooteBar/>
            </div>
        );
    }
}

export default MyInterFace;