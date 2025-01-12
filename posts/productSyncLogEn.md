# Product Sync Log: A Comprehensive Guide

## Table of Contents
1. [Accessing the Product Sync Log](#1-accessing-the-product-sync-log)
2. [Search Panel](#2-search-panel)
3. [User Management Panel](#3-user-management-panel)
4. [Log Customization Panel](#4-log-customization-panel)
5. [Display Settings Panel](#5-display-settings-panel)
6. [Plugin Information](#6-plugin-information)
7. [Diagnose Panel](#7-diagnose-panel)
8. [Product Sync Meta Box](#8-product-sync-meta-box)


## 1. Accessing the Product Sync Log
### Location:
![Product Sync Log Location](/images/blog/productSyncLog/1.jpg)
- The Products menu is located in the WordPress admin sidebar, typically represented by a folder icon labeled "Products."
- It is directly under the main WooCommerce menu item.
![Product Sync Log Location](/images/blog/productSyncLog/2.jpg)

### Accessing the Product Sync Log:
1. Hover over the "Products" menu in the sidebar.
2. Look for "Product Sync Log" in the submenu that appears.
3. Click on "Product Sync Log" to access the synchronization history.
4. You must have " Change Settings" permission to access this panel

### Bottom Navigation:
- Color Theme Selector: Dots for selecting the interface color theme.
- Home Icon: Returns to the main page.

## 2. Search Panel
![Product Sync Log Location](/images/blog/productSyncLog/3.jpg)

### Overview 
The Search Panel provides comprehensive search functionality for product sync logs, allowing users to filter and locate specific log entries using multiple criteria.

### Important Warning:
- You must have appropriate "Search" permissions to access this panel
- You must have appropriate "Delete" permissions to delete logs
- Large search results may be limited by system settings for performance
- Date ranges should be within the log retention period

### Accessing the Panel
- Located within the Product Sync Log plugin interface
- "Back" button available for returning to the previous page
- Centered "Search" title indicates current location

### Search Interface Components

#### Search Criteria Fields
1. Log Text 
   - Free-text search within log content
   - Supports partial text matching
   - Case-insensitive search

2. User Identification 
   - Search by username or display name
   - Partial name matching supported
   - Matches against user database

3. Product Information 
   - Product number/ID search field
   - Supports exact and partial matching
   - Links to product details

4. Time and Order Controls 
   - Date range selection (Start/End dates)
   - Support for multiple calendar formats
   - Order selection (Newest/Oldest first)

5. Result Limitation 
   - Numerical input for maximum results
   - Default value: 100 entries
   - Adjustable based on needs

### Results Display
![Product Sync Log Location](/images/blog/productSyncLog/4.jpg)

#### Table Structure
1. Header Section 
   - Bulk selection checkbox
   - Action controls

2. Data Columns 
   - Selection checkbox
   - Row number
   - Product Code (clickable)
   - Changes (previous/new values)
   - Modification Date
   - Username
   - Notes
   - Action buttons

3. Footer Section 
   - Pagination controls
   - Results count display
   - Bulk action controls

### Interactive Features

#### Row Operations
1. Selection Options 
   - Individual row selection
   - Bulk selection toggle
   - Multiple row selection

2. Product Links 
   - Click to open product editor
   - New tab navigation
   - Hover preview available
![Product Sync Log Location](/images/blog/productSyncLog/5.jpg)
3. Detail View 
   - Modal dialog for full details
   - Expanded change information
   - Complete log entry data

### Data Management

#### Deletion Controls
1. Individual Deletion 
   - Per-row delete button
   - Confirmation required
   - Permission-based access

2. Bulk Deletion 
   - Multiple row selection
   - Batch processing
   - Safety confirmations

### Best Practices
1. Efficient Searching 
   - Use minimal necessary criteria
   - Combine fields for precision
   - Clear unused filters

2. Result Management 
   - Review results before bulk actions
   - Verify deletions carefully
   - Export important data before deletion

3. Performance Tips 
   - Limit date ranges when possible
   - Use specific criteria for large datasets
   - Adjust result limits appropriately

### Troubleshooting
1. No Results Found 
   - Broaden search criteria
   - Check date range validity
   - Verify search permissions

2. Performance Issues 
   - Reduce result limit
   - Narrow date range
   - Specify more search criteria
## 3. User Management Panel
![Product Sync Log Location](/images/blog/productSyncLog/6.jpg)

### Overview
User management allows you to control full access to all sections of the plugin for each user individually. 

### Important Warning:
- You must have "User Management" permission to access this panel
- Exercise caution when assigning permissions, as they directly affect plugin security and functionality

### Accessing the Panel
- Located within the Product Sync Log plugin settings
- "Back" button returns you to the main Product Sync Log settings page

### Access Permission Controls

#### Permission Modes
1. All Admins 
   - Grants full permissions to all administrator users
   - Recommended only for trusted admin-level staff

2. Only Custom Users 
   - Allows for highly customized access rights.
   - Allows user filtering and custom permission assignment

### User Search Functionality
- Search by username or display name (partial matches accepted)
- Filter by role (excludes customer role)
- Available roles include: 
  - Administrator
  - Author
  - Shop Manager
  - Other WordPress roles

### Main Interface Components

![Product Sync Log Location](/images/blog/productSyncLog/7.jpg)


#### Table Structure
1. Header Section 
   - Global selection toggle
   - Row numbering
   - Username column
   - Primary Role column
   - Roles column
   - Access Permissions column
   - Actions column

2. Data Rows 
   - Selectable for bulk operations
   - Truncated text with hover/click expansion
   - View and edit permission buttons per row

3. Footer Section 
   - Bulk permission update option
   - Pagination controls
   - Page information display

### Permission Management

![Product Sync Log Location](/images/blog/productSyncLog/8.jpg)


#### Available Permissions
1. Change Settings 
   - Access to plugin configuration page

2. View Rows 
   - Ability to view logs in Metabox

3. Add Note 
   - Permission to add notes to changes

4. Remove Rows 
   - Authority to delete logs

5. Edit Other Users Notes 
   - Ability to modify notes created by other users

6. Search 
   - Access to search functionality

7. User Management 
   - Access to user permission controls

8. Log Customization 
   - Ability to modify log display and behavior

9. Display Settings 
   - Control over database logging preferences

10. Diagnose 
    - Access to error logs and deletion capabilities

### Managing Permissions

#### Individual User Updates
1. Click the edit icon (user edit icon)
2. Modify permissions in the dialog
3. Confirm changes with "OK"
4. Save changes using the main save button

#### Bulk Updates
1. Select desired users using checkboxes
2. Click "Update Permissions"
3. Modify permissions in bulk
4. Save changes

### Navigation
- Pagination controls for multiple pages
- Page count and total items display
- First/Last page quick access
- Previous/Next page navigation

### Best Practices
1. Regularly review user permissions
2. Limit high-level permissions to trusted users
3. Test access after updates
4. Maintain principle of least privilege

## 4. Log Customization Panel

![Product Sync Log Location](/images/blog/productSyncLog/9.jpg)


### Overview
The Log Customization feature provides complete control over automated reports and information filtering. This documentation explains how to access, configure, and manage log settings effectively.

### Important Warning:
- You must have "Log Customization" permission to access this panel
- Be aware that some properties are deactivated by default
- Exercise caution when deactivating report properties

### Accessing the Panel
The Log Customization panel is accessible through:
1. Product Sync Log plugin settings
2. Use the "Back" button to return to the main Product Sync Log settings

### Control Features

#### Filter Controls
- Name/Slug Filter: Instantly filters properties containing the entered name or slug
- Property Type Filter: 
  - All Properties: Displays all product properties
  - General: Shows general product properties only
  - Attribute: Shows attribute product properties only
  - Variable: Shows variable product properties only
- Hide Deactivates: Toggle to hide deactivated properties
- Refresh: Updates the list of WooCommerce product properties
- Save: Commits all changes to settings

### Table Interface

#### Header Section
- Global selection toggle for bulk operations
- Key: Property identifier
- Name: Property name
- Property Type: Categorization (General | Attribute | Variable)
- Status: Active/Deactive indicator

#### Data Rows
- Individual selection checkboxes for bulk operations
- Expandable text content (hover/click to view full text)

![Product Sync Log Location](/images/blog/productSyncLog/10.jpg)

#### Footer Controls
- Bulk Operations: 
  - "Deactive Selected": Temporarily deactivates chosen properties
  - "Active Selected": Temporarily activates chosen properties
  - Note: Changes require saving to become permanent
- Pagination Navigation
- Page Information Display

### Best Practices
1. Review changes before saving
2. Use bulk operations for efficient management
3. Regularly validate active properties
4. Maintain a balance between comprehensive logging and system performance

### Notes
- All changes are temporary until saved
- Use the refresh button to ensure you're working with current data
- Consider the impact on report generation when deactivating properties

## 5. Display Settings Panel

![Product Sync Log Location](/images/blog/productSyncLog/11.jpg)

### Overview
The Display Settings panel enables customization of plugin appearance and data storage behavior. This panel provides controls for how variable product data is stored and displayed within the system.

### Important Warning:
- You must have "Display Settings" permission to access this panel
- Changes made here affect how product data is stored and returned

### Accessing the Panel
The Display Settings panel is accessible through:
1. Product Sync Log plugin settings
2. Use the "Back" button to return to the main Product Sync Log settings

### Control Features

#### Basic Controls
- Refresh: Updates the list of available settings
- Save Settings: Commits all changes to the system

#### Variable Storage Method

##### Variable Code Settings
- Include Variable Code 
  - When enabled: Adds variable code after changes in variable products
  - Format example: (variable code:1345)
  - Note: If Include Attributes is disabled, variable code is included by default

##### Attribute Display Settings
- Include Attributes 
  - When enabled: Includes variable product attributes in the log
  - Displays attributes such as Color, Size
  - Format example: (Size:XL => Color:Green)

### Best Practices
1. Review settings after updates to ensure desired behavior
2. Test variable product logging after making changes
3. Consider data readability when configuring attribute display
4. Maintain consistent settings across similar product types

### Notes
- All changes require saving to take effect
- Variable code inclusion may affect log readability
- Consider the balance between detail and clarity when configuring attribute display

## 6. Plugin Information

![Product Sync Log Location](/images/blog/productSyncLog/12.jpg)


### Overview
This option allows you to view the complete metadata of the plugin.

### Accessing the Panel
The Display Settings panel is accessible through:
1. Product Sync Log plugin settings
2. Use the "Back" button to return to the main Product Sync Log settings

### Core Information
- Plugin Name: Product Sync Log
- Version: Version of plugin
- Release Date: Release date of plugin 

### Developer Information
- Developer: Mahdi Ebrahim Pour
- Website: www.mebrp.com
- Contact: admin@mebrp.com

## 7. Diagnose Panel

![Product Sync Log Location](/images/blog/productSyncLog/13.jpg)


### Overview
The Diagnose panel provides tools for identifying and resolving plugin issues. It enables website administrators to monitor, analyze, and manage error logs efficiently.

### Important Warning:
- You must have "Diagnose" permission to access this panel
- Access to error logs is essential for website administrators to troubleshoot issues

### Accessing the Panel
The Diagnose panel is accessible through:
1. Product Sync Log plugin settings
2. Use the "Back" button to return to the main Product Sync Log settings

### Control Features

#### Error Log Management
- Refresh Error Logs 
  - Updates the display to show any new error logs
  - Provides real-time status of plugin operations
  - Use regularly to monitor system health
- Delete Error Logs 
  - Only enabled when error logs exist
  - Removes current error logs after issues are resolved
  - Helps maintain clean, readable logs
  - Recommended to use after confirming fixes

### Status Display
The panel shows one of two states:
1. When Errors Exist: 
   - Displays detailed error logs
   - Shows timestamp and error details
   - Enables the Delete Error Logs button

2. When No Errors Exist: 
   - Displays success message: "🎉 I have good news! 🎉🚀 No error logs found! Everything is running smoothly. 😊"
   - Delete Error Logs button remains disabled

### Best Practices
1. Regularly check error logs
2. Document solutions to recurring issues
3. Clear resolved error logs promptly
4. Monitor patterns in error occurrences
5. Keep error logs for reference until issues are fully resolved

### Notes
- Regular monitoring helps prevent serious issues
- Keep a backup of important error logs before deletion
- Use error logs to improve plugin configuration
- Consider error patterns when planning maintenance

## 8. Product Sync Meta Box

![Product Sync Log Location](/images/blog/productSyncLog/14.jpg)

### Overview
The Product Sync Meta Box provides detailed change tracking and management functionality within the WooCommerce product edit page. It allows users to view, manage, and document product changes efficiently.

### Access Instructions
1. Navigate to Products -> All Products in WooCommerce
2. Edit a product (URL format: yoursite/wp-admin/post.php?post=[product_code]&action=edit)
3. Locate the Product Sync Meta Box on the page
4. Use the Dots menu to customize interface color theme

### Required Permissions
To access Meta Box features, you need the following permissions:
- View Rows: Access to view logs in Meta Box
- Add Note: Ability to add notes to changes
- Remove Rows: Permission to delete logs
- Edit Other Users Notes: Authority to modify notes created by other users

Note: Features will be limited based on missing permissions

### Control Features

#### Note Management
- Add Notes 
  - Available even without changes
  - Maximum 200 characters per note
  - Click to open dialog
  - Click "Update Note" to save
  - Wait for log update confirmation

#### Refresh Function
- Updates logs without page refresh
- Particularly useful for variable product updates
- Preserves current page state

### Interface Components

#### Table Structure

##### Header Section
- Bulk selection checkbox
- Action controls

##### Data Columns
- Selection checkbox
- Row number
- Changes (previous/new values)
- Modification Date
- Username (with display name)
- Notes
- Action buttons

##### Action Buttons
1. Eye Button 
   - Shows full row details
   - Opens detailed view modal

2. X Icon 
   - Deletes current row
   - Requires confirmation

3. Note Icon 
   - Updates notes
   - Restricted by permissions

##### Footer Section
- Pagination controls
- Results count display
- Bulk action controls

### Data Management

#### Individual Actions
- Row-specific deletions
- Note updates
- Detail viewing

#### Bulk Operations
- Multiple row selection
- Batch deletions
- Requires confirmation
- Permission-based access

### Best Practices
1. Regular log review
2. Meaningful note creation
3. Careful bulk operation use
4. Permission verification before actions
5. Regular refresh for current data

### Notes
- Text expansion available on hover
- Confirmation required for deletions
- Note editing restricted by permissions
- Bulk operations require careful consideration