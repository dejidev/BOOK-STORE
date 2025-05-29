// tailwind.config.js
module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                "primary" : "#FFCE1A",
                "secondary" : "#0D0842",
                "blackBG" : "#F3F3F3",
                "Favorite" : "#FF5851"
            },
            fontFamily : {
                "primary": ["Nunito Sans", "sans-serif"],
                "secondary": ["Nunito Sans", "sans - serif"]

            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
  }