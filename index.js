const { Op } = require("sequelize");
const moment = require('moment')
function convert(clauses) {
    return generateGroupFilter({}, clauses)
}

function generateFilter(filter) {
    switch (filter.function_name){
        case 'contains' : return {[filter.column] : {[Op.like]: `%${filter.value}%`}}
        case 'does_not_contains' : return {[filter.column] : {[Op.notLike]: `%${filter.value}%`}}
        case 'is' : return {[filter.column] : filter.value}
        case 'is_not' : return {[filter.column] : {[Op.not]: filter.value}}
        case 'start_with' : return {[filter.column] : {[Op.like]: `${filter.value}%`}}
        case 'end_with' : return {[filter.column] : {[Op.like]: `%${filter.value}`}}
        case '=' : return {[filter.column] : {[Op.eq]: filter.value}}
        case '<' : return {[filter.column] : {[Op.lt]: filter.value}}
        case '>' : return {[filter.column] : {[Op.gt]: filter.value}}
        case '<=' : return {[filter.column] : {[Op.lte]: filter.value}}
        case '>=' : return {[filter.column] : {[Op.gte]: filter.value}}
        case '<>' : return {[filter.column] : {[Op.ne]: filter.value}}
        case 'between' : return {[filter.column] : {[Op.between]: filter.value}}
        case 'at' : return {[filter.column] : convertToDate(filter.value)}
        case 'at_between' : return {[filter.column] : {[Op.between]: convertToDate(filter.value)}}
        case 'before' : return {[filter.column] : {[Op.lt]: convertToDate(filter.value)}}
        case 'after' : return {[filter.column] : {[Op.gt]: convertToDate(filter.value)}}
        default : throw Error("ERROR : Operator not found")
    }
}


function generateGroupFilter(structure, clauses, current=0) {
    if (clauses.length === 0 || current >= clauses.length) {
        return structure
    }

    if (clauses.length === 1) {
        return generateFilter(clauses[0])
    }

    if (!structure) {
        if (clauses[1].operator === 'or') {
            structure = {
                [Op.or]: [
                  generateFilter(clauses[0]),
                  generateFilter(clauses[1])
                ]
            }
        } else {
            structure = {
                [Op.and]: [
                    generateFilter(clauses[0]),
                    generateFilter(clauses[1])
                ]
            }
        }
        current+=2
        return generateGroupFilter(structure, clauses, current)
    }

    if (clauses[current].operator === 'or') {
        structure = {
            [Op.or]: [
                structure,
                generateFilter(clauses[current])
            ]
        }
    } else {
        structure = {
            [Op.and]: [
                structure,
                generateFilter(clauses[current])
            ]
        }
    }
    current++
    return generateGroupFilter(structure, clauses, current)
}

function convertToDate (values) {
    if (typeof values === 'string'){
        return moment.utc(values).toDate()
    }

    const converted = []
    for (const value of values) {
        converted.push(moment.utc(value).toDate())
    }

    return converted
}

module.exports = convert

