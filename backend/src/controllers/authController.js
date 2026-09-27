const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');


// ===============================
// INSCRIPTION
// ===============================
const register = async (req, res) => {
    try {
        const {
            nom_complet,
            email,
            telephone,
            password,
            role
        } = req.body;

        // Vérification des champs
        if (!nom_complet || !email || !telephone || !password) {
            return res.status(400).json({
                success: false,
                message: 'Tous les champs sont obligatoires.'
            });
        }

        // Vérifier si l'utilisateur existe déjà
        const [existingUser] = await pool.execute(
            'SELECT id FROM users WHERE email = ? OR telephone = ?',
            [email, telephone]
        );

        if (existingUser.length > 0) {
            return res.status(409).json({
                success: false,
                message: 'Cet email ou ce numéro de téléphone est déjà utilisé.'
            });
        }

        // Chiffrer le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Rôle par défaut
        const userRole = role === 'expert'
            ? 'expert'
            : 'agriculteur';

        // Insérer l'utilisateur
        const [result] = await pool.execute(
            `INSERT INTO users
            (nom_complet, email, telephone, password, role)
            VALUES (?, ?, ?, ?, ?)`,
            [
                nom_complet,
                email,
                telephone,
                hashedPassword,
                userRole
            ]
        );

        // Générer le JWT
        const token = jwt.sign(
            {
                id: result.insertId,
                email: email,
                role: userRole
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        return res.status(201).json({
            success: true,
            message: 'Compte créé avec succès.',
            token,
            user: {
                id: result.insertId,
                nom_complet,
                email,
                telephone,
                role: userRole
            }
        });

    } catch (error) {
        console.error('Erreur inscription :', error);

        return res.status(500).json({
            success: false,
            message: 'Erreur interne du serveur.'
        });
    }
};
//role 

// ===============================
// CONNEXION
// ===============================
const login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email et mot de passe obligatoires.'
            });
        }

        // Rechercher l'utilisateur
        const [users] = await pool.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Email ou mot de passe incorrect.'
            });
        }

        const user = users[0];

        // Vérifier si le compte est actif
        if (!user.actif) {
            return res.status(403).json({
                success: false,
                message: 'Votre compte est désactivé.'
            });
        }

        // Comparer les mots de passe
        const passwordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordCorrect) {
            return res.status(401).json({
                success: false,
                message: 'Email ou mot de passe incorrect.'
            });
        }

        // Générer le JWT
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        return res.status(200).json({
            success: true,
            message: 'Connexion réussie.',
            token,
            user: {
                id: user.id,
                nom_complet: user.nom_complet,
                email: user.email,
                telephone: user.telephone,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Erreur connexion :', error);

        return res.status(500).json({
            success: false,
            message: 'Erreur interne du serveur.'
        });
    }
};


module.exports = {
    register,
    login
};