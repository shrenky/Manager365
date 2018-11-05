export default function generateTree() {
    let serverUrl = `${window.location.protocol}//${window.location.hostname}`;
    let tree = {
      0: {
        id: 0,
        type: 'tenant',
        counter: 0,
        isFulfilled:false,
        isRejected:false,
        url: serverUrl,
        urls:[],
        childIds: []
      }
    };
  
    /*for (let i = 1; i < 10; i++) {
      let parentId = Math.floor(Math.pow(Math.random(), 2) * i);
      tree[i] = {
        id: i,
        counter: 0,
        childIds: []
      };
      tree[parentId].childIds.push(i);
    }*/
  
    return tree;
  }