import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from "n8n-workflow";
import { NodeConnectionTypes, NodeOperationError } from "n8n-workflow";
import { itemFields, itemOperations } from "./operations/ItemDescription";
import {
	notificationFields,
	notificationOperations,
} from "./operations/NotificationDescription";

import { clipboardGenieApiRequest } from "./shared/transport";

export class ClipboardGenie implements INodeType {
	description: INodeTypeDescription = {
		displayName: "Clipboard Genie",
		name: "clipboardGenie",
		icon: "file:ClipboardGenie.svg",
		group: ["input"],
		version: 1,
		description:
			"Integrate n8n with the ClipboardGenie app to send and receive clipboard data between your desktop and workflows.",
		defaults: {
			name: "Clipboard Genie",
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		usableAsTool: true,

		// --- CREDENTIALS CONFIGURATION ---
		credentials: [
			{
				name: "clipboardGenieApi",
				required: true,
				displayOptions: {
					show: {
						authentication: ["clipboardGenieApi"],
					},
				},
			},
		],

		// --- MAIN PROPERTIES CONFIGURATION ---
		properties: [
			// Authentication selector
			{
				displayName: "Authentication",
				name: "authentication",
				type: "options",
				options: [
					{
						name: "Access Token",
						value: "clipboardGenieApi",
					},
				],
				default: "clipboardGenieApi",
			},

			// Resource selector
			{
				displayName: "Resource",
				name: "resource",
				type: "options",
				options: [
					{ name: "Item", value: "item" },
					{
						name: "Notification",
						value: "notification",
					},
				],
				default: "item",
				required: true,
				noDataExpression: true,
			},

			// Import operations and fields for "Notification"
			...itemOperations,
			...itemFields,
			...notificationOperations,
			...notificationFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				// Read current selection
				const resource = this.getNodeParameter("resource", i) as string;
				const operation = this.getNodeParameter("operation", i) as string;

				// Prepare data for API call
				let responseData: IDataObject | IDataObject[];

				// === NOTIFICATION: SHOW ===
				if (resource === "notification" && operation === "show") {
					const notification_message = this.getNodeParameter(
						"notification_message",
						i,
					) as string;

					// Get optional fields from Additional Fields collection
					const additionalFields = this.getNodeParameter(
						"additionalFields",
						i,
						{},
					) as IDataObject;

					const body: IDataObject = {
						notification_title: additionalFields.notification_title ?? "",
						notification_message,
						open_link_or_path: additionalFields.open_link_or_path ?? "",
						notification_auto_close:
							additionalFields.notification_auto_close ?? false,
					};

					responseData = await clipboardGenieApiRequest.call(
						this,
						"POST",
						"/sendnotification",
						{},
						body,
					);
				}

				// === ITEM: CREATE TEXT ITEM ===
				else if (resource === "item" && operation === "createText") {
					const pinboard_name = this.getNodeParameter(
						"pinboard_name",
						i,
					) as string;
					const text = this.getNodeParameter("text", i) as string;

					// Get optional fields from Additional Fields collection
					const additionalFields = this.getNodeParameter(
						"additionalFields",
						i,
						{},
					) as IDataObject;

					const body: IDataObject = {
						pinboard_name,
						text,
						show_in_main_pinboard:
							additionalFields.show_in_main_pinboard ?? false,
						show_notification: additionalFields.show_notification ?? true,
						notification_title: additionalFields.notification_title ?? "",
						notification_message: additionalFields.notification_message ?? "",
						open_link_or_path: additionalFields.open_link_or_path ?? "",
						notification_auto_close:
							additionalFields.notification_auto_close ?? false,
					};

					responseData = await clipboardGenieApiRequest.call(
						this,
						"POST",
						"/sendtextaction",
						{},
						body,
					);
				}

				// === UNKNOWN OPERATION ===
				else {
					throw new NodeOperationError(
						this.getNode(),
						`The operation "${operation}" is not supported for resource "${resource}".`,
					);
				}

				// Push results
				const executionItem = {
					json: responseData as IDataObject,
				};
				returnData.push(executionItem);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: (error as Error).message },
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
