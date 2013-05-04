module.exports = Plugin;

function Plugin(db) {
	return {
		define: function (Model) {
			Model.settings.set("pagination.perpage", 20);

			Model.page = function (n) {
				var perpage = Model.settings.get("pagination.perpage");

				return this.all().offset( (n - 1) * perpage ).limit(perpage);
			};

			Model.pages = function (cb) {
				Model.count(function (err, count) {
					if (err) {
						return cb(err);
					}

					return cb(null, Math.ceil(count / Model.settings.get("pagination.perpage")));
				});
			};
		}
	};
}
