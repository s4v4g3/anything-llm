#

1) Refactor the left sidebar to use a proper tree structure and improve the cosmetics
   of the chats and sub-workspace nodes
2) Implement developer (api-key) endpoints for the new workspace hierarchy internal endpoints.
   * Sprint 2: added endpoints for workspace tree basic functionality
3) Add a user-facing "Description" property for each workspace (default to null)
4) Add an optional "sort key" property for a workspace that determines its sort order in the tree.
5) Improve the "filter workspaces" feature to allow custom filtering
6) Refactor the code in server/utils/chats to reduce the amount of duplicated code.
