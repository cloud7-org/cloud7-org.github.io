import React from 'react';
import {unified} from 'unified'
import {visit} from 'unist-util-visit'
import gfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from "remark-rehype";
import rehypeReact from "rehype-react";
import Checkout from './Checkout.js';
import checkouts from '../data/checkout.js';

const components = {
    'checkout': ({node}) => <Checkout checkoutData={checkouts[node.value]}/>
  }

function processCheckout() {
    return (tree) => {
        visit(tree, 'text', (node) => {
            const result = node.value.match(/\[checkout type=['|"](c\d\d\d)['|"]\]/) || node.value.match(/\[checkout type=['|"](n\w\w\w\w\w)['|"]\]/);
            if(result && result.length === 2){
                node.type = 'element';
                node.tagName = 'checkout';
                node.value = result[1];
            }
        });
    }
  }

  const processor = unified()
    .use(remarkParse)
    .use(gfm)
    .use(remarkRehype)
    .use(processCheckout)
    .use(rehypeReact, {
        components, 
        passNode: true,
        createElement: React.createElement
    });

const Markdown = (props) => {
    const {children} = props;

    var {result} = processor.processSync(children);

    return result;
}

export default Markdown;