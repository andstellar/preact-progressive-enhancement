# preact-progressive-enhancement

This package is used for progressive enhancement of web components during SSR. 

## Install
### npm
```
npm i preact-progressive-enhancement
```

### pnpm
```
pnpm i preact-progressive-enhancement
```

### yarn
```
yarn add preact-progressive-enhancement
```

## Usage
### Component definition
```
import { define } from "preact-progressive-enhancement";

const MyComponent = (props) => {
    ...
}

export const MyLightDOMWebComponent = define(MyComponent, 'my-component', ['attribute1', 'attribute2'], { shadow: false })

// OR

export const MyShadowDOMWebComponent = define(MyComponent, 'my-component', ['attribute1', 'attribute2'], { shadow: true, mode: 'open' })

```

### Server-side
```
import { html } from "htm/preact";
import { prerender } from "preact-iso";

import { MyShadowDOMWebComponent } from "../my-component.js";

const ssrResult = prerender(html`<${MyShadowDOMWebComponent} attribute1="value1"><//>`)
```

Which will return:
```
<my-component attribute1="value1">
    <template shadowrootmode="open">
        ...
    </template>
</my-component>
```

### Client-side
In any HTML, both of these will be hydrated properly in the browser:
```
<my-component attribute1="value1">
    <template shadowrootmode="open">
        ...
    </template>
</my-component>

<my-component attribute2="value2"></my-component>

<script type="module" src="/components/my-component.js"></script>
```