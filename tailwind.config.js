/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        //'./assets/js/MultiSelectjs.js',
        './examples/*.html',
    ],
    prefix: 'multiselectjs-',
    corePlugins: {
        preflight: false,
    },
    plugins: [
        require("tailwindcss"),
        require("autoprefixer")
    ]
}