const initialState = {
    rooms: {
        "1": {
            id:     1,
            points: '10,10 99,10 99,59 10,59',
            number: '402',
            textX:  '55',
            textY:  '35',
            doors:  [
                "todo X1,Y1 X2,Y2"
            ],
            link:   {
                '2': '1',
            }
        },
        "2": {
            id:         2,
            isCorridor: true,
            points:     '10,60 39,60 39,94 10,94',
            link:       {
                '3': '1'
            }
        },
        "3": {
            id:         3,
            isCorridor: true,
            points:     '40,60 69,60 69,94 40,94',
            link:       {
                '4': '1'
            }
        },
        "4": {
            id:         4,
            isCorridor: true,
            points:     '70,60 99,60 99,94 70,94',
            link:       {
                '5': '1'
            }
        },
        "5": {
            id:     5,
            points: '10,95 99,95 99,144, 10,144',
            number: '403',
            textX:  '55',
            textY:  '120',
            link:   {
                '4': '1'
            }
        }
    },
};

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        default:
            return state
    }
};

export default reducer;