import {
	IDataObject,
	IExecuteFunctions,
	IExecuteSingleFunctions,
	IHookFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	ILoadOptionsFunctions,
} from "n8n-workflow";

/**
 * Makes an authenticated request to the Clipboard Genie API.
 */
export async function clipboardGenieApiRequest(
	this:
		| IHookFunctions
		| IExecuteFunctions
		| IExecuteSingleFunctions
		| ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	resource: string,
	qs: IDataObject = {},
	body: IDataObject | undefined = undefined,
) {
	const options: IHttpRequestOptions = {
		method,
		url: `https://api.clipboardgenie.com/api/n8n${resource}`,
		qs,
		body,
		json: true,
	};

	// Select the credential type based on your node's credentials name
	const credentialType = "clipboardGenieApi";

	return this.helpers.httpRequestWithAuthentication.call(
		this,
		credentialType,
		options,
	);
}
