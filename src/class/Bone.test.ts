import { Bone } from './Bone';
import { fireEvent } from '@testing-library/dom';

describe('class Bone', () => {
  it('should be <div>', () => {
    const bone = new Bone('div', {}, null);
    const element = bone.element;

    expect(element).toBeInstanceOf(HTMLElement);
    expect(element).toHaveProperty('tagName', 'DIV');
  });

  it('should be <svg>', () => {
    const bone = new Bone('svg', {}, null);
    const element = bone.element;

    expect(element).toBeInstanceOf(SVGElement);
    expect(element).toHaveProperty('tagName', 'svg');
  });

  it('should be div with 3 children', () => {
    const div = new Bone('div', {}, null);
    const span = new Bone('span', {}, null);
    const strong = new Bone('strong', {}, null);
    const main = new Bone('div', {}, [div.element, span.element, strong.element]);
    const element = main.element;

    expect(element.children.length).toEqual(3);
    expect(Bone.getBonesCount()).toEqual(6);
  });

  it('should be deep children', () => {
    const strong = new Bone('strong', {}, ['Hello World']);
    const span = new Bone('span', {}, [strong.element, strong.element, strong.element]);
    const span2 = new Bone('span', {}, [strong.element]);
    const span3 = new Bone('span', {}, [strong.element]);
    const div = new Bone('div', {}, [span.element, span2.element, span3.element, span2.element]);
    const main = new Bone('main', {}, [div.element]);
    const element = main.element;

    //TODO Fix element copy
    expect(element.outerHTML).toEqual(
      '<main><div><span></span><span><strong>Hello World</strong></span><span></span></div></main>'
    );
  });

  it('should be boolean props with true values', () => {
    const props = { disabled: true, readonly: true, checked: true };
    const main = new Bone('main', props, null);
    const element = main.element;

    const attrs = element.getAttributeNames();
    expect(attrs).toContainEqual('disabled');
    expect(attrs).toContainEqual('readonly');
    expect(attrs).toContainEqual('checked');
    expect(attrs.length).toBe(3);
  });

  it('should be dont set fn, undefined & flase as attrs', () => {
    const fn = jest.fn();
    const props = {
      onSubmit: fn,
      ref: fn,
      key: 1,
      'data-key': undefined,
      class: undefined,
      disabled: false
    };
    const form = new Bone('form', props, null);
    const element = form.element;

    expect(element.getAttributeNames().length).toBe(0);
  });

  it('should be ref as function', () => {
    const callback = jest.fn();
    const props = { ref: callback };
    const main = new Bone('main', props, null);
    main.element;

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should be click call once', () => {
    const onClick = jest.fn();
    const props = {
      onClick
    };
    const button = new Bone<HTMLButtonElement>('button', props, null);
    const element = button.element;

    fireEvent.click(element);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should be input change', () => {
    const onChange = jest.fn();
    const props = {
      onInput: onChange
    };
    const input = new Bone<HTMLInputElement>('input', props, null);
    const element = input.element;

    fireEvent.input(element, { target: { value: '123' } });

    expect(element.value).toBe('123');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should be textarea change', () => {
    const onChange = jest.fn();
    const props = {
      onInput: onChange
    };
    const textarea = new Bone<HTMLTextAreaElement>('textarea', props, null);
    const element = textarea.element;

    fireEvent.input(element, { target: { value: '123' } });

    expect(element.value).toBe('123');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should be key down', () => {
    const onKeyDown = jest.fn();
    const props = {
      onKeyDown
    };
    const textarea = new Bone<HTMLTextAreaElement>('textarea', props, null);

    fireEvent.keyDown(textarea.element);

    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  it('should be form submit after button click', () => {
    const button = new Bone('button', { type: 'submit' }, null);
    const onSubmit = jest.fn((e) => e.preventDefault());
    const form = new Bone(
      'form',
      {
        onSubmit
      },
      [button.element]
    );
    const element = form.element;
    document.body.append(element);

    fireEvent.click(button.element);

    expect(onSubmit).toHaveBeenCalledTimes(1);

    document.body.removeChild(element);
  });
});
