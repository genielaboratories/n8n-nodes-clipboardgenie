import { INodeProperties } from "n8n-workflow";

export const itemOperations: INodeProperties[] = [
	{
		displayName: "Operation",
		name: "operation",
		type: "options",
		displayOptions: {
			show: {
				resource: ["item"],
			},
		},
		options: [
			{
				name: "Create Text Item",
				value: "createText",
				description: "Create a new text item in the desktop app",
				action: "Create text item",
			},
		],
		default: "createText",
		noDataExpression: true,
	},
];

export const itemFields: INodeProperties[] = [
	{
		displayName: "Pinboard Name",
		name: "pinboard_name",
		type: "string",
		default: "",
		description:
			"Specify a pinboard name to add the item there. Leave blank to post it on your main board instead.",
		required: true,
		displayOptions: {
			show: {
				resource: ["item"],
				operation: ["createText"],
			},
		},
	},

	{
		displayName: "Show on Main Board",
		name: "show_in_main_pinboard",
		type: "boolean",
		default: false,
		description:
			"Whether the item should also appear on your main board along with the selected pinboard",
		displayOptions: {
			show: {
				resource: ["item"],
				operation: ["createText"],
			},
		},
	},

	{
		displayName: "Text to Send",
		name: "text",
		type: "string",
		default: "",
		description: "The text content for a new item on the selected pinboard",
		required: true,
		displayOptions: {
			show: {
				resource: ["item"],
				operation: ["createText"],
			},
		},
	},

	{
		displayName: "Open Link or Path",
		name: "open_link_or_path",
		type: "string",
		default: "",
		description:
			'Optional URL, file path, or app command associated with the item. When provided, a button will open it directly. Supported formats: https://example.com, file:///Users/name/file.pdf, file://app.name --param value. For paths with spaces, wrap the path in quotes, e.g. "C:\\Program Files\\App\\app.exe" "--flag value"',
		displayOptions: {
			show: {
				resource: ["item"],
				operation: ["createText"],
			},
		},
	},

	{
		displayName: "Show System Notification",
		name: "show_notification",
		type: "boolean",
		default: true,
		description:
			"Whether to display a system notification when a new item is received from n8n",
		displayOptions: {
			show: {
				resource: ["item"],
				operation: ["createText"],
			},
		},
	},

	{
		displayName: "Notification Title",
		name: "notification_title",
		type: "string",
		default: "",
		description:
			"Optional title displayed in the system notification. If not set, a default title will be shown next to the received date and time.",
		displayOptions: {
			show: {
				resource: ["item"],
				operation: ["createText"],
				show_notification: [true],
			},
		},
	},
	{
		displayName: "Notification Message",
		name: "notification_message",
		type: "string",
		default: "",
		description:
			"Optional message text displayed in the body of the system notification",
		displayOptions: {
			show: {
				resource: ["item"],
				operation: ["createText"],
				show_notification: [true],
			},
		},
	},
	{
		displayName: "Close Notification Automatically",
		name: "notification_auto_close",
		type: "boolean",
		default: false,
		description:
			"Whether the notification should close automatically after a short delay",
		displayOptions: {
			show: {
				resource: ["item"],
				operation: ["createText"],
				show_notification: [true],
			},
		},
	},
];
