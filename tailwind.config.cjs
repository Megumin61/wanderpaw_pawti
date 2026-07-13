module.exports = {
  content: ['./index.html', './js/**/*.js'],
  theme: {
    extend: {
      colors: {
        paw: {
          cream: '#FFFAF0', fog: '#FFFAF0', peach: '#FBEFDB', mist: '#F5E7CD',
          blush: '#F5E2B8', tape: '#FBEFDB', kraft: '#E3CE99', ink: '#3D4A2A',
          forest: '#687949', fern: '#687949', moss: '#9AAA7C', sage: '#BCC79E',
          sprout: '#D8DEB8', pine: '#3D4A2A', bark: '#7C6B47', choco: '#4A3A28',
          coffee: '#9A8560', sand: '#C4A878', apricot: '#E5A85A', lemon: '#F0C870',
          sun: '#D89A3D', berry: '#687949', sky: '#A9C2BC', rust: '#7C6B47',
        },
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', '"Songti SC"', 'STSong', 'serif'],
        sans: ['"Noto Sans SC"', '"Microsoft YaHei"', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'Consolas', 'monospace'],
        hand: ['"Caveat"', '"KaiTi"', '"Noto Serif SC"', 'cursive'],
      },
    },
  },
};
