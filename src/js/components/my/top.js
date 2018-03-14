import React from 'react';
import {Link} from 'react-router-dom';
import ProfilePhotoCompoents from './profilephotocompoents.js'
import PublishButtonCompoents from './publishbuttoncompoents.js'

class Top extends React.Component {
    constructor(props){
        super(props);
        this.state={
            user_img : ""
        }

    }
    componentDidMount() {
        var url = "http://47.94.17.111/api/v1/account/"+localStorage.getItem('userId')
        if ("fetch" in window) {
            fetch(url).then(function (response) {
                return response.json();
            }).then(function (jsonData) {
                return jsonData;
            }).then((e) => {
                this.setState({
                    user_img: e.avatar
                })
            }).catch(function () {
                console.log('出错了');
            });
        } else {
            // 不支持
            console.log(321)
        }


    }
    render(){

        return(
            <div className="top">
                <PublishButtonCompoents />
                <ProfilePhotoCompoents userName={this.props.userName} user_img={this.state.user_img}/>
            </div>

        );
    }
}
export default Top;