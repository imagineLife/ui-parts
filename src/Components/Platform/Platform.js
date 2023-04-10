import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useMemo, useState } from 'react';
import Nav from 'react-bootstrap/Nav';

const routes = [
  {
    to: '/home',
    text: 'Active',
  },
  {
    to: '/link-1',
    text: 'Link1',
  },
  {
    to: '/link-2',
    text: 'Link2',
  },
];
function TopNav() {
  return (
    <Nav
      activeKey="/home"
      onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      bg="dark"
      variant="dark"
    >
      {routes.map((r) => (
        <Nav.Item key={r.to}>
          <Nav.Link href={r.to}>{r.text}</Nav.Link>
        </Nav.Item>
      ))}

      <Nav.Item>
        <Nav.Link eventKey="disabled" disabled>
          Disabled
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}


function AccordionItem({title, content}) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
        <div>{title}</div>
        <div>{isActive ? '-' : '+'}</div>
      </div>
      {isActive && <div className="accordion-content">{content}</div>}
    </div>
  );
}
function Accordion() { 
  const data = useMemo(() => [
    {
      title: 'Section 1',
      content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
    laborum cupiditate possimus labore, hic temporibus velit dicta earum
    suscipit commodi eum enim atque at? Et perspiciatis dolore iure
    voluptatem.`,
    },
    {
      title: 'Section 2',
      content: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia veniam
    reprehenderit nam assumenda voluptatem ut. Ipsum eius dicta, officiis
    quaerat iure quos dolorum accusantium ducimus in illum vero commodi
    pariatur? Impedit autem esse nostrum quasi, fugiat a aut error cumque
    quidem maiores doloremque est numquam praesentium eos voluptatem amet!
    Repudiandae, mollitia id reprehenderit a ab odit!`,
    },
    {
      title: 'Section 3',
      content: `Sapiente expedita hic obcaecati, laboriosam similique omnis architecto ducimus magnam accusantium corrupti
    quam sint dolore pariatur perspiciatis, necessitatibus rem vel dignissimos
    dolor ut sequi minus iste? Quas?`,
    },
  ], []);

  return (
    <div className="accordion">
      {data.map(({ title, content }) => (
        <AccordionItem key={title} title={title} content={content} />
      ))}
    </div>
  );
}

const Platform = () => (
  <main className="platform">
    <TopNav />
    <Accordion />
  </main>
);

export default Platform;
