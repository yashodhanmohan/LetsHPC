import Problem from '../../api/problem/problem.model';

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

// Create problems
Problem.find({})
    .remove()
    .then(() => {
        Problem
            .create({
                _id: problem1,
                category_id: category1,
                name: 'Sum of all elements',
                desc: 'Find the sum of all the elements of the array using reduction'
            });
        Problem
            .create({
                _id: problem2,
                category_id: category2,
                name: 'Matrix Multiplication',
                desc: 'Multiplying two square matrices'
            });
    });

