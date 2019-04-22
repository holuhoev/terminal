import { createAction } from "../utils";


export const LOAD         = 'terminal/news/LOAD';
export const LOAD_SUCCESS = 'terminal/news/LOAD_SUCCESS';
export const LOAD_FAILED  = 'terminal/news/LOAD_FAILED';

const initialState = {
    newsList: [
        // {
        //     "id":        13,
        //     "title":     "В Вышке появилась научно-учебная лаборатория анализа данных в финансовых технологиях",
        //     "content":   "Подразделение займется приложением методов машинного обучения к задачам в области финансовых услуг. Лаборатория вошла в состав Центра глубинного обучения и байесовских методов и стала еще одним партнерским проектом Сбербанка и факультета компьютерных наук ВШЭ.\n",
        //     "image":     null,
        //     "imageUrl":  "https://cs.hse.ru/data/2019/04/19/1179857851/3iStock-952063598.jpg",
        //     "topicId":   10,
        //     "eventDate": "2019-04-19",
        //     "startDate": null,
        //     "endDate":   null,
        //     "startTime": null,
        //     "endTime":   null,
        //     "createdBy": null,
        //     "tags":      [
        //         {
        //             "id":    4,
        //             "title": "новое в ВШЭ"
        //         },
        //         {
        //             "id":    5,
        //             "title": "машинное обучение"
        //         },
        //         {
        //             "id":    6,
        //             "title": "финансовые услуги"
        //         }
        //     ],
        //     "topic":     {
        //         "id":    10,
        //         "title": "Наука",
        //         "color": "#76666b"
        //     }
        // },
        // {
        //     "id":        14,
        //     "title":     "Александр Шень стал ассоциированным сотрудником международной лаборатории теоретической информатики",
        //     "content":   "Ведущий исследователь Национального центра научных исследований Франции (Directeur de Recherche, CNRS) Александр Шень стал ассоциированным сотрудником международной лаборатории теоретической информатики.",
        //     "image":     null,
        //     "imageUrl":  "https://cs.hse.ru/data/2019/04/19/1179867635/3%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B0%D0%BD%D0%B4%D1%80%20%D0%A8%D0%B5%D0%BD%D1%8C.jpg",
        //     "topicId":   11,
        //     "eventDate": "2019-04-19",
        //     "startDate": null,
        //     "endDate":   null,
        //     "startTime": null,
        //     "endTime":   null,
        //     "createdBy": null,
        //     "tags":      [
        //         {
        //             "id":    12,
        //             "title": "профессора"
        //         },
        //         {
        //             "id":    15,
        //             "title": "инновации"
        //         },
        //         {
        //             "id":    17,
        //             "title": "официально"
        //         }
        //     ],
        //     "topic":     {
        //         "id":    11,
        //         "title": "Университетская жизнь",
        //         "color": "#987244"
        //     }
        // },
        // {
        //     "id":        15,
        //     "title":     "На пятилетии факультета компьютерных наук вручили стипендии имени Ильи Сегаловича",
        //     "content":   "В рамках празднования пятилетия ФКН в башне «Меркурий» делового центра «Москва-Сити» прошло вручение стипендии имени Ильи Сегаловича. Каждый год на стипендию номинируются студенты и аспиранты факультета, продемонстрировавшие успехи в учебе и научных исследованиях.",
        //     "image":     null,
        //     "imageUrl":  "https://cs.hse.ru/data/2019/04/18/1177147340/5D3_0157.jpg",
        //     "topicId":   9,
        //     "eventDate": "2019-04-18",
        //     "startDate": null,
        //     "endDate":   null,
        //     "startTime": null,
        //     "endTime":   null,
        //     "createdBy": null,
        //     "tags":      [
        //         {
        //             "id":    7,
        //             "title": "достижения"
        //         },
        //         {
        //             "id":    8,
        //             "title": "студенты"
        //         },
        //         {
        //             "id":    9,
        //             "title": "компьютерные науки"
        //         },
        //         {
        //             "id":    10,
        //             "title": "стипендии"
        //         }
        //     ],
        //     "topic":     {
        //         "id":    9,
        //         "title": "Образование",
        //         "color": "#eb4146"
        //     }
        // }
    ],
    loading:  false,
    error:    null
};

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case LOAD:

            return {
                ...state,
                loading: true
            };

        case LOAD_SUCCESS:

            return {
                ...state,
                loading:  false,
                newsList: action.payload
            };

        case LOAD_FAILED:

            return {
                ...state,
                loading: false,
                error:   action.payload
            };

        default:
            return state
    }
};

export default reducer;

export const loadNews = createAction(LOAD);