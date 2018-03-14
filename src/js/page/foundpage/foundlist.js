import React from 'react';
import {BrowserRouter, Route, hashHistory} from 'react-router-dom';
import Search from '../../components/search.js'
import FoundTable from '../../components/found/foundtable.js'
import TypeSearch from '../../components/typesearch.js'
import AreaSearch from '../../components/areasearch.js'
import FooteBar from '../../components/footebar'
import PropTypes from "prop-types";


class FoundList extends React.Component {
    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            FoundListData: "",
            areaText: "全部",
            typeText: "全部"
        };
        this.handleAreaTextInput = this.handleAreaTextInput.bind(this);
        this.handleTypeTextInput = this.handleTypeTextInput.bind(this);

    };

    handleAreaTextInput(areaText) {
        this.setState({
            areaText: areaText
        });
    };

    handleTypeTextInput(typeText) {
        this.setState({
            typeText: typeText
        });

    }

    componentDidMount() {
        var url = "http://47.94.17.111/api/v1/lost_goods/"
        if ("fetch" in window) {
            fetch(url).then(function (response) {
                return response.json();
            }).then(function (jsonData) {
                return jsonData;
            }).then((e) => {
                this.setState({
                    FoundListData: e
                })
            }).catch(function () {

            });
        } else {
            // 不支持

        }


    }

    render() {
        return (
            <div className="found_wrap">
                <div className="found_list">
                    <div className="search_mid">
                        {/*<TypeSearch*/}
                        {/*typeText={this.props.typeText}*/}
                        {/*onTypeTextInput={this.handleTypeTextInput}*/}
                        {/*/>*/}
                        <div className="search_type">丢失地区筛选</div>
                        <AreaSearch
                            areaText={this.props.areaText}
                            onAreaTextInput={this.handleAreaTextInput}
                        />
                    </div>
                    <FoundTable
                        foundlistdata={this.state.FoundListData}
                        areaText={this.state.areaText}
                        typeText={this.state.typeText}
                    />
                </div>
                <FooteBar/>
            </div>
        );
    }
}

export default FoundList;