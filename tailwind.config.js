/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        //'./assets/js/MultiSelectjs.js',
        './examples/*.html',
    ],
    prefix: 'multiselectjs-',
    corePlugins: {
    },
    plugins: [
        require("tailwindcss"),
        require("autoprefixer")
    ]
}