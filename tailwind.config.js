/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'site-white': '#fafafa',
      },
    },
    minHeight: {
      '50' :'50px',
      '75' :'75px',
      '100' :'100px',
      '150' :'150px',
      '175' :'175px',
      '200': '200px',
      '660': '660px',
      '450': '450px',
    },
    minWidth: {
      '50' :'50px',
      '75' :'75px',
      '100' :'100px',
      '150' :'150px',
      '175' :'175px',
      '200': '200px',
      '660': '660px',
      '450': '450px',
    },
    maxWidth: {
      '400':'400px',
      '600':'600px',
    },
    height: {
      'maxPage':'1500px',
      '50' :'50px',
      '75' :'75px',
      '100' :'100px',
      '150' :'150px',
      '175' :'175px',
      '200': '200px',
      '660': '660px',
      '450': '450px',
      
    },
    
  },
  plugins: [],
}

