v1.85.2
[fix] Reset Form's 'isSubmitting' state after onSubmit has finished or when there are any errors.

v1.85.1
[fix] Fixed issue with null being returned instead of object from useLogoutFlow when ory not ready

v1.85.0
[feat] Better loader feedback in From and ActionButtons

1. Added 'isSubmitting' state to Form component which is used to display submit button as loading and disable cancel button on form finish.
2. Added support for 'showLoader' function action property which sets the 'loading' prop of the action button to true when clicked.

v1.84.4
[fix] Fixed logout redirection and added loader when it is processing

v1.84.3
[fix] Fixed breadcrumbs

v1.84.2
[fix] Fixed useSessionStore for the old projects

v1.84.1
[fix] Added breadcrumb homePath

v1.84.0
Dependencies - 17/05/24
1. 841bfce Bump ejs from 3.1.9 to 3.1.10 (#522)2Bump pusher-js from 8.0.1 to 8.3.0
2. Bump @monaco-editor/react from 4.5.1 to 4.6.0
3. Bump antd from 5.9.4 to 5.17.2
4. Bump chart.js from 4.3.0 to 4.4.3
5. Bump dayjs from 1.11.7 to 1.11.11
6. Bump i18next from 23.2.11 to 23.11.4
7. Bump js-cookie from 3.0.1 to 3.0.5
8. Bump lodash from 4.17.20 to 4.17.21
9. Bump pusher-js from 8.3.0 to 8.4.0-rc2
10. Bump react from 18.2.0 to 18.3.1
11. Bump react-i18next from 14.0.1 to 14.1.1
12. Bump react-markdown from 9.0.0 to 9.0.1
13. Bump sql-formatter from 15.0.2 to 15.3.1
14. Bump styled-components from 6.0.7 to 6.1.11
15. Bump whatwg-fetch from 3.6.2 to 3.6.20
16. Bump @babel/cli from 7.24.1 to 7.24.5
17. Bump @babel/core from 7.19.3 to 7.24.5
18. Bump @babel/preset-react from 7.18.6 to 7.24.1
19. Bump @babel/runtime from 7.19.0 to 7.24.5
20. Bump @craco/craco from 7.0.0 to 7.1.0
21. Bump @testing-library/jest-dom from 6.4.2 to 6.4.5
22. Bump @testing-library/react from 14.0.0 to 15.0.7
23. Bump babel-plugin-prismjs from 2.0.1 to 2.1.0
24. Bump eslint from 8.24.0 to 8.57.0
25. Bump eslint-plugin-react-hooks from 4.6.0 to 4.6.2
26. Bump jest-environment-jsdom from 29.1.2 to 29.7.0
27. Bump json-server from 0.17.4 to 1.0.0-beta.0
28. Bump react-dom from 18.2.0 to 18.3.1
29. Bump react-test-renderer from 18.2.0 to 18.3.1
30. Bump rollup from 4.13.2 to 4.17.2

v1.83.0
[feat] Removed hardcoded kratos public url.

**BREAKING** for apps that use authenticationSdk (ory)
this PR changes how the ory is initialised and how the authenticationHooks are initialised.

v1.82.0
[feat] Moved utilities, available for SSR to separate bundle, so they can be used without leading to build errors

v1.81.5
[feat] Hard-code Kratos URL temporarily

v1.81.4
Changed authentication redirect url condition

v1.81.3
[fix] Logout flow

v1.81.2
[feat] Hard-code Kratos URL temporarily

v1.81.1
[feat] Hard-code Kratos URL temporarily

v1.81.0
[feat] New authentication flow

v1.80.1
[fix] TopNav home button & client select color

v1.80.0
Dependencies - 01/04/24
1. 5145e8b Bump whatwg-fetch from 3.6.2 to 3.6.20 (#445)
2. 62d95dc Bump eslint-plugin-prettier from 5.1.2 to 5.1.3 (#454)
3. a188c4d Bump @testing-library/user-event from 14.5.1 to 14.5.2 (#451)
4. 8dff7e7 Bump humanize-duration from 3.28.0 to 3.31.0 (#457)
5. eecea66 Bump @monaco-editor/react from 4.5.1 to 4.6.0 (#448)
6. 0f55805 Bump rollup-plugin-copy from 3.4.0 to 3.5.0 (#452)
7. fb62909 Bump jest-environment-jsdom from 29.5.0 to 29.7.0 (#453)
8. 4d6fe03 Bump pusher-js from 8.2.0 to 8.3.0 (#455)
9. c19763e Bump @testing-library/jest-dom from 6.1.5 to 6.4.2 (#470)
10. 67175e9 chore(deps): bump express from 4.18.2 to 4.19.2 (#515)
11. 283cff1 chore(deps-dev): bump @babel/cli from 7.23.4 to 7.24.1 (#513)
12. 0d6320d Bump prettier from 3.1.1 to 3.2.5 (#471)
13. 439b95f chore(deps): bump ip from 2.0.0 to 2.0.1 (#484)
14. 5220203 chore(deps): bump zustand from 4.4.7 to 4.5.2 (#489)
15. 0598ac2 chore(deps): bump chart.js from 4.3.0 to 4.4.2 (#492)
16. c0525bb chore(deps): bump i18next from 23.7.11 to 23.10.1 (#498)
17. eb319b5 chore(deps): bump react-i18next from 14.0.1 to 14.1.0 (#499)
18. 92284d3 chore(deps-dev): bump eslint-plugin-react from 7.33.2 to 7.34.1 (#504)
19. 6c67b9e chore(deps): bump follow-redirects from 1.15.5 to 1.15.6 (#501)
20. 742fe91 chore(deps): bump webpack-dev-middleware from 5.3.3 to 5.3.4 (#505)
21. f17c008 chore(deps-dev): bump @babel/core from 7.22.5 to 7.24.3 (#508)
22. 84c81d9 chore(deps-dev): bump @testing-library/react from 14.0.0 to 14.2.2 (#510)
23. 4616925 chore(deps): bump react-ace from 10.1.0 to 11.0.1 (#511)
24. 64178a3 chore(deps): bump sql-formatter from 15.0.2 to 15.3.0 (#503)
25. 68f7b3c chore(deps-dev): bump @babel/preset-react from 7.22.5 to 7.24.1 (#509)
26. ce38216 chore(deps): bump antd from 5.13.2 to 5.15.4 (#507)
27. 1718f6c chore(deps-dev): bump eslint from 8.43.0 to 8.57.0 (#488)
28. 83bf8e9 Bump react-markdown from 8.0.7 to 9.0.1 (#447)
29. 73d332c Bump remark-gfm from 3.0.1 to 4.0.0 (#443)
30. Bump humanize-duration from 3.27.3 to 3.32.0
31. Bump pusher-js from 8.0.1 to 8.3.0
32. Bump @rollup/plugin-alias from 5.0.0 to 5.1.0
33. Bump @rollup/plugin-image from 3.0.2 to 3.0.3
34. Bump json-server from 0.17.0 to 0.17.4
35. Bump rollup from 2.79.1 to 4.13.2
36. Bump rollup-plugin-copy from 3.4.0 to 3.5.0

v1.79.1
[fix] Side menu item color for all projects, including React projects

v1.79.0
[fix] Antd provider for Next.js projects

v1.78.4
[fix]
- Side menu item color

v1.78.3
[fix]
- Update global background to white
- Rename the background color to warmGray

v1.78.2
[fix] Configure custom fp_sql editor mode rules using addRules.

This fixes an error when using multiline comments.

v1.78.1
[fix]
1. Replaced system menu styled-component with antd component
2. Updated side menu items propTypes

v1.78.0
[feat] Improve SQL syntax highlighting in the editor.

- Theme has to be set via the API, because the 'theme' prop is swallowed by styled-components.
- Added separated rule for single-quotes (string) and double-quotes (string.alias)
- Bumped ace-builds to 1.32.6
- Extended list of functions to be marked with 'support.function' identifier

v1.77.2
[fix] Bumped react-markdown to 9.0.0 to make it work with remark-gfm v4

These two dependencies work together and their major versions upgrades need to match.
https://github.com/remarkjs/react-markdown/issues/771

v1.77.1
[fix] Fixed rollup config & removed transformIgnorePatterns

v1.77.0
[dependency] Bump remark-gfm from 3.0.1 to 4.0.0 & fixed tests

v1.76.4
[chore] Security Deps

1. 02d8059 Bump @babel/traverse from 7.22.5 to 7.23.9 (#478)
2. 58704f5 Bump follow-redirects from 1.15.2 to 1.15.5 (#442)

v1.76.3
[fix] Menu Component item colours were incorrectly set using design tokens.

v1.76.2
[feat] Added optional prop should transform items to the side menu

v1.76.1
[feat] Exported removeGlobalAlert from store actions

v1.76.0
[fix] Fixed SideMenu visibility if there are no menu items
[fix] Fixed error in terminal due to styled-components param naming for CompanyLogo

v1.75.0
Dependencies - 25/01/24

1. 938b1d4 Bump @rollup/plugin-babel from 6.0.3 to 6.0.4 (#320)
2. 7e6f812 Bump @babel/cli from 7.23.0 to 7.23.4 (#361)
3. efbfcea Bump @babel/core from 7.23.0 to 7.23.6 (#406)
4. d5c0dd7 Bump @babel/runtime from 7.23.1 to 7.23.6 (#403)
5. 475e4f9 Bump @babel/preset-react from 7.22.15 to 7.23.3 (#352)
6. acef33c Bump @babel/traverse from 7.23.0 to 7.23.2 (#331)
7. 2f922f9 Bump @rollup/plugin-image from 3.0.2 to 3.0.3 (#314)
8. 1d24f1e Bump @rollup/plugin-alias from 5.0.0 to 5.1.0 (#368)
9. 5c74ad2 Bump @rollup/plugin-commonjs from 25.0.4 to 25.0.7 (#328)
10. a6b37a2 Bump @rollup/plugin-node-resolve from 15.2.1 to 15.2.3 (#315)
11. 99418a9 Bump eslint-plugin-prettier from 5.0.0 to 5.1.2 (#424)
12. 4b37c0d Bump eslint-config-prettier from 9.0.0 to 9.1.0 (#382)
13. 563781b Bump eslint-plugin-jsx-a11y from 6.7.1 to 6.8.0 (#346)
14. 7316e19 Bump eslint from 8.50.0 to 8.56.0 (#416)
15. 89fc13a Bump eslint-plugin-import from 2.28.1 to 2.29.1 (#415)
16. 9620c9a Bump prettier from 3.0.3 to 3.1.1 (#401)
17. 5f89e39 Bump zustand from 4.4.1 to 4.4.7 (#387)
18. a6bf820 Bump whatwg-fetch from 3.6.19 to 3.6.20 (#418)
19. 19c717d Bump i18next from 23.2.11 to 23.7.11 (#417)
20. 5c45e33 Bump chart.js from 4.4.0 to 4.4.1 (#404)
21. 57a6015 Bump json-server from 0.17.3 to 0.17.4 (#311)
22. c6f4ac4 Bump @testing-library/jest-dom from 6.0.0 to 6.1.5 (#389)
23. 256651f Bump @adobe/css-tools from 4.3.1 to 4.3.2 (#381)
24. 9828f15 Bump styled-components from 6.0.8 to 6.1.8 (#439)
25. 09e3bb1 Bump @monaco-editor/react from 4.5.2 to 4.6.0 (#319)
26. 0feaef6 Bump humanize-duration from 3.30.0 to 3.31.0 (#355)
27. bcabc6e Bump react-i18next from 13.2.2 to 14.0.1 (#440)
28. 63a599 Bump antd from 5.9.4 to 5.13.2 (#438)
29. de5af35 Bump sql-formatter from 13.0.0 to 15.0.2 (#407)

v1.74.2
[fix] Replaced styled component with antd component and inline styles to prevent CSS class conflict

v1.74.1
[feat] Added possibility to disable SideMenu collapse optionally

v1.74.0
[feat] GlobalFilters improvements

1. GlobalFilters utils:
  - allow to pass fieldCol globalFilter option that allows to specify the filters grid
  - set allowClear on array type fields
  - set maxTagCount: 'responsive' on fields with enum
  - hide filters' fields labels when displayed inline
  - fixed normalizing read filters when field type is array
2. Dynamic Fields building:
  - componentBuilders: support array types with integer items
3. Form/Field/index:
  - support item.fieldCol config

v1.73.0
[feat] Draggable tree select

v1.72.0
[feat] Introduced custom, more tailored screen breakpoints.

Default breakpoints provided by Antd do not suit our projects too well because they do not differentiate different desktop sizes too well. New breakpoints allow to differentiate between different desktop/laptop screens sizes allowing for more tailored rules.

Previously: Screens with width between 1200 and 1600 were all treated as XL screen. And screens above 1600 were treated as XXL.
Now:
 - Screens with width 1280 and below are treated as MD
 - Screens with width 1440 and below are treated as LG
 - Screens with width 1800 and below are treated as XL
 - Screens with width above 1800 are treated as XXL.


v1.71.0
[feat] Make sideMenu collapsible and auto-collapse on screens smaller than xxl.

This provides more screen real estate for users using smaller screens.

v1.70.0
[feat&refactor&fix]
- refactor TopNav component to add dynamic components
- refactor CompanyLogo component for dynamic placement in header
- export Breadcrumb component
- restored cropped logo with transparent background
- show SideBar if items are present
- passed content container styles
- fix TopNav propTypes

v1.69.7
[fix] getFormErrors - parse error key to int if possible.

Otherwise antd's Form is not able to set the errors correctly using setFields.

v1.69.6
[feat] Export store.triggerGlobalAlert

v1.69.5
[fix] Dynamic Fields building - do not modify type value when is array.

array.pop() modifies the array.

v1.69.4
[fix] Component Field label not displayed.

This fixes a bug, where passed component label (ie <strong>{field-one}</strong>) was ignored.

Additionally, fixed Popover prop types.

v1.69.3
[fix] Active icon color

v1.69.2
[fix] Decode uri component for link ActionButton

Will support received action's href option including encoded uri (ie new?id=%3Aid)

v1.69.1
[fix]
1. Side menu item colors
2. Client select color

v1.69.0
[feat] Components improvements and additions

1. Added Flex, Steps and Timeline from antd
2. StageUI now exports LoadingBlock component
3. LoadingBlock now accepts tip property.
4. Fixes Popover's propTypes
5. ProDescriptions now pass remaining props to antd's Description
6. Tag now accepts size prop, which allows to display tags of different sizes (large and default supported atm)
7. TagsList now accepts tagSize prop, which is passed to Tag

v1.68.0
[feat] Extended date utils functionality

1. timeBetween now accepts relative param, which when true, uses i18n to appropriate wording
2. formatDuration now uses i18n to find the conjuction param value
3. formatDuration now passes language and fallback languages to humanizeDuration

v1.67.0
[feat] Extended dynamic fields functionality

1. Set showSearch=true as default for Select when field type is string
2. Pass the 'hint' property from json schema to field.item
3. Added 'whitespace: true' rule when field type is 'string' and 'minLength' property exists

v1.66.0
[feat] SmartList and SmartTable now accept and display extraDataDisplay prop.

v1.65.0
1. Added RadioGroup component
2. Added ability to pass extra children to SideMenu

v1.64.0
[feat] Preserve column.render for table columns using ActionButtons

v1.63.1
[fix] Fixed SmartTable ignoring pagination parameter and assigning default pagination value, which forced pagination to appear in every table

v1.63.0
[feat] Dynamic fields - normalize empty string value in field to undefined.

APIs usually differently interpret missing key than an empty value. This has proven to be the case in Blueprints.

Additionally:
 - do not pass fixParentNode to Autocomplete component.

v1.62.0
[feat] Support displaying GlobalFilters in a modal.

Received globalFilterOptions can now specify whether a filter input should be displayed inline (default) or in a modal.

It supports both boolean value as well as array of breakpoints.

Example configurations:

1. `{ filter_one: { modal: true }, filter_two: { inline: true } }`
2. `{ filter_one: { modal: false }, filter_two: { inline: false } }` - will show filter_one inline and filter_two in a modal
3. `{ filter_one: { modal: ['xs', 'sm', 'md', 'lg', 'xl'] }, filter_two: { inline: ['xxl'] } }` - will show both filters in modal on screens smaller than xxl, otherwise they will be inline

Additionally, if all filters are set to be displayed in modal then no inline form will be visible and the filters are submitted on the modal. When filters are set to be displayed in modal, then the "Filter" button will not show up.

The change is backwards compatible - inline is a default placement.

v1.61.2
[feature] Exported SmartDataDisplay component

v1.61.1
[fix] hide broken links if currentSystem is undefined

v1.61.0
[feat&fix] Support order field in GlobalFilters + fixes.

Adds support for Order/Sorting in dynamically built GlobalFilters.

Fixes & Improvements:
  - Do not mount GlobalFilters until filters schema properties are available
  - Do not set default placeholder for GlobalFilter fields, but be able to read it from translations
  - Reworked applySorter util - it now expects a string with sortable column and direction
  - Adjusted how filters, pagination and sorter are applied in SmartTable
  - Do not apply filters nor sorter when paginating
  - Reset pagination to page 1 when filtering and/or sorting


v1.60.1
[fix] Allowed to add a different color for ClientsDropdown in TopNav

v1.60.0
[feat] Added new component CompanyLogo

v1.59.1
[feat] Improved Tabs styling.

- Moved inline styles to styled-components
- isHorizontal prop is now deprecated, the flag is calculated based on tabPosition prop ('top' being default)

Additionally:
- PageContainer will not mount h4 when title is not present

v1.59.0
[feat] Build GlobalFilters using json_schema.filters

This decouples the GlobalFilters' filtering set up from SmartTable and allows to build the filters using json_schema.

Additionally:
  - Moved filtering utils needed only for SmartTable to SmartTable utils.

v1.58.0
[refactor] DataView - Store json_schema.filters.properties as filtersSchema instead of filters.

1. This is a preparation for GlobalFilters refactor into building them using json_schema.
2. The pre-existing buildFilters is preserved, but moved to filtering utilities. It is still in use for GlobalFilters and SmartTable.
3. These changes improve json_schema handling in buildFilters utility:
  - it is now able to read valueEnum and/or enum from definition where type is array and it contains items
  - it now adds true and false where type is boolean
4. Improvements described in 3. might be BREAKING if json_schema provided was previously changed in order to support array and boolean types.

v1.57.1
[feat] Dynamic form building - allow to extend item's component with custom props.

Additionally:
 - fix import issue in Form component, which could cause circular dependency

v1.57.0
[feat] Introduced dynamic form fields building utilities.

Moved from BlueprintsUI where it is used to build outputs fields.

v1.56.0
[feat] Added SmartDataDisplay and SmartList

SmartDataDisplay is essentially a wrapper for SmartTable and SmartList that takes some of the filtering, sorting and paginating handling from DataView and SmartTable.

It provides a single place that is responsible for applying the URL search and allows to de-duplicate the code.

Potentially breaking:
Due to this, exporting SmartTable as a component no longer makes sense.

v1.55.7
[fix] Ensure pagination is correctly disabled in Table and List

Bug introduced in v1.55.4

v1.55.6
[fix] Improve margins for horizontal tabs list in PageContainer.

v1.55.5
[feat] Moved GlobalFilters out of SmartTable

Additionally:
- added default Input component to GlobalFilters


v1.55.4
[chore] Moved pagination normalisation to the components that actually need it.

The normalisation/translation is needed because our pagination object contains total_items and per_page keys while antd's components (Table and List) need total and pageSize respectively.

There is no real need to do the normalisation in DataView nor in SmartTable, hence it was moved to the "end of the chain".

v1.55.3
[feat] Allow to use DataView w/o PageContainer

DataView might be useful as a nested component.
Passing "pageHeader = false" will not mount PageContainer.

v1.55.2
[feat] feat: Added Typography.UpperCaseText

v1.55.1
[feat] feat: Add translations support to List

v1.55.0
[feat] Introduced DataView as a replacement for TableView.

This allows to use all the utilities needed to load and filter the data w/o limiting it to a Table.

v1.54.0
[feat] Add Score component.

v1.53.1
[fix] Fixed side menu and breadcrumbs

v1.53.0
[feat] Made AutoComplete smarter.

It can now accept enums and/or valueEnum and convert them into options (similar behaviour to Select).
Using AutoComplete instead Select allows users to input their own value as well as select one from the dropdown.

v1.52.3
fix: ProDescription component key error: updated component according to antd Descriptions documentation

v1.52.2
[chore] Added missing tests for MarkdownEditor utilities.

They were skipped in https://github.com/forward3d/stage_ui/pull/179

v1.52.1
- fix style provider for nextjs

v1.52.0
[feat] Added Cascader and extended object utils

1. Cascader - https://ant.design/components/cascader
2. object utils
  - pick
  - omit

v1.51.1
[Table] - Do not force translate column.title

v1.51.0
- add styleProvider
Dependencies - 28/09/23
1. antd from 5.8.3 to 5.9.4
2. react from 17.0.2 to 18.2.0
3. react-i18next from 13.0.2 to 13.2.2
4. @testing-library/jest-dom from 6.0.0 to 6.1.3
5. @testing-library/react from 12.1.5 to 14.0.0
6. react-dom from 17.0.2 to 18.2.0
7. react-test-renderer from 17.0.2 to 18.2.0

v1.50.0
Dependencies - 28/09/23

1. 1194935 Bump @babel/runtime from 7.22.5 to 7.22.10 (#234)
2. a902e05 Bump @babel/core from 7.22.5 to 7.22.10 (#236)
3. 2e76ad8 Bump @babel/cli from 7.22.5 to 7.22.10 (#232)
4. 40754ca Bump eslint-config-prettier from 8.8.0 to 9.0.0 (#231)
5. a9ca8c6 Bump jest-environment-jsdom from 29.5.0 to 29.6.2 (#226)
6. 35a1d18 Bump eslint-plugin-react from 7.32.2 to 7.33.1 (#223)
7. fd054de Bump eslint-plugin-import from 2.27.5 to 2.28.0 (#224)
8. 76e087d Bump pusher-js from 8.2.0 to 8.3.0 (#213)
9. 8a31f9 Bump word-wrap from 1.2.3 to 1.2.4 (#209)
10. 0ab4532 Bump chart.js from 4.3.0 to 4.3.3 (#233)
11. 8b2d87c Bump zustand from 4.3.8 to 4.4.1 (#229)
12. aa020a2 Bump dayjs from 1.11.8 to 1.11.9 (#184)
13. fff7d7c Bump humanize-duration from 3.28.0 to 3.29.0 (#197)
14. 7338b5a Bump @testing-library/jest-dom from 5.16.5 to 6.0.0 (#244)
15. f9b744b Bump eslint from 8.43.0 to 8.47.0 (#245)
16. a011447 Bump whatwg-fetch from 3.6.2 to 3.6.17 (#212)
17. 20b9a2e Bump tough-cookie from 4.1.2 to 4.1.3 (#189)
18. 1d38876 Bump @rollup/plugin-commonjs from 25.0.2 to 25.0.4 (#242)
19. 793fef7 Bump styled-components from 5.3.11 to 6.0.7 (#235)
20. 0975724 Bump prettier from 2.8.8 to 3.0.2 (#246)
21. 0f0d7b3 Bump semver from 5.7.1 to 5.7.2 (#249)
22. f4ff233 Bump sql-formatter from 12.2.3 to 13.0.0 (#278)
23. 4ce98ab Bump antd from 5.6.3 to 5.9.4 (#304)
24. 51a7b05 Bump @adobe/css-tools from 4.0.1 to 4.3.1 (#269)

v1.49.5
fix: store dependencies in the TableView hook

v1.49.4
fix: Make usePusherNotify use final received initial value.

It was set to use the first received initial value, however when used deep down the components tree, that value was not always the correct one. Replicated behaviour of usePusherCreateItem and usePusherEditItem

v1.49.3
[fix] Disabled forwardRef support for withScopedTranslations HOC due to failed CI

v1.49.2
Added support for forwardRef wrapped components to withScopedTranslations HOC

v1.49.1
fix: Moved 'ExtendedCard = withLoader(AntdCard' out of Card component

Such things should never be in the component function, it can get updated and it gets reset.

v1.49.0
fix [antd: message]
- Updated message component
- Used App component
- added useTableViewSetup hoc

v1.48.0
feat: Make FieldsList accept onAdd dynamic fields handler and export Modal.useModal

v1.47.0
feat: Added array and object utilities + make all Card(s) use withLoader HOC.

1. array utilities
  - groupItemsBy => takes the array of objects and key by which it should group the data as arguments,
    returns an object of grouped items
  - insert => takes the array, item to insert and position at which the item should be inserted,
    returns modified array
2. object utilities
  - isObject => checks if value is an object with properties (ie { test: true })
3. Card component
  - extended it with withLoader hook => this way the Card.Table does not require it and all Cards have the same loader

v1.46.0
fix [antd: message] Static function can not consume context like dynamic theme. Used 'App' component instead.

v1.45.0
feat: Forms improvements

1. allow to pass fields as a function for FieldsList dynamic={true}
2. Make Select not display the dropdown when mode is 'tags' and there are no enums nor valueEnums - it appears as Tag Input
3. Added Input.Number.

v1.44.4
[fix] Module level directives warning

v1.44.3
[fix][SC-15] updated antd from ^5.4.2 to ^5.8.3

v1.44.2
[fix][SC-10] [antd: Tooltip] destroyTooltipOnHide no need config keepParent anymore. Used boolean value directly.
[fix][SC-12] [antd: Tooltip] `arrowPointAtCenter` is deprecated, used `arrow` instead.
[fix][SC-14] [antd: Select] `dropdownMatchSelectWidth` is deprecated. Used `popupMatchSelectWidth` instead.

v1.44.1
Use withLoader HOC for Card.Table

In certain edge cases the Table needs to be mounted once the data is loaded. One of such cases is using 'expandable.defaultExpandAllRows' - the rows are not expanded when table is mounted without the data.

v1.44.0
feat: Allow custom column render in ProDescriptions and added Popover component

v1.43.1
fix: Card.Table should use Loading spinner instead of Skeleton for better UI.

v1.43.0
[feature] Added ability to pass actions translate options to page header of the TableView via pageHeader.actionsTranslateOptions property

v1.42.0
[SC-17] Support I18n - Added basic i18n support with nested scoping.

Uses https://react.i18next.com/

1. 1a422b9 added i18n util
2. f289ce6 Allow to configure StageUiApp and reworked loadConfig to make it fetch the translations
3. ae33560 Replaced usage of string.translate with i18n.t for hooks and utils
4. 00d0057 Use useTranslation hook in ProDescription, RequestTable and Tabs
5. 9cc1524 Added missing tests for utils/table/buildColumns.buildColumnTitle
6. 73970f9 Try to find translated field name as label in Field component
7. fa3bf95 Try to read PageContainer title from i18n
8. 39d63c8 Try to read table's column name from i18n or fallback to previous mechanisms.
9. a8e75ad Added PropTypes to touched components

v1.41.2
fix: SmartTable - replaced Table with Card.Table which moves the GlobalFilters form out of the Table title into the Card wrapper.

This prevents unnecessary updates to GlobalFilters when users interact with the table - hover, click etc

v1.41.1
fix: App/loadConfig should ignore null loadConfigParams

v1.41.0
feat: Introduced StageUIApp.

It allows for the UI applications to use the either the StageUiApp component or StageUiApp.provider.

StageUiApp takes over loading of the configuration as well as root-store config storing and management.
This reduces the boiler plate needed to use StageUI in the apps.

v1.40.5
Added withLoader hoc.

It will show a loading screen instead of mounting the component until it is ready.

v1.40.4
fix: ResultsTable's extendColumnsConfig and missing key in Table's row.

v1.40.3
feat: Allow to extend ResultsTable's columns.

The component now accepts an optional 'extendColumnsConfig' function which allows to overwrite columns configuration

v1.40.2
feat: Expose antd's Form hooks via Form component

These hooks make using Forms easier and allow to avoid passing form refs all over the place.

v1.40.1
Added ability to pass apiPlaceholders for setupApiActions TableView utility

v1.40.0
feat: Forms controls improvements

1. Allow to pass controlsProps to Form component
2. Allow to overwrite StepForm step allowSubmit per submitButton

v1.39.0
Dependencies - 28/06/23

1. 61b24ed Bump @rollup/plugin-commonjs from 25.0.0 to 25.0.2 (#175)
2. 95ff63e Bump @babel/runtime from 7.22.3 to 7.22.5 (#172)
3. 9f356ba Bump @babel/cli from 7.21.5 to 7.22.5 (#168)
4. be97847 Bump @babel/core from 7.22.1 to 7.22.5 (#166)
5. 6bda635 Bump @babel/preset-react from 7.22.3 to 7.22.5 (#167)
6. fc484e9 Bump @rollup/plugin-node-resolve from 15.0.2 to 15.1.0 (#163)
7. bb6dcf0 Bump dayjs from 1.11.7 to 1.11.8 (#161)
8. 4a0a7ac Bump eslint from 8.41.0 to 8.43.0 (#174)
9. c04c466 Bump pusher-js from 8.0.2 to 8.2.0 (#177)
10. 2822841 Bump sql-formatter from 12.2.1 to 12.2.3 (#178)
11. fcb1b14 Bump antd from 5.5.1 to 5.6.3 (#182)

v1.38.0
[feature] Added MarkdownEditor and PanedCard components and modified TableView

1. MarkdownEditor
  - based on monaco editor (as replacement candidate for ace)
  - customised with a basic toolbar that triggers defined snippets
  - added continuity handling for bullet list, numbered list and check list
2. PanedCard
  - upgraded Card component which allows to toggle panes
3. TableView
  - can now accept tableProps object which is passed to SmartTable
  - is non breaking change, with backwards compatiblity

v1.37.0
[feature] Allowed to provide white label configuration:
1. Pass custom font
2. Pass custom logo for top navigation HomeButton on the right corner
3. Pass color scheme for all the components, including TopBar and SideMenu

v1.36.0
feat: Allow to pass more DescriptionItem's properties to ProDescription

v1.35.1
[fix] Fixed zustand deprecated imports that ware effecting failed tests

v1.35.0
Added form.setErrorsFromResponse function to be able to highlight fields, which failed BE validation

v1.34.0
Dependencies - 30/05/23

1. 83bab75 Bump eslint from 8.35.0 to 8.41.0 (#146)
2. 24fad1f Bump zustand from 4.3.0 to 4.3.8 (#127)
3. b91b9f3 Bump @babel/runtime from 7.21.0 to 7.21.5 (#125)
4. b62490e Bump @babel/core from 7.21.0 to 7.21.8 (#128)
5. 619a4e9 Bump @babel/cli from 7.21.0 to 7.21.5 (#122)
6. 725f00e Bump eslint-config-prettier from 8.6.0 to 8.8.0 (#93)
7. 6fbe98b Bump webpack from 5.75.0 to 5.76.1 (#78)
8. ce84694 Bump @craco/craco from 7.0.0 to 7.1.0 (#74)
9. 678e095 Bump json-server from 0.17.2 to 0.17.3 (#90)
10. 4f42e84 Bump pusher-js from 8.0.1 to 8.0.2 (#92)
11. 35d1417 Bump json5 from 1.0.1 to 1.0.2 (#61)
12. ac02da6 Bump jest-environment-jsdom from 29.4.3 to 29.5.0 (#68)
13. 2133f35 Bump js-cookie from 3.0.1 to 3.0.5 (#119)
14. 1c9d457 Bump prettier from 2.8.4 to 2.8.8 (#118)
15. 84b3a8b Bump styled-components from 5.3.6 to 5.3.10 (#117)
16. f71e1bf Bump sql-formatter from 12.1.2 to 12.2.1 (#147)
17. 2ba5868 Bump @babel/runtime from 7.21.5 to 7.22.3 (#153)
18. 48c5bfe Bump @rollup/plugin-node-resolve from 15.0.1 to 15.0.2 (#103)
19. accf6e0 Bump @forward3d/stage_styles from 1.3.1 to 1.3.4 (#80)
20. 73440ef Bump @rollup/plugin-commonjs from 24.0.1 to 25.0.0 (#139)
21. ac65b2c Bump @rollup/plugin-alias from 4.0.3 to 5.0.0 (#104)
22. 639dacd Bump @babel/core from 7.21.8 to 7.22.1 (#155)
23. 2e1ed9d Bump @babel/preset-react from 7.18.6 to 7.22.3 (#156)
24. cc88340 Bump styled-components from 5.3.10 to 5.3.11 (#154)
25. ecdcbbc Bump antd from 5.4.2 to 5.5.1 (#148)

v1.33.2
[fix] Fixed app crush on missing viewActions for TableView

v1.33.1
[feature] SideMenu now properly sets key even if child doesn't include pathname of its parent

v1.33.0
[feature] Added new features and improved SideMenu functionality:
1. Added support for routes, which children have same key as their parent to proper handle expanded and highlighted item
2. Now each item in SideMenu is a Link, so it could be opened in a separate tab and so on
3. Added support for tree-like menu items shape with proper handling of opened and selected items
4. Added possibility to click on a parent, which has children as a separate link and ability to expand its children, clicking on the icon

v1.32.2
Allow Select component to receive fixParentNode prop.

We need to use this functionality when Select is used in modals.
It's easier to just pass a flag instead of repeating the function.

v1.32.1
Improved logic of finding sidebarItems default keys

v1.32.0
[feat] Added default behaviours for handleResponseResult.

1. It will allow the modal to be closable if back-end does not provide any actions - fixes users being stuck with the modal.
2. Will show a default message when an unhandled BE error occurs

v1.31.4
Fixed page crush if Layout sidebarItems doesn't have children property present

v1.31.3
Allow to provide initialValues prop to dynamic fields list.

The `add` operation of Antd's FormList accepts default values for new list item.
Thanks to that, instead of setting initial value per field,
we can pass an object of default values for any new item added to use when new list item is added.

This solves a warning triggered when initialValues are set on Form level:

```
Form already set 'initialValues' with path 'schedules.0.day_of_month'. Field can not overwrite it.
```

Example:
```javascript
<FieldsList dynamic fields={[{ item: { name: 'test' }}]} fieldsInitialValues={{ test: 'initialValue'}} />
```

v1.31.2
[fix] ErrorsList - handle nested error objects

v1.31.1
[fix] Table components fixes

1. Fixed styling of CardTable - the styles were leaking to any nested tables, they should not.
2. Fixed invalid imports in TableView

v1.31.0
[feat] StepForm - allow to have multiple submit buttons.

A submitButtons prop is required for the StepForm to render multiple buttons.
- The submitButtons prop should be an array of objects containing 'display' property.
- It can have all props that Button component accepts
- In order for the buttons to act differently (ie save as draft or save as published), a submitWith prop can be passed.
  This should include a path (antd's Form fieldPath) and value properties - used when called form.setFieldValue before form.submit.


It defaults to a singular, default submit button when this submitButtons prop is not passed.

v1.30.0
[feat] Understand optional action.condition property in ActionButtons.

From now on, the action can have a condition property, which should be a 3 element array:
 - condition[0] must be a name of tested object property (ie `state` for a `template = { state: 'published' }`)
 - condition[1] must be a name of an operator (ie `eql`)
 - condition[2] must be a value to which tested object property is compared (`ie published`)

The condition is evaluated and the ActionButton is displayed only when the result is a truthy value.

Example:
```javascript
const actions = [
  { name: 'deprecate', condition: ['state', 'notEql', 'deprecated'] },
  { name: 'recycle', condition: ['state', 'eql', 'deprecated'] }
]
const recordOne = { state: 'deprecated' }
const recordTwo = { state: 'published' }

// With above actions and records, the 'deprecate' action will be displayed for recordTwo
// and 'recycle' action will be displayed for 'recordOne'
```

v1.29.1
Fix client path replacement in ClientsDropdown

v1.29.0
StageTopNav lives here from now on.

The new TopNav requires following properties to be provided:
 1. `systems` => a list of systems that user has access to, it does not fetch this list anymore (ie `['datasets', 'blueprints']`)
 2. `currentSystem` => name of currently used system (ie `datasets`)

 If the TopNav should display a client select, following additional properties need to be provided:
 1. `clients` => an object with:
   - `available` key, which is a list of client_slugs user has access to
   - `path` key, which is a string including `/:id` parameter, needed
 2. `currentClient` => an object with:
   - `name` key, which is a client_slug
   - `display_name` key, which is client's display name (they differ sometimes)

Also, the ClientsDropdown now has a search input which should prove helpful when user has access to many clients.

v1.28.0
[dep] Bumped chartjs to v4.3.0 which supports tree shaking.

v1.27.3
[feature] Optional Add/Remove actions for the FieldsList component

1.27.2
[feature] Use Space.Compact for SelectWithPrefix and fix reload button border on hover

1.27.1
[feature] Added "X-CSRF-Token" header for non-Get requests

1.27.0
[feature] Added Checkbox component

1.26.1
[fix] Fixed TableView store imports
[feature] Added tests for TableView store

1.26.0
1. Added TableView view
2. Added replacePlaceholder string utility
3. Reused replacePlaceholder utility for ActionButtons with "link" type

1.25.0
[SC-2] Use antd's ConfigProvider and set base theme.

Set it up with base colours and font families for now.

Some components still use ant-design/colors, however they might not be anymore.

1.24.0
Bumped antd to 5.4.2

Fixed breadcrumbs and TagsList not returning anything when no tags.

1.23.1 Export Skeleton component

1.23.0
[feature] Added Input.TextArea component
[feature] Added patch api function
[feature] Replaced Divider with antd component
[fix] Fixed DynamicIcon error if icon name is not passed

1.22.0
[feature] Added Typography component

1.21.7
[fix] Boolean labels in table filters not visible.

Moved the translation of boolean filters' labels to smartTable/filtering.setupFilters function,
which is used for both Table filters and GlobalFilters

1.21.6
Components Improvements

1. ActionButtons
  - support displaying button with icon and iconOnly button
  - support passing component wide size property and apply to any buttons that are not displayed as links
2. Table - allow ant-btn-link to wrap
  - enforce size "small" for ActionButtons buttons that used in rows
3. TagsList - fix key prop and allow to pass Space component props (ie wrap)
4. GlobalFilters - support segmented component

1.21.5
Added Button.Reload

This way it can be reused whenever needed but is still a Button component (no additional export required.)

1.21.4
Allow to forward more props to antd's forms.

Both Form and StepForm were controlling all props received and passed to the antd's Form.
This causes updating the library with any not controlled props, which is an unecessary overhead.

Not controlled props are now passed through to the antd's Form component.

1.21.3
Improved ErrorsList look.

It now has a light gray background and blackish text which makes it more smooth while still clearly being a separate section.

1.21.2
Downgraded zustand to 4.3.0 as it was breaking the build.

Zustand deprecates the default exports and changes from 4.3.0 onwards change how do they determine when to show the deprecation working.

1.21.1
Nested values support for ProDescriptions components (dot notation)

v1.21.0
Added support for WebSockets

1. StageUI can now initialise with WebSocket client (which at the moment is Pusher)
2. Added clients/websocketClient, which replaces utilities/pusher
3. Added hooks/useWebsocket, which currently integrates with usePusher hook
4. Added GlobalAlerts support

The reason for using WebSocket naming instead of pusher and adding the client and useWebsocket hooks is a step towards generalising (decoupling) the functionality from Pusher and allowing for more easier replacement of the WebSocket's client.

v1.20.2
Improved multiselect global filter

v1.20.1
Improved nested errors list render

v1.20.0
Made ErrorsList a separate component and added ResultsTable

v1.19.1
Added ability to change breadcrumb name by passed "buildBreadcrumbNames" parameter function

v1.19.0
Added AutoComplete component

v1.18.1
1. Added TagsList component
2. Added ability to render list of Tags for ProDescriptions component
3. Improved smart table buildColumns utility to pass additional properties to the column if such are passed

v1.18.0
Add multi_select filter

v1.17.1
Improved layout rendering flow

v1.17.0
Dependencies - 01/03/23
1. ef83dd0 Bump @babel/cli from 7.19.3 to 7.21.0 (#46)
2. 7ccea9c Bump @babel/runtime from 7.20.6 to 7.21.0 (#45)
3. dda54cc Bump @babel/core from 7.20.5 to 7.21.0 (#43)
4. d5b91d1 Bump eslint-plugin-jsx-a11y from 6.6.1 to 6.7.1 (#37)
5. 887f779 Bump eslint-config-prettier from 8.5.0 to 8.6.0 (#30)
6. e7e1ee8 Bump jest-environment-jsdom from 29.3.1 to 29.4.3 (#29)
7. 5fd442a Bump http-cache-semantics from 4.1.0 to 4.1.1 (#13)
8. 24ff950 Bump eslint-plugin-import from 2.26.0 to 2.27.5 (#36)
9. ea3f654 Bump eslint from 8.29.0 to 8.34.0 (#34)
10. 70d6ce1 Bump eslint-plugin-react from 7.31.11 to 7.32.2 (#26)
11. cef1adb Bump prettier from 2.8.0 to 2.8.4 (#25)
12. 7bb74a1 Bump @rollup/plugin-commonjs from 23.0.3 to 24.0.1 (#41)
13. 6b48ee4 Bump @rollup/plugin-alias from 4.0.2 to 4.0.3 (#35)
14. 689fec8 Bump @craco/craco from 6.4.5 to 7.0.0 (#32)
15. 9c34cad Bump humanize-duration from 3.27.3 to 3.28.0 (#27)
16. 949dfdf Bump pusher-js from 7.6.0 to 8.0.1 (#40)
17. a10e61d Bump zustand from 4.3.1 to 4.3.3 (#39)
18. 467e012 Bump json-server from 0.17.1 to 0.17.2 (#53)
19. bd93fd8 Bump sql-formatter from 12.1.0 to 12.1.2 (#47)
20. ab603de Bump rollup-plugin-filesize from 9.1.2 to 10.0.0 (#57)
21. 38ffd67 Bump eslint from 8.34.0 to 8.35.0 (#54)
22. e4bc6e2 Bump zustand from 4.3.3 to 4.3.5 (#59)
23. f9bb689 Bump antd from 5.0.7 to 5.2.3 (#55)

v1.16.0
1. Passed functionActionHandler to Table component to handle actions with "function" type
2. Returned response status from fetchJson utility
3. Added flattenObject utility
4. Added preStepSubmit, allowSubmit and allowBack functionality to step form, so now it allows to control actions for each step
5. Added isLoading state for ResponseResult

v1.15.0
Add Checkbox and Switch filter types

v1.14.0
Allow to pass custom headers to api.get

v1.13.1
ProDescriptions - handle bools correctly.

Fixes a bug, where EMPTY would be displayed for a false value, ignoring valueEnum and any other configuration.

v1.13.0
Receive editor snippets via props and register them.

v1.12.0
Replaced ant-design/pro-components ProDescriptions with a custom built.

This allows for more control over the descriptions and allows easier definition of custom valueTypes.

* removed @ant-design/pro-components as is not used anywhere

v1.11.0
[TEM-106] Replaced PageContainer with custom component

v1.10.0
[TEM-25] Allow to pass onSuccess to loadCollection and fix filters valueEnum

* also, fix ActionButtons crashing when empty actions array received

v1.9.0
Tables Improvements & New Components

1. Utilise received response actions in tables
  - set actions in collection state
  - display just Button if only one action is present (but use ButtonGroup
  if more than one)
  - fix translatingLink action mutating the action options
  - pass actions to Table and extend columns' render with them if there
  are actions for a table_row
  - make table generate a column title based on the key when not using ColumnsConfig
  - refactored table/buildColumns util
2. Added StatesHistory, StateTag and StageBadge

v1.8.1
Added Badge component

v1.8.0
[TEM-97] Make Select component build options based on received valueEnum or enums.

Also added findNested to object utility which is usefull for finding deeply nested keys in big objects.

v1.7.0
1. Added displayMessage utility
2. Added Collapse component
3. Added Row and Col components
4. Added Space component
5. Added Switch component
6. Added Tag component

v1.6.0
1. Added editor component
2. Fixed SideForm preFinish button conditional render if parameter is not passed
3. Added RootModal component and related store actions and state
4. Added ResponseResult component
5. Added response utilities

v1.5.0
Introduced ActionButtons component.

It is able to build buttons for received actions hash in response.
Can build link or function button at the moment - function button requires functionHandlers to be passed for it.

v1.4.0
[TEM-105] Added RequestTable and replaced ProCard with Card

Breaking:
1. Removed ProCard, added Card instead

New:
1. RequestTable, that is able to fetch the data, refetch it and display it in passed in TableCompoent
2. Card.Table which allows for more unified look when using Cards and Tables next to each other (differences in how title is displayed and handled)
3. Added Toolbar to Table which allows to render more than just a title copy

Fixes:
1. Fixed PageContainer's locale

v1.3.0
Added PageContainer, ProCard and ProDescriptions from ant-design/pro-components

1. https://procomponents.ant.design/en-US/components/page-container
   - Implementation changed a bit in order to render Tabs in body (as a child) instead of PageHeaderFooter.
   - Builds breadcrumbs automatically
2. https://procomponents.ant.design/en-US/components/descriptions
3. https://procomponents.ant.design/en-US/components/card

v1.2.1
[fix] Navigation improvements

1. Use window.location.replace instead of history.replaceState - the
latter only replaces the pathname and does not trigger the redirect
2. Currently find open/selected keys in the navigation
3. Pass set window.externalClientsSelect basing on clientsMultiselect value

v1.2.0
fetchJson - Return responseBody without modifying it.

This will allow more systems to use this utility.

v1.1.10
[fix] TopNav was being built twice; react-router-dom cannot be used at the moment

To make it easier for later possible switch, custom useLocation and useNavigate hooks were added.

v1.1.9
Fixed circular dependencies

v1.1.8
Fixed import and dependency for Layout component

v1.1.7
1. Moved onSideMenuSelect to the parameters of Layout component
2. Added logic to set default clients select value from url params
3. Disabled all clients deselect. So at least one should always be selected

v1.1.6
Fixed clients select min width

v1.1.5
Fixed globalStyle import

v1.1.4
1. Added colors constants from stage_style
2. Added "All clients" label for Layout clients select

v1.1.3
Fixed menu keys format and navigation function logic

v1.1.2
Fixed default menu item keys setting logic

v1.1.1
Changed the way stage_styles integrated to the Layout component

v1.1.0
1. Added globalStyles that exports general styles
2. Added Layout component, which includes stage_styles menu, sidebar from antd and clients multiselect
3. Added DynamicIcon component to be able to render icon, which is not known at the moment of the build (i.e. comes from BE)
4. Added COLORS constant

v1.0.0
Finished integration with query_panel

v0.5.6
[fix] Fixed buildNewRecord function rename

v0.5.5
1. Removed EditableList component
2. Removed ListWithForm component
3. Renamed newRecord checkIfRecordIsNew utility with checkIsNew
4. Removed hasUnsaved changes flag change on store removeItem call

v0.5.4
1. Removed DependencyChart and oneDrive
2. Renamed date and newRecord utilities

v0.5.3
Covered store with tests

v0.5.2
Fixed newRecord utilities import for inline editable table

v0.5.1
Fixed access variable before initialization error

v0.5.0
Integrated actions/store

v0.4.2
Reused baseUrl for fetch utility

v0.4.1
Added pusher utility and used it for usePusher hook

v0.4.0
1. Added root store to save pro config
2. Used store property for proWrapped HOCs
3. Replaced imports for components that uses proWrapped HOCs

v0.3.1
Fixed dependencies chart

v0.3.0
Changed rollup config to support global variables and store

v0.2.1
Dependencies chart integration changes

v0.2.0
Exported components for integration

v0.1.1
Integrated utilities

v0.1.0
Integrated:
1. hooks
2. HOCs
3. constants

v0.0.1
Initial setup:
1. Set Up files structure and moved /common files
2. rollup config
3. /actions/api integration related changes
