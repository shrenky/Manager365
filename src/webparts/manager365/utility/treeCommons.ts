export default class treeCommons{
    public static nextNodeId = 0;
    public static getNextNodeId()
    {
        return ++ treeCommons.nextNodeId;
    }
}