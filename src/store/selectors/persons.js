export const selectCurrentPage = state => selectPersonStore(state).page;

export const selectPersons = state => {
    const personList = selectPersonStore(state).personList;

    return personList.map(person => {

        return {
            id:        person.id,
            fio:       person.fio,
            url:       person.url,
            avatarUrl: 'https://randomuser.me/api/portraits/thumb/men/92.jpg',
            faculties: person.employees
                           .filter(employee => employee.chairId)
                           .map(employee => {
                               const chair = state.chairs.data[employee.chairId];

                               return {
                                   position: employee.position,
                                   faculty:  chair ? chair.facultyName : '',
                                   chair:    chair ? chair.name : ''
                               }
                           })
        }
    })
};

export const selectPersonStore = state => state.persons;