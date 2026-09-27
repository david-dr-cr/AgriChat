const jwt = require('jsonwebtoken');

/*
 * Middleware d'authentification JWT
 *
 * Ce middleware protège les routes privées de l'application.
 *
 * Exemple :
 * Authorization: Bearer TOKEN
 *
 * Si le token est valide :
 *      req.user contient les informations de l'utilisateur.
 *
 * Si le token est invalide ou absent :
 *      l'accès est refusé avec HTTP 401.
 */
const authMiddleware = (req, res, next) => {
    try {

        /*
         * 1. Récupération du header Authorization
         *
         * Le frontend doit envoyer :
         *
         * Authorization: Bearer TOKEN
         */
        const authHeader = req.headers.authorization;

        /*
         * 2. Vérification de la présence du header
         */
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'Token d\'authentification manquant.'
            });
        }

        /*
         * 3. Vérification du format
         *
         * Le format attendu est :
         *
         * Bearer TOKEN
         */
        const parts = authHeader.split(' ');

        if (
            parts.length !== 2 ||
            parts[0] !== 'Bearer' ||
            !parts[1]
        ) {
            return res.status(401).json({
                success: false,
                message: 'Format du token invalide.'
            });
        }

        /*
         * 4. Récupération du token
         */
        const token = parts[1];

        /*
         * 5. Vérification du token avec JWT_SECRET
         *
         * jwt.verify() vérifie notamment :
         * - que le token est correctement signé ;
         * - qu'il correspond à notre JWT_SECRET ;
         * - qu'il n'est pas expiré.
         */
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        /*
         * 6. Stockage des informations du token
         * dans req.user
         *
         * Ton authController crée actuellement le token
         * avec :
         *
         * {
         *     id: user.id,
         *     email: user.email,
         *     role: user.role
         * }
         *
         * Donc on pourra ensuite utiliser :
         *
         * req.user.id
         * req.user.email
         * req.user.role
         */
        req.user = decoded;

        /*
         * 7. Le token est valide.
         *
         * On autorise la requête à continuer
         * vers le controller.
         */
        next();

    } catch (error) {

        /*
         * Le token est invalide, expiré ou incorrect.
         */
        console.error(
            'Erreur authentification :',
            error.message
        );

        return res.status(401).json({
            success: false,
            message: 'Token invalide ou expiré.'
        });
    }
};

module.exports = authMiddleware;