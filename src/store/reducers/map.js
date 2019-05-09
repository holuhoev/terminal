const initialState = {
    rooms:     {
        "1": {
            points:        '10,10 99,10 99,59 10,59',
            number:        '402',
            textX:         '55',
            textY:         '35',
            centerPointId: '2'
        },
        "2": {
            points: '10,60 99,60 99,94 10,94'
        },
        "3": {
            points:        '10,95 99,95 99,144, 10,144',
            number:        '403',
            textX:         '55',
            textY:         '120',
            centerPointId: '6'
        }
    },
    points:    {
        '1': {
            roomId: '1',
            x:      25,
            y:      35,
        },
        '2': {
            roomId: '1',
            x:      55,
            y:      35,
        },
        '3': {
            roomId: '1',
            x:      85,
            y:      35,
        },
        '4': {
            roomId: '2',
            x:      25,
            y:      80,
        },
        '5': {
            roomId: '2',
            x:      55,
            y:      80,
        },
        '6': {
            roomId: '2',
            x:      85,
            y:      80,
        },
        '7': {
            roomId: '3',
            x:      85,
            y:      120,
        }
    },
    relations: [
        [1, 4],
        [1, 2],
        [2, 3],
        [4, 5],
        [5, 6],
        [6, 7]
    ]

};

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        default:
            return state
    }
};

export default reducer;