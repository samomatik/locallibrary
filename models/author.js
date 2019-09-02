var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
    {
        first_name: {type: String, required: true, max: 100},
        family_name: {type: String, required: true, max: 100},
        date_of_birth: {type: Date},
        date_of_death: {type: Date},
    }
);

// Virtual for author's full name
AuthorSchema
    .virtual('name')
    .get(function() {
        return this.family_name + ', ' + this.first_name;
    });

// Virtual for author's lifespan
AuthorSchema
    .virtual('lifespan')
    .get(function() {
        return this.date_of_birth && this.date_of_death ? this.date_of_death.getYear() - this.date_of_birth.getYear() : '';
    });

// Virtual for author's url
AuthorSchema
    .virtual('url')
    .get(function() {
        return '/catalog/author/' + this._id;
    });

// Virtual for author lifespan
AuthorSchema
    .virtual('lifespan')
    .get(function() {
        var formatted_dob = this.date_of_birth ? moment(this.date_of_birth).format('DD/MM/YYYY') : '';
        var formatted_dod = this.date_of_death ? moment(this.date_of_death).format('DD/MM/YYYY') : '';
        var lifespan = formatted_dob + " - " + formatted_dod;
        return lifespan;
    })

// Virtual for formatted date of birth
AuthorSchema
    .virtual('dob_formatted')
    .get(function() {
        return this.date_of_birth ? moment(this.date_of_birth).format('DD/MM/YYYY') : '';
    })

// Virtual for formatted date of birth
AuthorSchema
    .virtual('dod_formatted')
    .get(function () {
        return this.date_of_death ? moment(this.date_of_death).format('DD/MM/YYYY') : '';
    })

// Export module
module.exports = mongoose.model('Author', AuthorSchema);