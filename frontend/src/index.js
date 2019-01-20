import 'bootstrap';
import React from 'react';
import ReactDOM from "react-dom";
import App from "./components/Inventories";

const wrapper = document.getElementById('app');
const currentUser = $('#app').attr('currentUser');
wrapper ? ReactDOM.render(<App currentUser={currentUser}/>, wrapper) : null;
