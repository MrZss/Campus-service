import React from 'react';
import {Link} from 'react-router-dom';
import '../../../css/index.css'


class ProfilePhotoCompoent extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        console.log(this.props.user_img)


        return (
            <div className="profile_photo_compoent">
                <div className="profile_photo"><img className="profile_photo" src={this.props.user_img}/></div>
                <div className="student_number_compoent">
                    <div className="">{this.props.userName}</div>
                    <div className="to_personal">></div>
                </div>


            </div>

        );
    }
}

export default ProfilePhotoCompoent;