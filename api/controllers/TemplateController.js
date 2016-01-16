/**
 * TemplateController
 *
 * @description :: Server-side logic for managing Templates
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	getAll: function(req, res) {
		Template.find({ owner: req.user.id }, function(err, templates) {
			if (err) {
				return res.serverError(err);
			}

			res.json(templates);
		});
	}
};
