// import {uglify} from 'rollup-plugin-uglify';
import {terser} from 'rollup-plugin-terser';


export default {
    input: './sharer.js',
    output: {
        file: 'sharer.min.js',
        plugins: [terser(
            {
                output: {
                    comments: false
                }
            }
        )],
        format: 'umd',
        name: 'Sharer'
    },
};
