import React from 'react';
import ReactDOM from 'react-dom';
import '../../../css/index.css'
import LostRow from './lostrow.js'

class LostTable extends React.Component {
    constructor(props, context) {
        super(props, context);

    };

    render() {
        var rows = [];
        if(this.props.goodlistdata.results == undefined){
        }else{
            this.props.goodlistdata.results.forEach((goodsdata) => {
                if(this.props.areaText == '全部'){
                    rows.push(<LostRow goodsdata={goodsdata} key={goodsdata.id}/>)
                }else{
                    if(goodsdata.area ==this.props.areaText ){
                        rows.push(<LostRow goodsdata={goodsdata} key={goodsdata.id}/>)
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

export default LostTable;