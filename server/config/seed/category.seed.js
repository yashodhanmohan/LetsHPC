import Category from '../../api/category/category.model';

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

// Create categories
Category.find({})
    .remove()
    .then(() => {
        Category
            .create({
                _id: category1,
                name: 'Reduction',
                desc: 'This is the classic reduction stratergy'
            });
        Category
            .create({
                _id: category2,
                name: 'Linear Algebra',
                desc: 'The problems related to linear algebra'
            });
    });

