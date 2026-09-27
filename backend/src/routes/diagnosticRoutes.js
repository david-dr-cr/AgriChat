const express = require('express');



const authMiddleware = require('../middlewares/authMiddleware');



const {
    startDiagnostic,
    sendDiagnosticMessage,
    getMyDiagnostics
} = require('../controllers/diagnosticController');

const router = express.Router();


/*
 * Créer un diagnostic
 */
router.post(
    '/',
    authMiddleware,
    startDiagnostic
);


/*
 * Envoyer un message à l'IA
 */
router.post(
    '/chat',
    authMiddleware,
    sendDiagnosticMessage
);


/*
 * Récupérer les diagnostics
 * de l'utilisateur connecté
 */
router.get(
    '/',
    authMiddleware,
    getMyDiagnostics
);


module.exports = router;