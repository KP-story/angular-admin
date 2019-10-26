"use strict";

require("core-js/modules/es.array.concat");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _Base = _interopRequireDefault(require("../../components/base/Base.form"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Base.default.apply(void 0, [[{
    key: 'display',
    components: [{
      type: 'textfield',
      label: 'Image Url',
      input: true,
      key: 'imageUrl',
      weight: 20
    }, {
      type: 'textfield',
      label: 'Width',
      input: true,
      key: 'width',
      weight: 20
    }, {
      type: 'textfield',
      label: 'Height',
      input: true,
      key: 'height',
      weight: 20
    }, {
      type: 'textfield',
      label: 'Default Zoom',
      input: true,
      key: 'defaultZoom',
      placeholder: '100',
      weight: 20
    }, {
      type: 'textfield',
      label: 'Default Stroke Color',
      description: 'Start with # sign',
      input: true,
      key: 'defaultStroke',
      placeholder: '#333',
      weight: 20
    }, {
      type: 'textfield',
      label: 'Default Fill Color',
      description: 'Start with # sign',
      input: true,
      key: 'defaultFill',
      placeholder: '#ccc',
      weight: 20
    }, {
      type: 'number',
      label: 'Default Line Width',
      input: true,
      key: 'defaultLineWidth',
      placeholder: '1',
      weight: 20
    }, {
      type: 'number',
      label: 'Default Circle Size',
      input: true,
      key: 'defaultCircleSize',
      placeholder: '10',
      weight: 20
    }]
  }]].concat(extend));
}