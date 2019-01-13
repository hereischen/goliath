import moment from 'moment';
import React from 'react';

export default class Utils extends React.Component {
    static formatDate(dataStr, format) {
        return moment(dataStr).format(format);
    }
}
