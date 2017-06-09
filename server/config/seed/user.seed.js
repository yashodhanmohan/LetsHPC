import User from '../../api/user/user.model';

let p1a1 = '5861484d2c3e861ba6b390f1',
    p1a2 = '5861484d2c3e861ba6b390f2',
    p1a3 = '5861484d2c3e861ba6b390f3',
    p1a4 = '5861484d2c3e861ba6b390f4';

let p2a1 = '5861484d2c3e861ba6b390f5',
    p2a3 = '5861484d2c3e861ba6b390f7',
    p2a4 = '5861484d2c3e861ba6b390f8';

let category1 = '58614771d3a6681abe39abb2',
    category2 = '58614771d3a6681abe39abb3';

let machine1 = '5861484d2c3e861ba6b380f4',
    machine2 = '5861484d2c3e861ba6b380f5',
    machine3 = '5861484d2c3e861ba6b380f6',
    machine4 = '5861484d2c3e861ba6b380f7';

let problem1 = '5861484d2c3e861ba6b380f2',
    problem2 = '5861484d2c3e861ba6b380f3';

let user1 = '58614771d3a6681abe39abb1';

// Create users
User.find({})
    .remove()
    .then(() => {
        User
            .create({
                _id: user1,
                name: 'Yashwant Keswani',
                username: 'yash1',
                affiliation: 3,
                password: 'pabloescobar',
                position: 'Student'
            });
    });

