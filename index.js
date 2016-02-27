"use strict"

let postabular = require("postabular")
let _ = require("lodash")

module.exports = postabular.plugin('lint-empty-cell', function(tabular, result) {
    tabular.eachColumn((col) => {
        let empty = []
        col.eachCell((cell, rowIdx) => {
            if (cell.value === "") { empty.push([rowIdx, col.idx]) }
        })
        if ((empty.length / col.length) < 0.05) { // only treat rare empty cell as error
            _.forEach(empty, (x) => { tabular.error(x[0], x[1], "Empty Cell")} )
        }
    })
})

