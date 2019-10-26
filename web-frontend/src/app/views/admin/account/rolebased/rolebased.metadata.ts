export const RoleBasedMetadata = Object.freeze({
  //  BASE_API_URL: 'http://localhost:8080/telsoft_admin_rest',
  ROLE_CREATE_FORM: {
    'display': 'form',
    'components': [
      {
        'label': 'Role Name',
        'allowMultipleMasks': false,
        'showWordCount': false,
        'showCharCount': false,
        'tableView': true,
        'alwaysEnabled': false,
        'type': 'textfield',
        'input': true,
        'key': 'name',
        'defaultValue': '',
        'validate': {
          'customMessage': '',
          'json': '',
          'required': true
        },
        'conditional': {
          'show': '',
          'when': '',
          'json': ''
        },
        'inputFormat': 'plain',
        'encrypted': false,
        'properties': {},
        'customConditional': '',
        'logic': [],
        'widget': {
          'type': ''
        },
        'reorder': false
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
          'select': false,
          'customMessage': '',
          'json': '',
          'required': true

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
        'reorder': false,
        'lazyLoad': false,
        'selectValues': '',
        'disableLimit': false,
        'sort': '',
        'reference': false,
        'properties': {},
        'customConditional': '',
        'logic': []
      },
      {
        'type': 'button',
        'label': 'Submit',
        'key': 'submit',
        'disableOnInvalid': true,
        'theme': 'primary',
        'input': true,
        'tableView': true
      }
    ],
    'settings': {
      'pdf': {
        'id': '1ec0f8ee-6685-5d98-a847-26f67b67d6f0',
        'src': 'https://files.form.io/pdf/5692b91fd1028f01000407e3/file/1ec0f8ee-6685-5d98-a847-26f67b67d6f0'
      }
    }
  }, ROLE_UPDATE_FORM: {
    'display': 'form',
    'components': [
      {
        'label': 'Role Name',
        'allowMultipleMasks': false,
        'showWordCount': false,
        'showCharCount': false,
        'tableView': true,
        'alwaysEnabled': false,
        'type': 'textfield',
        'disabled': true,
        'input': true,
        'key': 'name',
        'defaultValue': '',
        'validate': {
          'customMessage': '',
          'json': '',
          'required': true
        },
        'conditional': {
          'show': '',
          'when': '',
          'json': ''
        },
        'inputFormat': 'plain',
        'encrypted': false,
        'properties': {},
        'customConditional': '',
        'logic': [],
        'widget': {
          'type': ''
        },
        'reorder': false
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
          'select': false,
          'customMessage': '',
          'json': '',
          'required': true

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
        'reorder': false,
        'lazyLoad': false,
        'selectValues': '',
        'disableLimit': false,
        'sort': '',
        'reference': false,
        'properties': {},
        'customConditional': '',
        'logic': []
      },
      {
        'type': 'button',
        'label': 'Update',
        'key': 'submit',
        'disableOnInvalid': true,
        'theme': 'primary',
        'input': true,
        'tableView': true
      }
    ],
    'settings': {
      'pdf': {
        'id': '1ec0f8ee-6685-5d98-a847-26f67b67d6f0',
        'src': 'https://files.form.io/pdf/5692b91fd1028f01000407e3/file/1ec0f8ee-6685-5d98-a847-26f67b67d6f0'
      }
    }
  }, PERMISSION_EDIT_FORM: {
    'display': 'form',
    'components': [
      {
        'label': 'Action',
        'multiple': true,
        'reorder': false,
        'mask': false,
        'tableView': true,
        'alwaysEnabled': false,
        'type': 'select',
        'input': true,
        'key': 'action',
        'defaultValue': [],
        'validate': {
          'customMessage': '',
          'json': '',
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
              'label': '',
              'value': ''
            }
          ]
        },
        'valueProperty': 'value',
        'selectThreshold': 0.3,
        'encrypted': false,
        'properties': {},
        'customConditional': '',
        'logic': [],
        'lazyLoad': false,
        'selectValues': '',
        'disableLimit': false,
        'sort': '',
        'reference': false
      }, {
        'label': 'Recursive',
        'shortcut': '',
        'mask': false,
        'tableView': true,
        'alwaysEnabled': false,
        'type': 'checkbox',
        'input': true,
        'key': 'recursive',
        'defaultValue': false,
        'validate': {
          'customMessage': '',
          'json': ''
        },
        'conditional': {
          'show': '',
          'when': '',
          'json': ''
        },
        'encrypted': false,
        'properties': {},
        'customConditional': '',
        'logic': [],
        'reorder': false
      },
      {
        'type': 'button',
        'label': 'Submit',
        'key': 'submit',
        'disableOnInvalid': true,
        'theme': 'primary',
        'input': false,
        'tableView': true
      }
    ],
    'settings': {
      'pdf': {
        'id': '1ec0f8ee-6685-5d98-a847-26f67b67d6f0',
        'src': 'https://files.form.io/pdf/5692b91fd1028f01000407e3/file/1ec0f8ee-6685-5d98-a847-26f67b67d6f0'
      }
    }
  }
});
