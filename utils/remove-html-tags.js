module.exports.ReplaceHTMLTags = function (text) {
    return text.replace(/<br>/g, '\n').replace(/<strong>/g, '**').replace(/<\/strong>/g, '**').replace(/<li>/g, '- ').replace(/<.*?>/g, '')
}