export const UsersDetailMetadata = Object.freeze({
  //  BASE_API_URL: 'http://localhost:8080/telsoft_admin_rest',
  VIEW_CREATE_FORM: {
    'display': 'form',
    'components': [
      {
        'label': 'Columns',
        'columns': [
          {
            'components': [
              {
                'label': 'Username',
                'allowMultipleMasks': false,
                'showWordCount': false,
                'showCharCount': false,
                'tableView': true,
                'alwaysEnabled': false,
                'type': 'textfield',
                'input': true,
                'key': 'username',
                'defaultValue': '',
                'validate': {
                  'required': true,
                  'pattern': '^[a-zA-Z\\d]*$',
                  'customMessage': '',
                  'json': '',
                  'minLength': 6
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
                'label': 'Email',
                'tableView': true,
                'alwaysEnabled': false,
                'type': 'email',
                'input': true,
                'key': 'email',
                'defaultValue': '',
                'validate': {
                  'required': true,

                  'customMessage': '',
                  'json': ''
                },
                'conditional': {
                  'show': '',
                  'when': '',
                  'json': ''
                },
                'reorder': false,
                'encrypted': false,
                'properties': {},
                'customConditional': '',
                'logic': []
              },
              {
                'label': 'Address',
                'map': {
                  'key': ''
                },
                'tableView': true,
                'alwaysEnabled': false,
                'type': 'address',
                'input': true,
                'key': 'address',
                'defaultValue': '',
                'validate': {
                  'customMessage': '',
                  'json': ''
                },
                'conditional': {
                  'show': '',
                  'when': '',
                  'json': ''
                },
                'reorder': false,
                'encrypted': false,
                'properties': {},
                'customConditional': '',
                'logic': []
              }
            ],
            'width': 6,
            'offset': 0,
            'push': 0,
            'pull': 0,
            'type': 'column',
            'input': false,
            'hideOnChildrenHidden': false,
            'key': 'column',
            'tableView': true,
            'label': 'Column'
          },
          {
            'components': [
              {
                'label': 'Fullname',
                'allowMultipleMasks': false,
                'showWordCount': false,
                'showCharCount': false,
                'tableView': true,
                'alwaysEnabled': false,
                'type': 'textfield',
                'input': true,
                'key': 'fullname',
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
                'label': 'Phone',
                'allowMultipleMasks': false,
                'showWordCount': false,
                'showCharCount': false,
                'tableView': true,
                'alwaysEnabled': false,
                'type': 'phoneNumber',
                'input': true,
                'key': 'phone',
                'defaultValue': '',
                'validate': {
                  'customMessage': '',
                  'json': ''
                },
                'conditional': {
                  'show': '',
                  'when': '',
                  'json': ''
                },
                'reorder': false,
                'inputFormat': 'plain',
                'encrypted': false,
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
                  'select': false,
                  'customMessage': '',
                  'json': ''
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
              }
            ],
            'width': 6,
            'offset': 0,
            'push': 0,
            'pull': 0,
            'type': 'column',
            'input': false,
            'hideOnChildrenHidden': false,
            'key': 'column',
            'tableView': true,
            'label': 'Column'
          }
        ],
        'mask': false,
        'tableView': false,
        'alwaysEnabled': false,
        'type': 'columns',
        'input': false,
        'key': 'columns2',
        'conditional': {
          'show': '',
          'when': '',
          'json': ''
        },
        'reorder': false,
        'properties': {},
        'customConditional': '',
        'logic': []
      },
      {
        'type': 'button',
        'label': 'Create',
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
  },
  VIEW_UPDATE_FORM: {
    'display': 'form',
    'components': [
      {
        'label': 'Columns',
        'columns': [
          {
            'components': [
              {
                'label': 'Username',
                'allowMultipleMasks': false,
                'showWordCount': false,
                'showCharCount': false,
                'tableView': true,
                'alwaysEnabled': false,
                'type': 'textfield',
                'input': true,
                'disabled': true,
                'key': 'username',
                'defaultValue': '',
                'validate': {
                  'required': true,
                  'pattern': '^[a-zA-Z\\d]*$',
                  'customMessage': '',
                  'json': '',
                  'minLength': 6
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
                'label': 'Email',
                'tableView': true,
                'alwaysEnabled': false,
                'type': 'email',
                'input': true,
                'key': 'email',
                'defaultValue': '',
                'validate': {
                  'required': true,

                  'customMessage': '',
                  'json': ''
                },
                'conditional': {
                  'show': '',
                  'when': '',
                  'json': ''
                },
                'reorder': false,
                'encrypted': false,
                'properties': {},
                'customConditional': '',
                'logic': []
              },
              {
                'label': 'Address',
                'map': {
                  'key': ''
                },
                'tableView': true,
                'alwaysEnabled': false,
                'type': 'address',
                'input': true,
                'key': 'address',
                'defaultValue': '',
                'validate': {
                  'customMessage': '',
                  'json': ''
                },
                'conditional': {
                  'show': '',
                  'when': '',
                  'json': ''
                },
                'reorder': false,
                'encrypted': false,
                'properties': {},
                'customConditional': '',
                'logic': []
              }
            ],
            'width': 6,
            'offset': 0,
            'push': 0,
            'pull': 0,
            'type': 'column',
            'input': false,
            'hideOnChildrenHidden': false,
            'key': 'column',
            'tableView': true,
            'label': 'Column'
          },
          {
            'components': [
              {
                'label': 'Fullname',
                'allowMultipleMasks': false,
                'showWordCount': false,
                'showCharCount': false,
                'tableView': true,
                'alwaysEnabled': false,
                'type': 'textfield',
                'input': true,
                'key': 'fullname',
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
                'label': 'Phone',
                'allowMultipleMasks': false,
                'showWordCount': false,
                'showCharCount': false,
                'tableView': true,
                'alwaysEnabled': false,
                'type': 'phoneNumber',
                'input': true,
                'key': 'phone',
                'defaultValue': '',
                'validate': {
                  'customMessage': '',
                  'json': ''
                },
                'conditional': {
                  'show': '',
                  'when': '',
                  'json': ''
                },
                'reorder': false,
                'inputFormat': 'plain',
                'encrypted': false,
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
                  'select': false,
                  'customMessage': '',
                  'json': ''
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
              }
            ],
            'width': 6,
            'offset': 0,
            'push': 0,
            'pull': 0,
            'type': 'column',
            'input': false,
            'hideOnChildrenHidden': false,
            'key': 'column',
            'tableView': true,
            'label': 'Column'
          }
        ],
        'mask': false,
        'tableView': false,
        'alwaysEnabled': false,
        'type': 'columns',
        'input': false,
        'key': 'columns2',
        'conditional': {
          'show': '',
          'when': '',
          'json': ''
        },
        'reorder': false,
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

