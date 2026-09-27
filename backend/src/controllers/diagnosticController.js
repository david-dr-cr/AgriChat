const pool = require('../config/database');
const {
    generateAgriculturalDiagnosis
} = require('../services/aiService');


/*
 * Créer un nouveau diagnostic
 */
const startDiagnostic = async (req, res) => {

    try {

        const userId = req.user.id;

        const { culture } = req.body;


        if (!culture || !culture.trim()) {

            return res.status(400).json({
                success: false,
                message: 'La culture est obligatoire.'
            });
        }


        /*
         * Créer le diagnostic dans la base de données
         */
        const [result] = await pool.execute(
            `INSERT INTO diagnostics
            (user_id, culture)
            VALUES (?, ?)`,
            [
                userId,
                culture.trim()
            ]
        );


        return res.status(201).json({
            success: true,
            message: 'Diagnostic créé avec succès.',
            diagnosticId: result.insertId
        });

    } catch (error) {

        console.error(
            'Erreur création diagnostic :',
            error
        );

        return res.status(500).json({
            success: false,
            message: 'Erreur interne du serveur.'
        });
    }
};


/*
 * Envoyer un message à l'IA
 */
const sendDiagnosticMessage = async (req, res) => {

    try {

        const userId = req.user.id;

        const {
            diagnosticId,
            message
        } = req.body;


        /*
         * Vérifier les données reçues
         */
        if (!diagnosticId || !message || !message.trim()) {

            return res.status(400).json({
                success: false,
                message: 'Le diagnostic et le message sont obligatoires.'
            });
        }


        /*
         * Vérifier que le diagnostic appartient
         * bien à l'utilisateur connecté
         */
        const [diagnostics] = await pool.execute(
            `SELECT *
             FROM diagnostics
             WHERE id = ?
             AND user_id = ?`,
            [
                diagnosticId,
                userId
            ]
        );


        if (diagnostics.length === 0) {

            return res.status(404).json({
                success: false,
                message: 'Diagnostic introuvable.'
            });
        }


        /*
         * Récupérer la culture
         */
        const diagnostic = diagnostics[0];


        /*
         * Enregistrer le message de l'agriculteur
         */
        await pool.execute(
            `INSERT INTO diagnostic_messages
            (diagnostic_id, sender, message)
            VALUES (?, 'agriculteur', ?)`,
            [
                diagnosticId,
                message.trim()
            ]
        );


        /*
         * Récupérer l'historique du diagnostic
         */
        const [history] = await pool.execute(
            `SELECT
                sender,
                message
             FROM diagnostic_messages
             WHERE diagnostic_id = ?
             ORDER BY created_at ASC`,
            [
                diagnosticId
            ]
        );


        /*
         * Transformer l'historique
         * au format attendu par l'IA
         */
        const messages = history.map((item) => ({
            role:
                item.sender === 'agriculteur'
                    ? 'user'
                    : 'assistant',

            content: item.message
        }));


        /*
         * Ajouter le contexte de la culture
         */
        const aiMessages = [
            {
                role: 'user',
                content:
                    `Culture concernée : ${diagnostic.culture}`
            },
            ...messages
        ];


        /*
         * Appel à l'IA
         */
        const aiResponse =
            await generateAgriculturalDiagnosis(
                aiMessages
            );


        /*
         * Vérifier que l'IA a répondu
         */
        if (!aiResponse || !aiResponse.trim()) {

            throw new Error(
                'L’IA a retourné une réponse vide.'
            );
        }


        /*
         * Enregistrer la réponse de l'IA
         */
        await pool.execute(
            `INSERT INTO diagnostic_messages
            (diagnostic_id, sender, message)
            VALUES (?, 'ia', ?)`,
            [
                diagnosticId,
                aiResponse
            ]
        );


        /*
         * Mettre à jour le diagnostic
         */
        await pool.execute(
            `UPDATE diagnostics
             SET diagnostic = ?,
                 statut = 'termine'
             WHERE id = ?`,
            [
                aiResponse,
                diagnosticId
            ]
        );


        /*
         * Retourner la réponse au frontend
         */
        return res.status(200).json({
            success: true,
            message: aiResponse
        });

    } catch (error) {

        console.error(
            'Erreur diagnostic IA :',
            error
        );

        return res.status(500).json({
            success: false,
            message: 'Erreur lors du diagnostic IA.'
        });
    }
};


/*
 * Récupérer les diagnostics
 * de l'agriculteur connecté
 */
const getMyDiagnostics = async (req, res) => {

    try {

        const userId = req.user.id;


        const [diagnostics] = await pool.execute(
            `SELECT
                id,
                culture,
                symptomes,
                diagnostic,
                recommandations,
                statut,
                created_at
             FROM diagnostics
             WHERE user_id = ?
             ORDER BY created_at DESC`,
            [
                userId
            ]
        );


        return res.status(200).json({
            success: true,
            diagnostics
        });

    } catch (error) {

        console.error(
            'Erreur récupération diagnostics :',
            error
        );

        return res.status(500).json({
            success: false,
            message: 'Erreur récupération diagnostics.'
        });
    }
};


module.exports = {
    startDiagnostic,
    sendDiagnosticMessage,
    getMyDiagnostics
};