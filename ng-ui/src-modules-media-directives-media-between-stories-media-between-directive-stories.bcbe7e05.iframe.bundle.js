"use strict";(self.webpackChunkfrontsoulend=self.webpackChunkfrontsoulend||[]).push([[859],{"./libs/angular/ui/src/modules/condition/directives/condition/condition.directive.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{X:()=>ConditionDirective});var tslib__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_tokens__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./libs/angular/ui/src/modules/condition/tokens/condition.token.ts");let ConditionDirective=class ConditionDirective{constructor(templateRef){this.templateRef=templateRef,this.condition=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.input)(!1,{alias:"uiCondition"}),this.or=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.input)(!1,{alias:"uiConditionOr"}),this.and=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.input)(!0,{alias:"uiConditionAnd"}),this.else=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.input)(null,{alias:"uiConditionElse"}),this.element=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_tokens__WEBPACK_IMPORTED_MODULE_1__.U,{optional:!0}),this.viewContainerRef=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewContainerRef),(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.effect)((()=>this.render()))}render(){const context=this.element?.context||{},condition=(this.element?.condition()??this.condition())&&this.and()||this.or(),elseTemplateRef=this.else();this.viewContainerRef.clear(),condition?this.viewContainerRef.createEmbeddedView(this.templateRef,context):elseTemplateRef?this.viewContainerRef.createEmbeddedView(elseTemplateRef,context):this.viewContainerRef.clear()}static{this.ctorParameters=()=>[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef}]}static{this.propDecorators={condition:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,args:[{isSignal:!0,alias:"uiCondition",required:!1,transform:void 0}]}],or:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,args:[{isSignal:!0,alias:"uiConditionOr",required:!1,transform:void 0}]}],and:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,args:[{isSignal:!0,alias:"uiConditionAnd",required:!1,transform:void 0}]}],else:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,args:[{isSignal:!0,alias:"uiConditionElse",required:!1,transform:void 0}]}]}}};ConditionDirective=(0,tslib__WEBPACK_IMPORTED_MODULE_2__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive)({selector:"[uiCondition]",standalone:!0}),(0,tslib__WEBPACK_IMPORTED_MODULE_2__.Sn)("design:paramtypes",[_angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef])],ConditionDirective)},"./libs/angular/ui/src/modules/condition/tokens/condition.token.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{U:()=>CONDITION_KEYWORD});const CONDITION_KEYWORD=new(__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs").InjectionToken)("CONDITION_KEYWORD")},"./libs/angular/ui/src/modules/media/directives/media-base/media-base.directive.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{b:()=>MediaBaseDirective});var tslib__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@angular/core/fesm2022/rxjs-interop.mjs"),rxjs__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/switchMap.js"),rxjs__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/distinctUntilChanged.js"),_tokens__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./libs/angular/ui/src/modules/media/tokens/media.token.ts");let MediaBaseDirective=class MediaBaseDirective{constructor(){this.mediaElement=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_tokens__WEBPACK_IMPORTED_MODULE_1__.ys),this.breakpoint$=(0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_2__.br)(this.mediaElement.breakpoint),this.observeBreakpoint()}observeBreakpoint(){this.breakpoint$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.n)((breakpoint=>this.mediaElement.checkMedia(breakpoint))),(0,rxjs__WEBPACK_IMPORTED_MODULE_4__.F)(),(0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_2__.pQ)()).subscribe((isMatched=>this.mediaElement.condition.set(isMatched)))}static{this.ctorParameters=()=>[]}};MediaBaseDirective=(0,tslib__WEBPACK_IMPORTED_MODULE_5__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive)({selector:"[uiMediaBase]",standalone:!0}),(0,tslib__WEBPACK_IMPORTED_MODULE_5__.Sn)("design:paramtypes",[])],MediaBaseDirective)},"./libs/angular/ui/src/modules/media/directives/media-between/stories/media-between.directive.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Overview:()=>Overview,__namedExportsOrder:()=>__namedExportsOrder,default:()=>media_between_directive_stories});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),media_service=__webpack_require__("./libs/angular/ui/src/modules/media/services/media/media.service.ts"),condition_token=__webpack_require__("./libs/angular/ui/src/modules/condition/tokens/condition.token.ts"),condition_directive=__webpack_require__("./libs/angular/ui/src/modules/condition/directives/condition/condition.directive.ts"),media_token=__webpack_require__("./libs/angular/ui/src/modules/media/tokens/media.token.ts"),media_base_directive=__webpack_require__("./libs/angular/ui/src/modules/media/directives/media-base/media-base.directive.ts");let MediaBetweenDirective=class MediaBetweenDirective{constructor(){this.breakpoint=core.input.required({alias:"uiMediaBetween"}),this.condition=(0,core.signal)(!1),this.checkMedia=(0,core.inject)(media_service.u).mediaBetween}static{this.propDecorators={breakpoint:[{type:core.Input,args:[{isSignal:!0,alias:"uiMediaBetween",required:!0,transform:void 0}]}]}}};MediaBetweenDirective=(0,tslib_es6.Cg)([(0,core.Directive)({selector:"[uiMediaBetween]",standalone:!0,providers:[{provide:media_token.ys,useExisting:MediaBetweenDirective},{provide:condition_token.U,useExisting:MediaBetweenDirective}],hostDirectives:[media_base_directive.b,{directive:condition_directive.X,inputs:["uiConditionAnd: uiMediaBetweenAnd","uiConditionElse: uiMediaBetweenElse","uiConditionOr: uiMediaBetweenOr"]}]})],MediaBetweenDirective);const media_between_directive_stories={component:MediaBetweenDirective,title:"Media/Directives/MediaBetween",args:{breakpoint:["md","lg"],and:!0,or:!1,else:null},argTypes:{breakpoint:{control:"select",options:[["sm","md"],["sm","lg"],["sm","xl"],["sm","xxl"],["md","lg"],["md","xl"],["md","xxl"],["lg","xl"],["lg","xxl"],["xl","xxl"]],description:"Defines the screen size range in which the content should be displayed."},and:{control:"boolean",description:"Combines conditions with a logical AND."},or:{control:"boolean",description:"Combines conditions with a logical OR."},else:{table:{readonly:!0},control:"object",description:"Defines the fallback template if conditions are not met."}},tags:["directives"]},Overview={render:({breakpoint,and,or,else:elseTemplate})=>({props:{breakpoint,and,or,elseTemplate},template:`\n      <div *uiMediaBetween="['${breakpoint.at(0)}', '${breakpoint.at(-1)}']; or: ${or}; and: ${and}; else: elseRef">\n        This content is visible between the "{{ breakpoint.at(0) }}" and "{{ breakpoint.at(-1) }}" breakpoints.\n      </div>\n      \n      <ng-template #elseRef>\n        <p>Fallback content when the conditions are not met.</p>\n      </ng-template>\n    `})},__namedExportsOrder=["Overview"];Overview.parameters={...Overview.parameters,docs:{...Overview.parameters?.docs,source:{originalSource:'{\n  render: ({\n    breakpoint,\n    and,\n    or,\n    else: elseTemplate\n  }) => ({\n    props: {\n      breakpoint,\n      and,\n      or,\n      elseTemplate\n    },\n    template: `\n      <div *uiMediaBetween="[\'${breakpoint.at(0)}\', \'${breakpoint.at(-1)}\']; or: ${or}; and: ${and}; else: elseRef">\n        This content is visible between the "{{ breakpoint.at(0) }}" and "{{ breakpoint.at(-1) }}" breakpoints.\n      </div>\n      \n      <ng-template #elseRef>\n        <p>Fallback content when the conditions are not met.</p>\n      </ng-template>\n    `\n  })\n}',...Overview.parameters?.docs?.source}}}}}]);