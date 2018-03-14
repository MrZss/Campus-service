import React from 'react';
import ReactDOM from 'react-dom';
import '../../../css/index.css'
import FoundRow from './foundrow.js'

class FoundTable extends React.Component {
    constructor(props) {
        super(props);

    };



    render() {
        var rows = [];
        if(this.props.foundlistdata.results == undefined){
        }else{
            this.props.foundlistdata.results.forEach((goodsdata) => {
                if(this.props.areaText == '全部'){
                    rows.push(<FoundRow goodsdata={goodsdata} key={goodsdata.id}/>)
                }else{
                    if(goodsdata.area ==this.props.areaText ){
                        rows.push(<FoundRow goodsdata={goodsdata} key={goodsdata.id}/>)
                    }
                }
                
            });
        }
        return (
            <div className="found_table">
                <div >
                   {rows}
                </div>
            </div>


        );
    }
}

export default FoundTable;