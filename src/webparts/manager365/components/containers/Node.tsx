import * as React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/Actions';

export interface INodeStateProps{
    type:string;
    id:any;
    counter:any;
    childIds:any;
    client:any;
    url:string;
    urls:string[];
}

export interface INodeDispatchProps{
    increment(id);
    createNode();
    fetchData(nodeId, client, url);
    addChild(id, childId);
}

export class Node extends React.Component<INodeStateProps & INodeDispatchProps> {
    constructor(props){
        super(props);
        this.handleLoadClick = this.handleLoadClick.bind(this);
        this.handleIncrementClick = this.handleIncrementClick.bind(this);
        this.handleAddChildClick = this.handleAddChildClick.bind(this);
    }

    renderChild = childId => {
        const { id } = this.props
        return (
          <li key={childId}>
            <ConnectedNode id={childId} parentId={id} />
          </li>
        )
      }
    
    render() {
      console.log(this.props);
      const { counter, childIds, urls } = this.props
      return (
        <div>
          Counter: {counter}
          {' '}
          <button onClick={this.handleIncrementClick}>
            +
          </button>
          {' '}
          <button onClick={this.handleLoadClick}>
            Load
          </button>
          {' '}
          
          <ul>
            {
              childIds.map(this.renderChild)
            }
            <li key="add">
              <a href="#" // eslint-disable-line jsx-a11y/anchor-is-valid
                onClick={this.handleAddChildClick}
              >
                Add child
              </a>
            </li>
          </ul>
          {
            
          }
        </div>
      )
    }

    private handleLoadClick(){
      //this.context.dispatch(actions.fetchData(this.props.client, 'https://sharepointboost.sharepoint.com'));
      console.log(actions);
      const { fetchData, id, url} = this.props;
      fetchData(id, this.props.client, url);
    }

    private handleIncrementClick() {
        console.log('handleIncrementClick: '+ this.props);
        const { increment, id } = this.props;
        increment(id);
        setTimeout(()=>{
          this.context.dispatch(increment(id))
        }, 5000);
    }

    private handleAddChildClick(e){
        e.preventDefault();
        const { addChild, createNode, id } = this.props;
        const childId = createNode().nodeId;
        addChild(id, childId);
    }
}

function mapStateToProps(state, ownProps):INodeStateProps {
    return state[ownProps.id]
  }

  
const ConnectedNode = connect(mapStateToProps, actions)(Node)
export default ConnectedNode