import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/Actions';
import treeCommons from '../../utility/treeCommons';
import { Icon, Spinner, SpinnerType, SpinnerSize } from 'office-ui-fabric-react';
import { NODE_TYPE } from '../generateTree';

export interface INodeStateProps{
    type:NODE_TYPE;
    id:any;
    counter:any;
    childIds:any;
    client:any;
    url:string;
    urls:string[];
    isPending:false;
    isFulfilled:false;
    isRejected:false;
}

export interface INodeDispatchProps{
    increment(id);
    createNode(payload);
    fetchData(type, nodeId, client, url);
    addChild(id, childId);
}

export class Node extends React.Component<INodeStateProps & INodeDispatchProps> {
    constructor(props){
        super(props);
        this.handleLoadClick = this.handleLoadClick.bind(this);
        this.handleIncrementClick = this.handleIncrementClick.bind(this);
    }

    public renderChild = childId => {
        const { id } = this.props;
        return (
          <ConnectedNode id={childId} parentId={id} client={this.props.client}/>
        );
      }
    
    public render() {
      const iconName = this.getIconName();
      const { childIds, url } = this.props;
      return (
        <div>
          <Icon style={{cursor:'pointer'}} iconName='ExploreContentSingle' onClick={this.handleLoadClick}/>{' '}
          <Icon iconName={iconName} />{' '}
          {url}
          <div style={{marginLeft:'20px'}}>
            {
              this.props.isPending? <Spinner type={SpinnerType.normal} size={SpinnerSize.small}/> : 
              childIds.map(this.renderChild)
            }
          </div>
            
        </div>
      );
    }

    private handleLoadClick(){
        const { fetchData, id, url, type } = this.props;
        fetchData(type, id, this.props.client, url);
    }

    private handleIncrementClick() {
        console.log('handleIncrementClick: '+ this.props);
        const { increment, id } = this.props;
        increment(id);
    }

    private getIconName():string {
      const { type } = this.props;
      let name = '';
      switch (type) {
        case NODE_TYPE.TENANT:{
          name = 'AdminSLogoInverse32';
          break;
        }
        case NODE_TYPE.SITE:{
          name = 'SquareShapeSolid';
          break;
        }
        case NODE_TYPE.WEB:{
          name = 'StatusCircleOuter';
          break;
        }
        case NODE_TYPE.LIST:{
          name = 'StatusTriangleOuter';
          break;
        }
        default: {
          break;
        }
      }

      return name;
    }
}

function mapStateToProps(state, ownProps):INodeStateProps {
    return state[ownProps.id];
  }

  
const ConnectedNode = connect(mapStateToProps, actions)(Node);
export default ConnectedNode;