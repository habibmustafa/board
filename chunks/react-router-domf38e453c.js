import{r,a as T}from"./react5f94ee5b.js";import"./react-dom5026c56d.js";import{R as p}from"./react-router1415574f.js";import{c as F}from"./@remix-run745946b7.js";/**
 * React Router DOM v6.24.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const U="6";try{window.__reactRouterVersion=U}catch{}const b="startTransition",l=T[b];function _(t){let{basename:f,children:h,future:n,window:R}=t,s=r.useRef();s.current==null&&(s.current=F({window:R,v5Compat:!0}));let e=s.current,[o,i]=r.useState({action:e.action,location:e.location}),{v7_startTransition:a}=n||{},c=r.useCallback(u=>{a&&l?l(()=>i(u)):i(u)},[i,a]);return r.useLayoutEffect(()=>e.listen(c),[e,c]),r.createElement(p,{basename:f,children:h,location:o.location,navigationType:o.action,navigator:e,future:n})}var m;(function(t){t.UseScrollRestoration="useScrollRestoration",t.UseSubmit="useSubmit",t.UseSubmitFetcher="useSubmitFetcher",t.UseFetcher="useFetcher",t.useViewTransitionState="useViewTransitionState"})(m||(m={}));var S;(function(t){t.UseFetcher="useFetcher",t.UseFetchers="useFetchers",t.UseScrollRestoration="useScrollRestoration"})(S||(S={}));export{_ as B};
