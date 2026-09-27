/*const express = require('express');
const app = express();
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const diagnosticRoutes = require('./routes/diagnosticRoutes');
app.use('/api/diagnostics', diagnosticRoutes);

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'API AgriChat opérationnelle.'
    });
});
app.use('/api/auth', authRoutes);

module.exports = app;*/
const express = require('express');
const cors = require('cors');

const app = express();

const authRoutes = require('./routes/authRoutes');
const diagnosticRoutes = require('./routes/diagnosticRoutes');


/*
 * Middlewares généraux
 */

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));


/*
 * Route principale
 */

app.get('/', (req, res) => {

    res.status(200).json({
        success: true,
        message: 'API AgriChat opérationnelle.'
    });

});


/*
 * Routes d'authentification
 */

app.use('/api/auth', authRoutes);


/*
 * Routes des diagnostics
 */

app.use('/api/diagnostics', diagnosticRoutes);


module.exports = app;