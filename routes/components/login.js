var express = require('express');
var router = express.Router();
var fq = require('fuzzquire');
const config = fq('config-loader');
const userService = fq('services/users').model;

router.get('/', function (req, res, next) {
	req.stateparams.pagetitle = 'Login';
	var params = {
		title: 'Login to Pearl 2018',
		methods: config.passports,
	};
	req.session.callback = req.query.callback;
	if (req.user) {
		res.redirect("/components/dashboard");
	}
	if (req.query.error) {
		if (req.query.error == "github_email_is_private") {
			params.error = {
				title: "Github email is private",
				message: "Change your account settings to make your email visible or login with some other provider."
			};
		}
	}
	res.renderState('login', params);
});

module.exports = router;
