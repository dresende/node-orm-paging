module.exports = Plugin;

function Plugin(db) {
    return {
        define: function (Model) {
            Model.settings.set("pagination.perpage", 20);

            Model.page = function (conditions, n) {
                if (arguments.length == 1) {
                    n = conditions;
                    conditions = {};
                }
                else {
                    conditions = conditions || {};
                }
                var perpage = Model.settings.get("pagination.perpage");

                return this.find(conditions).offset((n - 1) * perpage).limit(perpage);
            };

            Model.pages = function (conditions, cb) {
                if (arguments.length == 1) {
                    cb = conditions;
                    conditions = {};
                }
                else {
                    conditions = conditions || {};
                }
                Model.count(conditions, function (err, count) {
                    if (err) {
                        return cb(err);
                    }

                    return cb(null, Math.ceil(count / Model.settings.get("pagination.perpage")));
                });
            };
        }
    };
}
