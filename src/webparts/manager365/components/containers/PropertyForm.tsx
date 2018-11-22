import * as React from 'react';
import { connect } from 'react-redux';
import { NODE_TYPE } from '../generateTree';
import Styles from '../Manager365.module.scss';
import FormEntry from './FormEntry';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';

export interface IPropertyFormProps{
    type:NODE_TYPE;
    id:number;
    client:any;
    counter:any;
    childIds:any;
    url:string;
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
    private _items: IProperty[] = [];
    private _columns: IColumn[] = [];
    private _selection: Selection;
  
    constructor(props)
    {
        super(props);
        this._onColumnClick = this._onColumnClick.bind(this);
        this._onChangeText = this._onChangeText.bind(this);
        this._onItemInvoked = this._onItemInvoked.bind(this);
    }

    public render(){
        console.log('render property');
        this._items = [];
        if (this._items.length === 0) {
            console.log(this.props);
            const { properties } = this.props;
            if(properties)
            {
                let i: number = 1;
                for(let key in properties){
                    const v = properties[key];

                    this._items.push({key: i++, name:key, value: v ? v.toString() : 'null'});
                }
            }
            
        }

        console.log(this._items);

        this._columns = [
            {
              key: 'column1',
              name: 'Name',
              fieldName: 'name',
              minWidth: 20,
              maxWidth: 200,
              isResizable: true
            },
            {
                key: 'column2',
                name: 'Value',
                fieldName: 'value',
                minWidth: 20,
                maxWidth: 600,
                isResizable: true
            }
          ];
        console.log(this._columns);
        return (
            <div> 
                <TextField label="Filter by name:" onChange={this._onChangeText} />
                <DetailsList
                    items={this._items}
                    columns={this._columns}
                    selectionMode={SelectionMode.none}
                    setKey="set"
                    layoutMode={DetailsListLayoutMode.fixedColumns}
                    isHeaderVisible={true}
                />
            </div>
        );
    }

    private _onColumnClick(){
        console.log('_onColumnClick');
    }

    private _onChangeText(){
        console.log('_onChangeText');
    }

    private _onItemInvoked(){
        console.log('_onItemInvoked');
    }
}

function mapStateToProps(state, ownProps) {
    return state[ownProps.id];
  }


export interface IProperty{
    [key: string]: any;
    name:string;
    value:string;
}

const ConnectedForm = connect(mapStateToProps, null)(PropertyForm);
export default ConnectedForm;