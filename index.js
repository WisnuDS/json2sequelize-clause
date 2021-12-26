const { Op } = require("sequelize");
const moment = require('moment')
function convert(clause) {
    if (clause.group.length === 0) return generateFilter(clause)
    else return generateGroupFilter(clause)
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


function generateGroupFilter(groupFilter) {
    if (groupFilter.length === 0)
        return

    let structure = {}
    let group = []
    for (const groupFilterElement of groupFilter.filters) {
        if (groupFilterElement.group.length === 0){
            let filter = generateFilter(groupFilterElement)
            if (!filter) throw Error("ERROR : Filter is empty")
            group.push(filter)
        } else {
            let groupFil = generateGroupFilter(groupFilterElement)
            group.push(groupFil)
        }
    }

    if (groupFilter.operator === 'AND'){
        structure[Op.and] = group
    } else {
        structure[Op.or] = group
    }

    return structure
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

