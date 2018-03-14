import {BrowserRouter, Route, hashHistory, Switch} from 'react-router-dom';
import React from 'react';
import  App from './js/page/navigationpage/App.js'
import UserLogin from './js/page/navigationpage/login'
import UserRegistrationForm from './js/page/navigationpage/userRegistrationForm'
import FooteBar from './js/components/footebar.js'
import FoundList from './js/page/foundpage/foundlist.js'
import LostList from './js/page/lostpage/lostlist.js'
import MyInterFace from './js/page/personalpage/myinterface.js'
import FoundDetail from './js/page/foundpage/founddetail.js'
import LostDetail from './js/page/lostpage/lostdetail.js'
import PublishType from './js/page/personalpage/publishtype.js'
import WrappedLostPublish from './js/page/personalpage/lostpublish.js'
import WrappedFoundPublish from './js/page/personalpage/foundpublish.js'
import WrappedLostdetailPublish from './js/page/personalpage/lostdetailpublish.js'
import WrappedFounddetailPublish from './js/page/personalpage/founddetailpublish.js'

class SiteRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="found_wrap">
                    <Route exact path='/' component={App}/>
                    <Route  path='/login' component={UserLogin}/>
                    <Route path='/registration' component={UserRegistrationForm}/>
                    <Route path="/found" component={FoundList}/>
                    <Route path="/founddetail" component={FoundDetail}/>
                    <Route path="/lost" component={LostList}/>
                    <Route path="/lostdetail" component={LostDetail}/>
                    <Route path="/my" component={MyInterFace}/>
                    <Route path="/publishtype" component={PublishType}/>
                    <Route path="/foundpublish" component={WrappedFoundPublish}/>
                    <Route path="/lostpublish" component={WrappedLostPublish}/>
                    <Route path="/founddetailpublish" component={WrappedFounddetailPublish}/>
                    <Route path="/lostdetailpublish" component={WrappedLostdetailPublish}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default SiteRouter;