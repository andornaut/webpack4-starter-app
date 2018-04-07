import { html, render } from 'lit-html/lib/lit-extended';
import { repeat } from 'lit-html/lib/repeat';
import { getState } from './state';

const isView = exp => typeof exp === 'function' && exp.__jetsonView;

const onlyOnce = (fn) => {
  let called = false;
  return (...args) => {
    if (called) {
      throw new Error(`Invalid attempt to call: ${fn}`);
    }
    called = true;
    return fn(...args);
  };
};

const createChildGetter = (el) => {
  const children = el.__jetsonChildren || (el.__jetsonChildren = new Map());
  return (key) => {
    if (key === undefined || key === null) {
      throw new Error(`Invalid child key: ${key}`);
    }
    let child = children.get(key);
    if (!child) {
      child = document.createDocumentFragment();
      children.set(key, child);
    }
    return child;
  };
};

const createRender = (el, renderView) => {
  const getChild = createChildGetter(el);
  return (strings, ...exps) => {
    exps = exps.map((exp, i) => (isView(exp) ? renderView(getChild(i), exp) : exp));
    const templateResult = html(strings, ...exps);
    render(templateResult, el);
    return el;
  };
};

export const renderView = (el, view) => {
  el.render = () => view(onlyOnce(createRender(el, renderView)), getState());
  el.render();
  return el;
};

export const view = fn => (...args) => {
  /* eslint-disable-next-line no-shadow */
  const wrapper = (render, state) => {
    fn(
      {
        html,
        render,
        repeat,
        state,
      },
      ...args,
    );
  };
  wrapper.__jetsonView = true;
  return wrapper;
};
