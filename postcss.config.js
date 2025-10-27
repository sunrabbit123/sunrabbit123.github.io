module.exports = {
    plugins: {
        '@stylexjs/postcss-plugin': {
            // cwd 기본값은 process.cwd()지만, 안전하게 고정
            cwd: __dirname,
            include: [
              './**/*.{js,jsx,ts,tsx}',     // 앱 소스
              // 스타일엑스를 쓰는 외부 패키지가 있으면 경로를 추가
              // './node_modules/some-pkg/**/*.{js,jsx,ts,tsx}'
            ],
            useCSSLayers: true,
        },
    }
};