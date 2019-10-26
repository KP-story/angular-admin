export const ResourceMetadata = Object.freeze({
  //  BASE_API_URL: 'http://localhost:8080/telsoft_admin_rest',
  VIEW_CREATE_FORM: {
    'display': 'form',
    'components': [
      {
        'label': 'Name',
        'allowMultipleMasks': false,
        'persistent': false,
        'showWordCount': false,
        'showCharCount': true,
        'tableView': true,
        'alwaysEnabled': false,
        'type': 'textfield',
        'input': true,
        'key': 'name',
        'defaultValue': '',
        'validate': {
          'required': true,
          'customMessage': 'Phải Có ít nhất 2 kí tự',
          'json': '',
          'minLength': 2
        },
        'conditional': {
          'show': '',
          'when': '',
          'json': ''
        },
        'widget': {
          'type': ''
        },
        'inputFormat': 'plain',
        'encrypted': false,
        'reorder': false,
        'properties': {},
        'customConditional': '',
        'logic': []
      },
      {
        'label': 'Status',
        'mask': false,
        'tableView': true,
        'alwaysEnabled': false,
        'type': 'select',
        'input': true,
        'key': 'status',
        'defaultValue': '',
        'validate': {
          'customMessage': 'Lựa chọn 1 trong số các trạng thái',
          'json': '',
          'required': true,
          'select': false
        },
        'conditional': {
          'show': '',
          'when': '',
          'json': ''
        },
        'data': {
          'values': [
            {
              'label': 'Active',
              'value': 'Active'
            },
            {
              'label': 'Inactive',
              'value': 'Inactive'
            }
          ]
        },
        'valueProperty': 'value',
        'selectThreshold': 0.3,
        'encrypted': false,
        'lazyLoad': false,
        'selectValues': '',
        'disableLimit': false,
        'sort': '',
        'reference': false,
        'properties': {},
        'customConditional': '',
        'logic': [],
        'reorder': false
      },
      {
        'tags': [],
        'input': false,
        'label': 'Create',
        'tableView': false,
        'key': 'submit',
        'size': 'md',
        'leftIcon': '',
        'rightIcon': '',
        'block': false,
        'action': 'submit',
        'disableOnInvalid': true,
        'theme': 'primary',
        'type': 'button',
        'autofocus': false
      }
    ],
    'settings': {
      'pdf': {
        'id': '1ec0f8ee-6685-5d98-a847-26f67b67d6f0',
        'src': 'https://files.form.io/pdf/5692b91fd1028f01000407e3/file/1ec0f8ee-6685-5d98-a847-26f67b67d6f0'
      }
    }
  },
  VIEW_UPDATE_FORM: {
    'display': 'form',
    'components': [
      {
        'label': 'Name',
        'allowMultipleMasks': false,
        'persistent': false,
        'showWordCount': false,
        'showCharCount': true,
        'disabled': true,
        'tableView': true,
        'alwaysEnabled': false,
        'type': 'textfield',
        'input': true,
        'key': 'name',
        'defaultValue': '',
        'validate': {
          'required': true,
          'customMessage': 'Phải Có ít nhất 2 kí tự',
          'json': '',
          'minLength': 2
        },
        'conditional': {
          'show': '',
          'when': '',
          'json': ''
        },
        'widget': {
          'type': ''
        },
        'inputFormat': 'plain',
        'encrypted': false,
        'reorder': false,
        'properties': {},
        'customConditional': '',
        'logic': []
      },
      {
        'label': 'Status',
        'mask': false,
        'tableView': true,
        'alwaysEnabled': false,
        'type': 'select',
        'input': true,
        'key': 'status',
        'defaultValue': '',
        'validate': {
          'customMessage': 'Lựa chọn 1 trong số các trạng thái',
          'json': '',
          'required': true,
          'select': false
        },
        'conditional': {
          'show': '',
          'when': '',
          'json': ''
        },
        'data': {
          'values': [
            {
              'label': 'Active',
              'value': 'Active'
            },
            {
              'label': 'Inactive',
              'value': 'Inactive'
            }
          ]
        },
        'valueProperty': 'value',
        'selectThreshold': 0.3,
        'encrypted': false,
        'lazyLoad': false,
        'selectValues': '',
        'disableLimit': false,
        'sort': '',
        'reference': false,
        'properties': {},
        'customConditional': '',
        'logic': [],
        'reorder': false
      },
      {
        'tags': [],
        'input': false,
        'label': 'Update',
        'tableView': false,
        'key': 'submit',
        'size': 'md',
        'leftIcon': '',
        'rightIcon': '',
        'block': false,
        'action': 'submit',
        'disableOnInvalid': true,
        'theme': 'primary',
        'type': 'button',
        'autofocus': false
      }
    ],
    'settings': {
      'pdf': {
        'id': '1ec0f8ee-6685-5d98-a847-26f67b67d6f0',
        'src': 'https://files.form.io/pdf/5692b91fd1028f01000407e3/file/1ec0f8ee-6685-5d98-a847-26f67b67d6f0'
      }
    }
  }
  // BASE_API_URL: 'http://localhost:8080',
  // BASE_API_URL: '/ng',
});

