/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './assets/js/*.js',
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