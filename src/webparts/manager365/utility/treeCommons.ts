export default class treeCommons{
    public static nextNodeId = 1;
    public static getNextNodeId()
    {
        return ++ treeCommons.nextNodeId;
    }
}