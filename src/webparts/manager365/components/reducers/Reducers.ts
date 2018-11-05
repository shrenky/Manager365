import {
    INodeAction,
    INCREMENT,
    CREATE_NODE,
    ADD_CHILD, 
    REMOVE_CHILD,
    DELETE_NODE,
    FETCH_DATA_FULFILLED,
    FETCH_DATA_PENDING,
    FETCH_DATA_REJECTED,
    FETCH_DATA,
} from '../actions/Actions';
import treeCommons from '../../utility/treeCommons';

export function childIds(state, action: INodeAction){
    switch(action.type){
        case ADD_CHILD: 
            return [...state, action.childId];
        case REMOVE_CHILD:
            return state.filter(id=> id !== action.childId);
        default: 
            return state;
    }
}

export function node(state, action: INodeAction) {
    console.log('in node');
    switch (action.type){
        case CREATE_NODE:
            return {
                id: action.nodeId,
                counter: 0,
                isFulfilled:false,
                isRejected:false,
                url: action.payload.url,
                urls:[],
                childIds: []
            };
        case INCREMENT:
        console.log('in INCREMENT: ' + state);
            return {
                ...state,
                counter: state.counter + 1
        };
        case ADD_CHILD:
        case REMOVE_CHILD:
          return {
            ...state,
            childIds: childIds(state.childIds, action)
          };
        case FETCH_DATA_FULFILLED:
          console.log('Fetch fulfilled: '+ action);
          return{
              ...state,
              isFulfilled: true,
              urls: action.payload,
              childId: []
          };
        case FETCH_DATA_REJECTED:
            console.log('Fetch pending');
            return {
                ...state,
                isRejected: true,
                error: action.payload
            };

        default:
            return state;
    }
}

export function getAllDescendantIds(state, nodeId):any{
    
    state[nodeId].childIds.reduce(
        (acc, childId) => (
            [ ...acc, childId, ...getAllDescendantIds(state, childId) ]
          ), 
          []
        );
}

export function deleteMany(state, ids){
    state = { ...state };
    ids.forEach(id => delete state[id]);
    return state;
}
  
export default (state = {}, action) => {
    console.log('start reducer: ' + action.type, + ' nodeId: ' + action.meta);
    const { nodeId, meta } = action;
    let currentNodeId = nodeId;
    if(meta)
    {
        currentNodeId = meta.nodeId;
    }
    if (typeof currentNodeId === 'undefined') {
      return state;
    }
  
    if (action.type === DELETE_NODE) {
      const descendantIds = getAllDescendantIds(state, currentNodeId);
      return deleteMany(state, [ currentNodeId, ...descendantIds ]);
    }
  console.log('reducer ------ for: ' + state[currentNodeId]);

    if(action.type == FETCH_DATA_FULFILLED){
        console.log('Fetch fulfilled 1: '+ action);
        const urls = action.payload;
        if(urls.length > 0)
        {
            console.log(state);
            const data = createNodesFromUrls(urls);
            const newNodes = data.nodes;
            const ids = data.ids;
            console.log(data);
            const nodeState = state[currentNodeId];
            const childIdsArr = nodeState.childIds;
            const newNodeState = {
                ...nodeState,
                isFulfilled: true,
                urls: action.payload,
                childIds: [...childIdsArr, ...ids]
            };
            return {
                ...state,
                [currentNodeId]: newNodeState,
                ...newNodes
          };
        }
        else
        {
            return state;
        }
          
    }

    return {
      ...state,
      [currentNodeId]: node(state[currentNodeId], action)
    };
};

export function createNodesFromUrls(urls)
{
    let nodes = {};
    let idArr = [];
    urls.forEach(url=>{
        const id = treeCommons.getNextNodeId();
        idArr.push(id);
        nodes[id] = {
            id: id,
            counter: 0,
            isFulfilled:false,
            isRejected:false,
            url: url,
            urls:[],
            childIds: []
        };
    });

    return {nodes:nodes, ids:idArr};
}