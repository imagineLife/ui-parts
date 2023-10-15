import { WidthProvider, Responsive } from 'react-grid-layout';
import React from 'react';
import layouts from './layouts';
import './NlpDash.scss';
import { Container } from 'react-bootstrap';
import CardCalcSize from './../CardCalcSize'
import CardSmall from './../CardSmall'
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const smallBoxes = [
  {
    key: '1',
    className: 'text',
    title: 'small-1',
    size: 'sm'
  },
  {
    key: '2',
    className: 'text',
    title: 'small-2',
    size: 'sm'
  },
  {
    key: '3',
    className: 'text',
    title: 'small-3',
    size: 'sm'
  },
  {
    key: '4',
    className: 'text',
    title: 'small-4',
    size: 'sm'
  },
];

const medBoxes = [
  {
    key: '5',
    className: 'text',
    title: 'med-1',
    size: 'md',
  },
  {
    key: '6',
    className: 'text',
    title: 'med-2',
    size: 'md',
  },
];

const boxes = [...smallBoxes, ...medBoxes];

const NlpDash = () => {
  return (
    <main>
      <h2>Nlp Dash</h2>
      <ul>
        <li>Longest Words</li>
        <li>Common Words</li>
        <li>Words By Count</li>
        <li>Sentence Count</li>
        <li>Sentiment Pie</li>
        <li>Common Themes</li>
        <li>Text</li>
        <li>Words-Per-Sentence (scatter)</li>
        <li>Sentiment-Score (line)</li>
      </ul>
      {/* <section id="analysis-dashboard"> */}
      <Container fluid>
        <ResponsiveReactGridLayout
          className="layout"
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={30}
          layouts={layouts}
          onLayoutChange={() => {
            console.log('layoutChange...');
          }}
        >
          {boxes.map((b, bIdx) => {
            if (bIdx === 0) { 
              console.log('props')
              console.log(b)
            }
            if(bIdx < 4) return <CardSmall {...b} key={b.key} />;
            return <CardCalcSize {...b} key={b.key} />;
          })}
        </ResponsiveReactGridLayout>
        {/* </section> */}
      </Container>
    </main>
  );
};
export default NlpDash;
