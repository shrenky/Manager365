import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/Actions';
import { Icon, Spinner, SpinnerType, SpinnerSize } from 'office-ui-fabric-react';
import { NODE_TYPE } from '../generateTree';
import Styles from '../Manager365.module.scss';

export interface INodeStateProps{
    type:NODE_TYPE;
    id:any;
    imageUrl:string;
    counter:any;
    childIds:any;
    client:any;
    url:string;
    title:string;
    urls:string[];
    isPending:false;
    isFulfilled:false;
    isRejected:false;
    unfold:false;
    isSelected: false;
}

export interface INodeDispatchProps{
    increment(id);
    createNode(payload);
    fetchData(type, nodeId, client, url);
    addChild(id, childId);
    fold_unfold(id);
    select_node(id);
    load_properties(type, nodeId, client, url);
}

export class Node extends React.Component<INodeStateProps & INodeDispatchProps> {
    constructor(props){
        super(props);
        this.handleLoadClick = this.handleLoadClick.bind(this);
        this.handleIncrementClick = this.handleIncrementClick.bind(this);
        this.onNodeSelected = this.onNodeSelected.bind(this);
    }

    public renderChild = childId => {
      const { id } = this.props;
      return (
        <ConnectedNode id={childId} parentId={id} client={this.props.client}/>
      );
    }
    
    public render() {
      const icon = this.getIcon();
      const { childIds, url, title,  unfold, isSelected } = this.props;
      return (
        <div>
          <Icon style={{cursor:'pointer'}} iconName={unfold ? 'CollapseContentSingle' : 'ExploreContentSingle'} onClick={this.handleLoadClick}/>{' '}
          { icon }{' '}
          {<label className={isSelected ? Styles.Manager365SelectedNode : Styles.Manager365UnSelectedNode} onClick={this.onNodeSelected}>{url == '' ? title: url}</label>}
          <div className={unfold ? Styles.Manager365UnFold : Styles.Manager365Fold}>
            {
              this.props.isPending? <Spinner type={SpinnerType.normal} size={SpinnerSize.small}/> : 
              childIds.map(this.renderChild)
            }
          </div>
            
        </div>
      );
    }

    private onNodeSelected(){
      const { id, type, url, select_node, load_properties } = this.props;
      select_node(id);
      load_properties(type, id, this.props.client, url);
    }

    private handleLoadClick(){
        const { fetchData, id, url, type, isPending, isFulfilled, isRejected, fold_unfold } = this.props;
        if(!(isPending || isFulfilled || isRejected))
        {
          fetchData(type, id, this.props.client, url);
        }
        
        fold_unfold(id);
    }

    private handleIncrementClick() {
        console.log('handleIncrementClick: '+ this.props);
        const { increment, id } = this.props;
        increment(id);
    }

    private getIcon():any {
      const { type, imageUrl } = this.props;
      let name = '';
      switch (type) {
        case NODE_TYPE.TENANT:{
          name = 'AdminSLogoInverse32';
          return <Icon iconName={name} />
        }
        case NODE_TYPE.SITE:{
          name = 'AdminSLogoInverse32';
          return <Icon iconName={name} />
        }
        case NODE_TYPE.WEB:{
          name = 'AdminSLogoInverse32';
          return <Icon iconName={name} />
        }
        case NODE_TYPE.LIST:{
          return <img src={imageUrl} />
        }
        default: {
          break;
        }
      }

      return <Icon iconName={name} />;
    }
}

function mapStateToProps(state, ownProps):INodeStateProps {
    return state[ownProps.id];
  }

  
const ConnectedNode = connect(mapStateToProps, actions)(Node);
export default ConnectedNode;