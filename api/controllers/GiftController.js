var mustache = require('mustache');
var haml = require('haml');
var marked = require('marked');
var async = require('async');
var qr = require('qr-image');
var fs = require('fs');
var archiver = require('archiver');

/**
 * GiftController
 *
 * @description :: Server-side logic for managing Gifts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	createAll: function(req, res) {
		var archiveName = Date.now();
		var output = fs.createWriteStream('./assets/' + archiveName + '.zip');
		var archive = archiver('zip');

		output.on('close', function() {
			res.json({
				url: 'http://tryhandout.herokuapp.com/' + archiveName + '.zip'
			});
		});

		archive.on('error', function(err) {
			res.serverError(err);
		});

		archive.pipe(output);

		async.each(req.body.receivers, function(receiver, callback) {
			Gift.create({
				name: req.body.name,
		    owner: req.user.id,
		    receiver: receiver.name,
		    template: req.body.template,
		    reward: receiver.reward
			}, function(err, newGift) {
				if (err) {
					return callback(err);
				}

				var qr_img = qr.image('http://tryhandout.herokuapp.com/gift/' + newGift.id, { type: 'png' });
				archive.append(qr_img, { name: receiver.name + '.png' })

				callback(null);
			});
		}, function(err) {
			if (err) {
				return res.serverError(err);
			}

			archive.finalize();
		});
	},

	getAll: function(req, res) {
		Gift.find({ owner: req.user.id }).populate('template').exec(function(err, gifts) {
			if (err) {
				return res.serverError(err);
			}

			res.json(gifts);
		});
	},

	show: function(req, res) {
		Gift.findOne({ id: req.params.id }).populate('template').exec(function(err, gift) {
			if (err) {
				return res.serverError(err);
			}

			if (!req.user || req.user.id != gift.owner) {
				gift.opened = true;
			}

			gift.save(function(err) {
				if (err) {
					return res.serverError(err);
				}

				var data = {
					receiverName: gift.receiver,
					reward: gift.reward
				};

				var interp = '';

        syntax = gift.template.syntax;

				if (syntax == 'html') {
					interp = mustache.render(gift.template.source, data);
				}

				if (syntax == 'haml') {
					interp = haml.render(gift.template.source, {
						locals: data
					});
				}

				if (syntax == 'markdown') {
					interp = marked(mustache.render(gift.template.source, data));
				}

				res.view({
					rendered: interp
				});
			});
		});
	}
};
