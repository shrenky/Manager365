import { Text }                                                 	from '@microsoft/sp-core-library';
import { SPHttpClient, ISPHttpClientOptions, SPHttpClientResponse } from '@microsoft/sp-http';
import { IWebBasicInfo } from './Common';

export class WebService {

	/***************************************************************************
     * The spHttpClient object used for performing REST calls to SharePoint
     ***************************************************************************/
    private spHttpClient: SPHttpClient;


	/**************************************************************************************************
     * Constructor
     * @param httpClient : The spHttpClient required to perform REST calls against SharePoint
     **************************************************************************************************/
    constructor(spHttpClient: SPHttpClient) {
        this.spHttpClient = spHttpClient;
    }

    public getSubWebFromWeb(webUrl: string): Promise<IWebBasicInfo[]> {
        return new Promise<IWebBasicInfo[]>((resolve,reject) => {
			let endpoint = Text.format("{0}/_api/web/webs", webUrl);
			this.spHttpClient.get(endpoint, SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {
				if(response.ok) {
					response.json().then((data: any) => {
						console.log('get webs: ' + data);
						let webInfos:IWebBasicInfo[] = data.value.map((web) => { return { title: web.Title, url: web.Url }; });
						resolve(webInfos.sort((a,b) => { return Number(a.title > b.title); }));
					})
					.catch((error) => { reject(error); });
				}
				else {
					reject(response);
				}
			})
			.catch((error) => { reject(error); }); 
        });
    }

}