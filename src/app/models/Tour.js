const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const slug = require('mongoose-slug-generator');
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const Tour = new Schema(
    {
        name: { type: String, maxLength: 255 },
        description: { type: String },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Tour', Tour);
