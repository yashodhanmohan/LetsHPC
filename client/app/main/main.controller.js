import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';

export default class MainController {

    data = {};

    /*@ngInject*/
    constructor($http) {
        this.$http = $http;
        this.data = new google.visualization.DataTable();
        this.data.addColumn('string', 'Topping');
        this.data.addColumn('number', 'Slices');
        this.data.addRows([
            ['Mushrooms', 3],
            ['Onion', 1],
            ['Olives', 1],
            ['Zucchini', 1],
            ['Pepperoni', 2]
        ]);

        // Set chart options
        var options = {
            'title': 'How Much Pizza I Ate Last Night',
            'width': 400,
            'height': 300
        };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(this.data, options);
    }
}
