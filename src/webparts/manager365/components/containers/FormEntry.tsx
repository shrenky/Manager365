import * as React from 'react';

export interface IFormEntryProps{
    k:string;
    v:any;
}

export default class FormEntry extends React.Component<IFormEntryProps>{
    constructor(props)
    {
        super(props);
    }

    public render(){
        const {k, v} = this.props;
        console.log('Render:');
        console.log(k+'=>'+v);
        return (
            <div style={{display: 'table-row'}}>
                <div style={{display: 'table-cell'}}>
                    {k}
                </div>
                <div style={{display: 'table-cell'}}>
                    {v ? v.toString() : 'null'}
                </div>
            </div>
        )
    }
}