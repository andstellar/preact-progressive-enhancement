import { expect } from "@esm-bundle/chai";
import { html } from "htm/preact";
import { prerender } from "preact-iso";

import { serverDefine } from "../lib/index.js";

/**
 *
 * @param {{name: string}} PROPS
 * @returns {import("preact").VNode<{}>}
 */
const testComponent = ({ name }) => {
  return html`Hello, ${name}!`;
};

it("server prerenders light DOM components", async () => {
  const TestLightDomComponent = serverDefine(testComponent, "test-light", [], {
    shadow: false,
  });

  const result = await prerender(
    html`<${TestLightDomComponent} name="Tester"><//>`,
  );

  expect(result.html).to.equal(
    '<test-light name="Tester">Hello, Tester!</test-light><script type="isodata"></script>',
  );
  expect(result.links).to.deep.equal(new Set());
});

it("server prerenders open shadow DOM components", async () => {
  const TestOpenShadowDomComponent = serverDefine(
    testComponent,
    "test-shadow-open",
    [],
    { shadow: true, mode: "open" },
  );

  const result = await prerender(
    html`<${TestOpenShadowDomComponent} name="Tester"><//>`,
  );

  expect(result.html).to.equal(
    '<test-shadow-open name="Tester"><template shadowrootmode="open">Hello, Tester!</template></test-shadow-open><script type="isodata"></script>',
  );
  expect(result.links).to.deep.equal(new Set());
});

it("server prerenders closed shadow DOM components", async () => {
  const TestClosedShadowDomComponent = serverDefine(
    testComponent,
    "test-shadow-closed",
    [],
    { shadow: true, mode: "closed" },
  );

  const result = await prerender(
    html`<${TestClosedShadowDomComponent} name="Tester"><//>`,
  );

  expect(result.html).to.equal(
    '<test-shadow-closed name="Tester"><template shadowrootmode="closed">Hello, Tester!</template></test-shadow-closed><script type="isodata"></script>',
  );
  expect(result.links).to.deep.equal(new Set());
});
