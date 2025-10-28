# n8n-nodes-clipboardgenie

This is an n8n community node. It allows you to connect **Clipboard Genie** with your n8n workflows.

**Clipboard Genie** is a modern Windows clipboard manager with pinboards, advanced search, and desktop notifications.
With this node, you can send text items directly to the app or trigger desktop notifications from your workflows.


> This is a community-contributed node. It is not affiliated with or maintained by n8n GmbH.


- [Installation](#installation)
- [Operations](#operations)
- [Credentials](#credentials)
- [Compatibility](#compatibility)
- [Usage](#usage)
- [Resources](#resources)
- [Version history](#version-history)

---

## Installation

Follow the [community node installation guide](https://docs.n8n.io/integrations/community-nodes/installation/).

```bash
# Inside your n8n instance
npm install n8n-nodes-clipboardgenie
```

After installation, restart n8n to load the new node.

---

## Operations

This node provides two resources:

### 🗂️ Resource: Item

**Operation: Create Text Item**

Creates a new text item in your Clipboard Genie desktop app.
You can choose the pinboard where the item will appear, optionally show it on the main board, and display a system notification.

#### Parameters

| Name                                 | Type    | Required    | Default | Description                                                                                                                                                                                                                                                                                                                                          |
| ------------------------------------ | ------- | ----------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pinboard Name**                    | String  | ✅ Yes       | `""`    | Specify the pinboard name where the item will be added.                                                                                                                                                                                                                                                                                              |
| **Show on Main Board**               | Boolean | No          | `false` | Also display the item on your main board.                                                                                                                                                                                                                                                                                                            |
| **Text to Send**                     | String  | ✅ Yes       | `""`    | The text content of the new item.                                                                                                                                                                                                                                                                                                                    |
| **Open Link or Path**                | String  | No          | `""`    | Optional URL, file path, or command associated with the item. When provided, a button in the app will open it directly.<br>Supported formats: `https://example.com`, `file:///Users/name/file.pdf`, `file://app.name --param value`.<br>For Windows paths with spaces, wrap them in quotes, e.g. `"C:\\Program Files\\App\\app.exe" "--flag value"`. |
| **Show System Notification**         | Boolean | No          | `true`  | Display a desktop notification when the item is received.                                                                                                                                                                                                                                                                                            |
| **Notification Title**               | String  | Conditional | `""`    | Optional title displayed in the notification (only shown if notifications are enabled).                                                                                                                                                                                                                                                              |
| **Notification Message**             | String  | Conditional | `""`    | Optional body text for the notification.                                                                                                                                                                                                                                                                                                             |
| **Close Notification Automatically** | Boolean | Conditional | `false` | Automatically close the notification after a short delay.                                                                                                                                                                                                                                                                                            |

---

### 🔔 Resource: Notification

**Operation: Show**

Displays a native desktop notification with an optional title, message, and “Open” button.

#### Parameters

| Name                     | Type    | Required | Default | Description                                                                             |
| ------------------------ | ------- | -------- | ------- | --------------------------------------------------------------------------------------- |
| **Notification Title**   | String  | No       | `""`    | Optional title. If not set, a default title will appear.                                |
| **Notification Message** | String  | ✅ Yes    | `""`    | Main content of the notification.                                                       |
| **Open Link or Path**    | String  | No       | `""`    | Optional URL, file path, or app command. When provided, a button will open it directly. |
| **Auto Close**           | Boolean | No       | `false` | Automatically close the notification after a short delay.                               |

---

## Credentials

### 🔑 API Key Authentication

Clipboard Genie uses API key authentication for all n8n integrations.

1. In the Clipboard Genie desktop app, go to
   **Settings → Extensions → n8n**
2. Click **Generate API Key**.
3. Copy the generated key and paste it into the **API Key** field in your n8n credentials for Clipboard Genie.
4. The node will automatically send it using:

   ```
   Authorization: Bearer <API_KEY>
   ```

---

## Compatibility

* **n8n version:** ≥ 1.x (supports community nodes)
* **Clipboard Genie:** latest desktop version with n8n extension
* **Platform:** Windows desktop (notifications and pinboards handled by the app)

---

## Usage

### ▶️ Example 1: Create a Text Item

1. Add a new node: **Clipboard Genie → Item → Create Text Item**
2. Fill in the required fields:

   * *Pinboard Name*
   * *Text to Send*
3. (Optional) Enable **Show System Notification** to alert the user when the item is added.
4. Execute the workflow.
   The text will appear in the selected pinboard in Clipboard Genie desktop application.

---

### ▶️ Example 2: Show a Desktop Notification

1. Add a node: **Clipboard Genie → Notification → Show**
2. Provide a *Notification Message* (required).
3. Optionally set:

   * *Notification Title*
   * *Open Link or Path*
   * *Auto Close*
4. Run the workflow.
   The user will receive a native desktop notification with the specified content and actions.

---

## Resources

* [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/#community-nodes)
* [Clipboard Genie Website](https://clipboardgenie.com)
* [GitHub Repository & Issues](https://github.com/genielaboratories/n8n-nodes-clipboardgenie/issues) — report bugs or suggest new features

---

## Version history

| Version   | Changes                                                                                    |
| --------- | ------------------------------------------------------------------------------------------ |
| **0.1.0** | Initial release with two operations:<br>– Item → Create Text Item<br>– Notification → Show |

---
