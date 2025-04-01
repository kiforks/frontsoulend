(self.webpackChunkfrontsoulend=self.webpackChunkfrontsoulend||[]).push([[147,393],{"./libs/angular/ui/src/modules/media/directives/media-desktop/stories/media-desktop.directive.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>MDXContent});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_home_runner_work_frontsoulend_frontsoulend_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),_media_desktop_directive_stories_ts__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./libs/angular/ui/src/modules/media/directives/media-desktop/stories/media-desktop.directive.stories.ts");function _createMdxContent(props){const _components={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,_home_runner_work_frontsoulend_frontsoulend_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_2__.R)(),...props.components};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_3__.W8,{of:_media_desktop_directive_stories_ts__WEBPACK_IMPORTED_MODULE_4__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h1,{id:"mediadesktop",children:"MediaDesktop"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["The ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"MediaDesktopDirective"})," uilies a ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.strong,{children:"desktop-specific media query"})," to control content visibility.\nThe content will only be visible when the viewport matches a ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.strong,{children:"desktop breakpoint"}),"."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"overview",children:"Overview"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_3__.Hl,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_3__.gG,{of:_media_desktop_directive_stories_ts__WEBPACK_IMPORTED_MODULE_4__.Overview})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"props",children:"Props"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_3__.H2,{}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"usage",children:"Usage"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["Use the directive in your component template to display content ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.strong,{children:"only on desktop devices"}),":"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.pre,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{className:"language-html",children:"<div *uiMediaDesktop>This content will only be visible on desktop devices.</div>\n\n<ng-template #elseRef>\n\t<p>Fallback content when the conditions are not met.</p>\n</ng-template>\n"})})]})}function MDXContent(props={}){const{wrapper:MDXLayout}={...(0,_home_runner_work_frontsoulend_frontsoulend_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_2__.R)(),...props.components};return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,{...props,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}},"./libs/angular/ui/src/modules/media/directives/media-desktop/stories/media-desktop.directive.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Overview:()=>Overview,__namedExportsOrder:()=>__namedExportsOrder,default:()=>media_desktop_directive_stories});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),media_service=__webpack_require__("./libs/angular/ui/src/modules/media/services/media/media.service.ts"),media_token=__webpack_require__("./libs/angular/ui/src/modules/media/tokens/media.token.ts"),media_device_directive=__webpack_require__("./libs/angular/ui/src/modules/media/directives/media-device/media-device.directive.ts");let MediaDesktopDirective=class MediaDesktopDirective{constructor(){this.checkMedia=(0,core.inject)(media_service.u).mediaDesktop}};MediaDesktopDirective=(0,tslib_es6.Cg)([(0,core.Directive)({selector:"[uiMediaDesktop]",standalone:!0,providers:[{provide:media_token.AO,useExisting:MediaDesktopDirective}],hostDirectives:[media_device_directive.q]})],MediaDesktopDirective);const media_desktop_directive_stories={component:MediaDesktopDirective,title:"Media/Directives/MediaDesktop",tags:["directives"]},Overview={render:()=>({template:"\n            Resize the viewport to a <b>desktop</b> width to see the content.\n            \n      <div *uiMediaDesktop>\n         This content is only visible on mobile devices.\n      </div>\n    "})},__namedExportsOrder=["Overview"];Overview.parameters={...Overview.parameters,docs:{...Overview.parameters?.docs,source:{originalSource:"{\n  render: () => ({\n    template: `\n            Resize the viewport to a <b>desktop</b> width to see the content.\n            \n      <div *uiMediaDesktop>\n         This content is only visible on mobile devices.\n      </div>\n    `\n  })\n}",...Overview.parameters?.docs?.source}}}},"./libs/angular/ui/src/modules/media/directives/media-device/media-device.directive.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{q:()=>MediaDeviceDirective});var tslib__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@angular/core/fesm2022/rxjs-interop.mjs"),rxjs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/distinctUntilChanged.js"),_tokens__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./libs/angular/ui/src/modules/media/tokens/media.token.ts");let MediaDeviceDirective=class MediaDeviceDirective{constructor(){this.templateRef=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef),this.viewContainerRef=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewContainerRef),this.mediaDevice=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_tokens__WEBPACK_IMPORTED_MODULE_1__.AO),this.observeMediaDevice()}observeMediaDevice(){this.mediaDevice.checkMedia.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.F)(),(0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_3__.pQ)()).subscribe((isMatched=>isMatched?this.viewContainerRef.createEmbeddedView(this.templateRef):this.viewContainerRef.clear()))}static{this.ctorParameters=()=>[]}};MediaDeviceDirective=(0,tslib__WEBPACK_IMPORTED_MODULE_4__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive)({selector:"[uiMediaDevice]",standalone:!0}),(0,tslib__WEBPACK_IMPORTED_MODULE_4__.Sn)("design:paramtypes",[])],MediaDeviceDirective)},"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{R:()=>useMDXComponents,x:()=>MDXProvider});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const emptyComponents={},MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext(emptyComponents);function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((function(){return"function"==typeof components?components(contextComponents):{...contextComponents,...components}}),[contextComponents,components])}function MDXProvider(properties){let allComponents;return allComponents=properties.disableParentContext?"function"==typeof properties.components?properties.components(emptyComponents):properties.components||emptyComponents:useMDXComponents(properties.components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},properties.children)}},"./node_modules/@storybook/blocks/dist sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/blocks/dist sync recursive",module.exports=webpackEmptyContext},"./node_modules/@storybook/core/dist/components sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/components sync recursive",module.exports=webpackEmptyContext},"./node_modules/@storybook/core/dist/theming sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/theming sync recursive",module.exports=webpackEmptyContext}}]);