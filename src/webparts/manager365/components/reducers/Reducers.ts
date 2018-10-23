import {
    INodeAction,
    INCREMENT,
    increment,
    CREATE_NODE,
    createNode,
    ADD_CHILD, 
    addChild,
    REMOVE_CHILD,
    removeChild,
    DELETE_NODE,
    deleteNode
} from '../actions/Actions';

export function childIds(state, action: INodeAction){
    switch(action.type){
        case ADD_CHILD: 
            return [...state, action.childId]
        case REMOVE_CHILD:
            return state.filter(id=> id !== action.childId)
        default: 
            return state
    }
}

export function node(state, action: INodeAction) {
    switch (action.type){
        case CREATE_NODE:
            return {
                id: action.nodeId,
                counter: 0,
                childIds: []
            }
        case INCREMENT:
            return {
                ...state,
                counter: state.counter + 1
        }
        case ADD_CHILD:
        case REMOVE_CHILD:
          return {
            ...state,
            childIds: childIds(state.childIds, action)
          }
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
        )
}

export function deleteMany(state, ids){
    state = { ...state };
    ids.forEach(id => delete state[id]);
    return state;
}
  
export default (state = {}, action) => {
    const { nodeId } = action;
    if (typeof nodeId === 'undefined') {
      return state;
    }
  
    if (action.type === DELETE_NODE) {
      const descendantIds = getAllDescendantIds(state, nodeId);
      return deleteMany(state, [ nodeId, ...descendantIds ]);
    }
  
    return {
      ...state,
      [nodeId]: node(state[nodeId], action)
    }
}