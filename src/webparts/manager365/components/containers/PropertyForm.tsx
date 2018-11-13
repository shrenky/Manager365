import * as React from 'react';
import { connect } from 'react-redux';
import { NODE_TYPE } from '../generateTree';
import Styles from '../Manager365.module.scss';
import FormEntry from './FormEntry';

export interface IPropertyFormProps{
    type:NODE_TYPE;
    id:number;
    client:any;
    counter:any;
    childIds:any;
    url:string;
    urls:string[];
    isPending:false;
    isFulfilled:false;
    isRejected:false;
    unfold:false;
    isSelected: false;
    properties: any;
}

export interface IPropertyFormStates{

}

export class PropertyForm extends React.Component<IPropertyFormProps, IPropertyFormStates>{
    constructor(props)
    {
        super(props);
    }

    public render(){
        console.log(this.props);
        const { properties } = this.props;
        let entries = [];
        for(let key in properties){
            entries.push({key:key, value: properties[key]});
        }
        console.log(entries);
        return (
            <div> 
                {
                    entries.map(entry=>{
                        return <FormEntry k={entry.key} v={entry.value} />
                    })
                    
                }    
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return state[ownProps.id];
  }

  
const ConnectedForm = connect(mapStateToProps, null)(PropertyForm);
export default ConnectedForm;