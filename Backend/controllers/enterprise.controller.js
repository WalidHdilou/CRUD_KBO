const { Enterprise, Establishment, Denomination } = require('../models');
const { Op } = require('sequelize');


module.exports = {
    async getEnterpriseById(req, res) {
        try {
            console.log('GET /enterprises/:id =>', req.params.id);

            const enterprise = await Enterprise.findByPk(req.params.id, {
                include: [Establishment],
            });

            if (!enterprise) {
                return res.status(404).json({ message: 'Entreprise non trouvée' });
            }

            res.json(enterprise);
        } catch (err) {
            console.error('ERREUR DANS getEnterpriseById :', err);
            res.status(500).json({ message: 'Erreur serveur', error: err.message });
        }
    },

    async createEnterprise(req, res) {
        try {
            const enterprise = await Enterprise.create(req.body);
            res.status(201).json(enterprise);
        } catch (err) {
            console.error(' ERREUR DANS createEnterprise :', err);
            res.status(500).json({ message: 'Erreur serveur', error: err.message });
        }
    },

    async deleteEnterprise(req, res) {
        try {
            const deleted = await Enterprise.destroy({
                where: { enterprise_number: req.params.id },
            });

            if (!deleted) {
                return res.status(404).json({ message: 'Entreprise non trouvée' });
            }

            res.json({ message: 'Entreprise supprimée (cascade OK)' });
        } catch (err) {
            console.error('ERREUR DANS deleteEnterprise :', err);
            res.status(500).json({ message: 'Erreur serveur', error: err.message });
        }
    },

    async searchEnterprise(req, res) {
        try {
            const { number, name } = req.query;

            if (!number && !name) {
                return res.status(400).json({
                    message: "Veuillez fournir 'number' (numero d'entreprise) ou 'name' (nom) dans la query string."
                });
            }

            if (number && !name) {
                const enterprise = await Enterprise.findByPk(number, {
                    include: [Establishment, Denomination],
                });

                if (!enterprise) {
                    return res.status(404).json({ message: "Aucune entreprise trouvée" });
                }

                return res.json(enterprise);
            }

            const denomWhere = {
                denomination: { [Op.iLike]: `%${name}%` },
            };

            const denomination = await Denomination.findOne({
                where: denomWhere,
            });

            if (!denomination) {
                return res.status(404).json({ message: "Aucune entreprise trouvée (aucune dénomination ne matche)" });
            }

            const enterpriseNumber = number || denomination.entity_number;

            const enterprise = await Enterprise.findByPk(enterpriseNumber, {
                include: [Establishment, Denomination],
            });

            if (!enterprise) {
                return res.status(404).json({ message: "Aucune entreprise trouvée pour ce numéro" });
            }

            res.json(enterprise);

        } catch (err) {
            console.error(" ERREUR searchEnterprise :", err);
            res.status(500).json({ message: "Erreur serveur", error: err.message });
        }
    },

    async updateEnterprise(req, res) {
        try {
            const { id } = req.params;

            const [nbUpdated] = await Enterprise.update(req.body, {
                where: { enterprise_number: id },
            });

            if (nbUpdated === 0) {
                return res.status(404).json({ message: 'Entreprise non trouvée' });
            }

            const updated = await Enterprise.findByPk(id, {
                include: [Establishment],
            });

            res.json(updated);
        } catch (err) {
            console.error('ERREUR DANS updateEnterprise :', err);
            res.status(500).json({ message: 'Erreur serveur', error: err.message });
        }
    },

}