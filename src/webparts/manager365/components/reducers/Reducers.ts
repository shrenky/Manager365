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
    FOLD_UNFOLD,
    SELECT_NODE,
    LOAD_PROPERTIES_FULFILLED
} from '../actions/Actions';
import treeCommons from '../../utility/treeCommons';
import { NODE_TYPE } from '../generateTree';

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
        case FOLD_UNFOLD:
            return {
                ...state,
                unfold: !state.unfold
            };
        case FETCH_DATA_PENDING:
            return{
                ...state,
                isPending:true,
                isFulfilled: false,
                isRejected: false,
                childIds: []
            };
        case FETCH_DATA_FULFILLED:
            return{
                ...state,
                isPending:false,
                isFulfilled: true,
                isRejected: false,
                childIds: []
            };
        case FETCH_DATA_REJECTED:
            return {
                ...state,
                isPending:false,
                isFulfilled: false,
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

    if(action.type === SELECT_NODE)
    {
        const lastSelectedNode = state[0];
        let lastSelectedNodeId = 0;
        const selectedNode = state[currentNodeId];
        if(lastSelectedNode != undefined)
        {
            lastSelectedNodeId = lastSelectedNode.id;

            return {
                ...state,
                0:{...selectedNode, isSelected:true},
                [currentNodeId]:{...selectedNode, isSelected:true},
                [lastSelectedNodeId]: {...lastSelectedNode, isSelected:false}
            }
        }
        else
        {
            return {
                ...state,
                0:{...selectedNode, isSelected:true},
                [currentNodeId]:{...selectedNode, isSelected:true}
            }
        }
        
    }
    
    console.log('reducer ------ for: ' + state[currentNodeId]);


    //handle actions for propertyform, needs to be in seperate reducer
    if(action.type == LOAD_PROPERTIES_FULFILLED)
    {
        console.log('Load fulfilled: '+action);
        let selectedNode = state[0];
        return {
            ...state,
            0: {...selectedNode, properties:action.payload},
            [currentNodeId]:{...selectedNode, properties:action.payload}
        }
    }


    if(action.type == FETCH_DATA_FULFILLED){
        console.log('Fetch fulfilled 1: '+ action);
        const children = action.payload;
        if(children.length > 0)
        {
            console.log(state);
            const nodePros = state[currentNodeId];
            const childIdsArr = nodePros.childIds;
            const data = createChildNodes(nodePros.type, children, state[currentNodeId]);
            const newNodes = data.nodes;
            const ids = data.ids;
            console.log(data);
            const newNodeState = {
                ...nodePros,
                isPending: false,
                isFulfilled: true,
                isRejected: false,
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

export function createChildNodes(type, children, parentNode)
{
    let nodes = {};
    let idArr = [];
    let nodeType = type;
    if(nodeType == NODE_TYPE.TENANT)
    {
        nodeType = NODE_TYPE.SITE;
        children.forEach(child=>{
            const id = treeCommons.getNextNodeId();
            idArr.push(id);
            nodes[id] = {
                id: id,
                type: nodeType,
                imageUrl: '',
                counter: 0,
                isFulfilled:false,
                isRejected:false,
                parentUrl: '',
                url: child.url,
                title: child.title,
                childIds: []
            };
        });
    }
    else if(nodeType == NODE_TYPE.SITE)
    {
        nodeType = NODE_TYPE.WEB;
        children.forEach(child=>{
            const id = treeCommons.getNextNodeId();
            idArr.push(id);
            nodes[id] = {
                id: id,
                type: nodeType,
                imageUrl: '',
                counter: 0,
                isFulfilled:false,
                isRejected:false,
                parentUrl:'',
                url: child.url,
                title: child.title,
                childIds: []
            };
        });
    }
    else if(nodeType == NODE_TYPE.WEB)
    {
        nodeType = NODE_TYPE.LIST;
        children.forEach(child=>{
            const fieldsNodeId = treeCommons.getNextNodeId();
            nodes[fieldsNodeId] = {
                id: fieldsNodeId,
                type: NODE_TYPE.FIELDCOLLECTION,
                imageUrl: parentNode.url+child.imageUrl,
                counter: 0,
                isFulfilled:false,
                isRejected:false,
                parentUrl:child.parentUrl,
                url: child.title,
                title: 'Fields',
                childIds: []
            };
            const viewsNodeId = treeCommons.getNextNodeId();
            nodes[viewsNodeId] = {
                id: viewsNodeId,
                type: NODE_TYPE.VIEWCOLLECTION,
                imageUrl: parentNode.url+child.imageUrl,
                counter: 0,
                isFulfilled:false,
                isRejected:false,
                parentUrl:child.parentUrl,
                url: child.title,
                title: 'Views',
                childIds: []
            };
            const id = treeCommons.getNextNodeId();
            idArr.push(id);
            nodes[id] = {
                id: id,
                type: nodeType,
                imageUrl: parentNode.url+child.imageUrl,
                counter: 0,
                isFulfilled:false,
                isRejected:false,
                url: child.title,
                title: child.title,
                childIds: [fieldsNodeId, viewsNodeId]
            };
        });
    }
    else if(nodeType == NODE_TYPE.FIELDCOLLECTION)
    {
        nodeType = NODE_TYPE.FIELD;
        children.forEach(child=>{
            const id = treeCommons.getNextNodeId();
            idArr.push(id);
            nodes[id] = {
                id: id,
                type: nodeType,
                imageUrl: '',
                counter: 0,
                isFulfilled:false,
                isRejected:false,
                parentUrl:'',
                url: child.title,
                title: child.title,
                childIds: []
            };
        });
    }
    else if(nodeType == NODE_TYPE.VIEWCOLLECTION)
    {
        nodeType = NODE_TYPE.VIEW;
        children.forEach(child=>{
            const id = treeCommons.getNextNodeId();
            idArr.push(id);
            nodes[id] = {
                id: id,
                type: nodeType,
                imageUrl: '',
                counter: 0,
                isFulfilled:false,
                isRejected:false,
                parentUrl:'',
                url: child.title,
                title: child.title,
                childIds: []
            };
        });
    }
    else {}

    

    return {nodes:nodes, ids:idArr};
}