export const CONSTANTS = {
    AUTH: {
        MODE: {
            SIGN_IN: 'SIGN_IN',
            SIGN_UP: 'SIGN_UP'
        }
    },
    DATABASE: {
        COLLECTIONS: {
            TODOLIST: 'todolist'
        }
    },
    FORM: {
        EMAIL: {
            FORMAT: /^[A-Za-z0-9\-\+\_]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        },
        PASSWORD: {
            MIN_LENGTH: 8
        }
    },
    TODO: {
        CATEGORY: [
            {
                key: 'shopping',
                name: 'Shopping',
                icon: 'goods',
            }, {
                key: 'meeting',
                name: 'Meeting',
                icon: 'location',
            }, {
                key: 'task',
                name: 'Task',
                icon: 'edit',
            }, {
                key: 'call',
                name: 'Call',
                icon: 'phone',
            }, {
                key: 'work',
                name: 'Work',
                icon: 'document',
            }
        ]
    },
}