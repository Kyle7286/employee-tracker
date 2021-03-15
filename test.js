let array = [
    {
        id: 6,
        title: 'Lead Engineer',
        salary: 120000,
        department_id: 2,
        first_name: 'Kevin',
        last_name: 'Spacey',
        role_id: 6,
        MANAGER_ID: 4
    },
    {
        id: 5,
        title: 'Lead Engineer',
        salary: 120000,
        department_id: 2,
        first_name: 'John',
        last_name: 'Travolta',
        role_id: 5,
        MANAGER_ID: null
    },
    {
        id: 4,
        title: 'Lead Engineer',
        salary: 120000,
        department_id: 2,
        first_name: 'Hank',
        last_name: 'Hill',
        role_id: 4,
        MANAGER_ID: 1
    }
]

// Get employee ID
let x = (array.filter(element => element.id === 4))[0].id

// Get role id
let y = (array.filter(element => element.title === "Lead Engineer"))[0].role_id

console.log(y);