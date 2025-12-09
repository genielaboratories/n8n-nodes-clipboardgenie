import type { INodeProperties } from "n8n-workflow";

export const notificationOperations: INodeProperties[] = [
	{
		displayName: "Operation",
		name: "operation",
		type: "options",
		displayOptions: {
			show: {
				resource: ["notification"],
			},
		},
		options: [
			{
				name: "Show",
				value: "show",
				description:
					"Displays a system notification on your desktop with an optional title and message",
				action: "Show notification",
			},
		],
		default: "show",
		noDataExpression: true,
	},
];

export const notificationFields: INodeProperties[] = [
	{
		displayName: "Notification Message",
		name: "notification_message",
		type: "string",
		default: "",
		description: "Main content of the notification",
		required: true,
		displayOptions: {
			show: {
				resource: ["notification"],
				operation: ["show"],
			},
		},
	},

	// Additional Fields collection for optional parameters
	{
		displayName: "Additional Fields",
		name: "additionalFields",
		type: "collection",
		placeholder: "Add Field",
		default: {},
		displayOptions: {
			show: {
				resource: ["notification"],
				operation: ["show"],
			},
		},
		options: [
			{
				displayName: "Notification Title",
				name: "notification_title",
				type: "string",
				default: "",
				placeholder: "Optional title",
				description:
					"Optional title displayed in the system notification. If not set, a default title will be shown next to the received date and time.",
			},
			{
				displayName: "Open Link or Path",
				name: "open_link_or_path",
				type: "string",
				default: "",
				description:
					'Optional URL, file path, or app command associated with the item. When provided, a button will open it directly. Supported formats: https://example.com, file:///Users/name/file.pdf, file://app.name --param value. For paths with spaces, wrap the path in quotes, e.g. "C:\\Program Files\\App\\app.exe" "--flag value".',
			},
			{
				displayName: "Auto Close",
				name: "notification_auto_close",
				type: "boolean",
				default: false,
				description:
					"Whether the notification should close automatically after a short delay",
			},
		],
	},
];
