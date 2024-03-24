import { h } from "htm/preact";
import register from "preact-custom-element";

/**
 * @template P
 * @typedef {import('preact').FunctionComponent<P>} FunctionComponent<P>
 * */
/**
 * @template P
 * @typedef {import('preact').ComponentClass<P>} ComponentClass<P>
 * */
/**
 * @template P
 * @typedef {import('preact').FunctionalComponent<P>} FunctionalComponent<P>
 * */

/**
 * @template {{}} P
 * @param {FunctionComponent<P> | ComponentClass<P> | FunctionalComponent<P>} componentDefinition
 * @param {string} tagName
 * @param {string[]} [observedAttributes]
 * @param {{ shadow: boolean, mode?: 'open' | 'closed' }} [options]
 * @returns {FunctionComponent<P> | ComponentClass<P> | FunctionalComponent<P>}
 */
export function clientDefine(
  componentDefinition,
  tagName,
  observedAttributes,
  options,
) {
  register(componentDefinition, tagName, observedAttributes, options);

  return componentDefinition;
}

/**
 * @template {{}} P
 * @param {FunctionComponent<P> | ComponentClass<P> | FunctionalComponent<P>} componentDefinition
 * @param {string} tagName
 * @param {string[]} [observedAttributes]
 * @param {{ shadow: boolean, mode?: 'open' | 'closed' }} [options]
 * @returns {FunctionComponent<P> | ComponentClass<P> | FunctionalComponent<P>}
 */
export function serverDefine(
  componentDefinition,
  tagName,
  // @ts-ignore
  observedAttributes,
  options,
) {
  return (props) =>
    h(tagName, props, [
      options?.shadow
        ? h(
            // @ts-ignore
            "template",
            { shadowrootmode: options.mode ?? "open" },
            h(componentDefinition, props),
          )
        : h(componentDefinition, props),
    ]);
}

/**
 * @template {{}} P
 * @param {FunctionComponent<P> | ComponentClass<P> | FunctionalComponent<P>} componentDefinition
 * @param {string} tagName
 * @param {string[]} [observedAttributes]
 * @param {{ shadow: boolean, mode?: 'open' | 'closed' }} [options]
 * @returns {FunctionComponent<P> | ComponentClass<P> | FunctionalComponent<P>}
 */
export function define(
  componentDefinition,
  tagName,
  observedAttributes,
  options,
) {
  return typeof window === "undefined"
    ? serverDefine(componentDefinition, tagName, observedAttributes, options)
    : clientDefine(componentDefinition, tagName, observedAttributes, options);
}
