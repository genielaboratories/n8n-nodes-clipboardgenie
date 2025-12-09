import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	Icon,
	INodeProperties,
} from "n8n-workflow";

export class ClipboardGenieApi implements ICredentialType {
	name = "clipboardGenieApi";

	displayName = "Clipboard Genie API";

	documentationUrl = "https://api.clipboardgenie.com/api/doc";

	icon: Icon = "file:../nodes/ClipboardGenie/ClipboardGenie.svg";

	properties: INodeProperties[] = [
		{
			displayName: "Access Token",
			name: "accessToken",
			type: "string",
			typeOptions: { password: true },
			default: "",
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: "generic",
		properties: {
			headers: {
				Authorization: "=Bearer {{$credentials.accessToken}}",
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: "https://api.clipboardgenie.com/api",
			url: "/n8n/me",
			method: "GET",
		},
	};
}
