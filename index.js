const { Op } = require("sequelize");
function convert(clause) {
    if (clause.type === 'filter') return generateFilter(clause)
    else return generateGroupFilter(clause)
}

function generateFilter(filter) {
    switch (filter.operator){
        case 'contains' : return {[filter.variable] : {[Op.like]: `%${filter.value}%`}}
        case 'does_not_contains' : return {[filter.variable] : {[Op.notLike]: `%${filter.value}%`}}
        case 'is' : return {[filter.variable] : filter.value}
        case 'is_not' : return {[filter.variable] : {[Op.not]: filter.value}}
        case 'start_with' : return {[filter.variable] : {[Op.like]: `${filter.value}%`}}
        case 'end_with' : return {[filter.variable] : {[Op.like]: `%${filter.value}`}}
        case '=' : return {[filter.variable] : {[Op.eq]: filter.value}}
        case '<' : return {[filter.variable] : {[Op.lt]: filter.value}}
        case '>' : return {[filter.variable] : {[Op.gt]: filter.value}}
        case '<=' : return {[filter.variable] : {[Op.lte]: filter.value}}
        case '>=' : return {[filter.variable] : {[Op.gte]: filter.value}}
        case '<>' : return {[filter.variable] : {[Op.ne]: filter.value}}
        case 'between' : return {[filter.variable] : {[Op.between]: filter.value}}
        case 'at' : return {[filter.variable] : filter.value}
        case 'at_between' : return {[filter.variable] : {[Op.between]: filter.value}}
        case 'before' : return {[filter.variable] : {[Op.lt]: filter.value}}
        case 'after' : return {[filter.variable] : {[Op.gt]: filter.value}}
        default : throw Error("ERROR : Operator not found")
    }
}


function generateGroupFilter(groupFilter) {
    if (groupFilter.length === 0)
        return

    let structure = {}
    let group = []
    for (const groupFilterElement of groupFilter.filters) {
        if (groupFilterElement.type === 'filter'){
            let filter = generateFilter(groupFilterElement)
            if (!filter) throw Error("ERROR : Filter is empty")
            group.push(filter)
        } else {
            let groupFil = generateGroupFilter(groupFilterElement)
            group.push(groupFil)
        }
    }

    if (groupFilter.logical_operator === 'AND'){
        structure[Op.and] = group
    } else {
        structure[Op.or] = group
    }

    return structure
}

module.exports = convert
