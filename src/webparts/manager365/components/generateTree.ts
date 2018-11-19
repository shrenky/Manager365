export enum NODE_TYPE
{
  TENANT,
  SITE,
  WEB,
  LIST
}

export default function generateTree() {
    let serverUrl = `${window.location.protocol}//${window.location.hostname}`;
    let tree = {
      1: {
        id: 1,
        type: NODE_TYPE.TENANT,
        imageUrl: '',
        counter: 0,
        isPending:false,
        isFulfilled:false,
        isRejected:false,
        url: serverUrl,
        title:'',
        urls:[],
        childIds: [],
        unfold: false,
        isSelected: false,

        properties:{}

      }
    };
  
    return tree;

    /* List Properties:
    AllowContentTypes: true
    BaseTemplate: 107
    BaseType: 0
    ContentTypesEnabled: true
    CrawlNonDefaultViews: false
    Created: "2016-11-22T10:28:39Z"
    CurrentChangeToken: {StringValue: "1;3;d20f05c9-19d5-44ca-9aed-b504398e89ef;636771510253300000;60088180"}
    CustomActionElements: {Items: Array(15)}
    DefaultContentApprovalWorkflowId: "00000000-0000-0000-0000-000000000000"
    DefaultItemOpenUseListSetting: false
    Description: "This system library was created by the Publishing feature to store workflow tasks that are created in this site."
    Direction: "none"
    DisableGridEditing: false
    DocumentTemplateUrl: null
    DraftVersionVisibility: 0
    EnableAttachments: true
    EnableFolderCreation: false
    EnableMinorVersions: false
    EnableModeration: false
    EnableRequestSignOff: true
    EnableVersioning: false
    EntityTypeName: "WorkflowTasks_x0020_1"
    ExemptFromBlockDownloadOfNonViewableFiles: false
    FileSavePostProcessingEnabled: false
    ForceCheckout: false
    HasExternalDataSource: false
    Hidden: false
    Id: "d20f05c9-19d5-44ca-9aed-b504398e89ef"
    ImagePath: {DecodedUrl: "/_layouts/15/images/ittask.png?rev=44"}
    ImageUrl: "/_layouts/15/images/ittask.png?rev=44"
    IrmEnabled: false
    IrmExpire: false
    IrmReject: false
    IsApplicationList: false
    IsCatalog: false
    IsPrivate: false
    ItemCount: 0
    LastItemDeletedDate: "2016-11-22T10:28:39Z"
    LastItemModifiedDate: "2016-11-22T10:28:39Z"
    LastItemUserModifiedDate: "2016-11-22T10:28:39Z"
    ListExperienceOptions: 0
    ListItemEntityTypeFullName: "SP.Data.WorkflowTasks_x0020_1Item"
    MajorVersionLimit: 0
    MajorWithMinorVersionsLimit: 0
    MultipleDataList: false
    NoCrawl: true
    ParentWebPath: {DecodedUrl: "/sites/dev"}
    ParentWebUrl: "/sites/dev"
    ParserDisabled: false
    ServerTemplateCanCreateFolders: true
    TemplateFeatureId: "00bfea71-a83e-497e-9ba0-7a5c597d0107"
    Title: "Workflow Tasks 1"
    
    */

    /*for (let i = 1; i < 10; i++) {
      let parentId = Math.floor(Math.pow(Math.random(), 2) * i);
      tree[i] = {
        id: i,
        counter: 0,
        childIds: []
      };
      tree[parentId].childIds.push(i);
    }*/
  
  }